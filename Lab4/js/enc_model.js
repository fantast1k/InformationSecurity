/**
 * Created with JetBrains WebStorm.
 * User: fantastik
 * Date: 11/9/13
 * Time: 11:26 PM
 * To change this template use File | Settings | File Templates.
 */

function EncModel(p, g, Kc, m) {
    // UI elements
    this.p = helper.parseStringToInt(p);
    this.g = helper.parseStringToInt(g);
    this.Kc = helper.parseStringToInt(Kc);
    this.m = helper.parseStringToInt(m);
    // UI elements
    this.k = NaN;
    this.a = NaN;
    this.b = NaN;
    this.Ko = NaN;

    this.errorMessage = '';

    this.IsDataValid = function() {
        this.errorMessage = '';

        var valCheck = function(a, name) {
            var valid = a !== NaN && a !== undefined;
            if (!valid)
                this.errorMessage += name + " shoud be defined\n";
            return valid
        }
        valCheck(this.p, 'p');
        valCheck(this.g, 'g');
        valCheck(this.Kc, 'Kc');
        valCheck(this.m, 'm');

        if (this.p < 3)
            this.errorMessage += "p should be greater than 3\n";

        if (this.g < 0)
            this.errorMessage += "g should be positive\n";

        if (this.p <= this.g)
            this.errorMessage += "p should be greater than g\n";

        if (this.m < 1 || this.m >= this.p)
            this.errorMessage += "m should be in range (1 < m < (p - 1))\n";

        if (this.Kc < 1 || this.Kc >= this.p)
            this.errorMessage += "Kc should be in range (1 < Kc < (p - 1))\n";

        if (this.errorMessage.length == 0)
            this.__generate_k();

        return this.errorMessage.length == 0;
    }

    this.Start = function() {
        this.__calculate_Ko();
        this.__calculate_a();
        this.__calculate_b();
    }

    this.__generate_k = function() {
        var arr = new Array();
        for (var i = 2; i < (this.p - 1); i++)
            arr.push(i);

        if (arr.length == 0)
            this.errorMessage += "k cannot be generated\n";

        for (var i = 0, arrLen = arr.length, len = arrLen * 10; i < len; i++) {
            var element = arr[i % arrLen];
            var pos = Math.floor(Math.random() * arrLen);
            var swapElement = arr[pos];
            arr[pos] = element;
            arr[i % arrLen] = swapElement;
        }

        var elem = arr[0];
        var isPrimitive = false;
        for (var i = 1; i < arr.length; i++) {
            if (helper.isPairPrimitive(this.p, elem) == true) {
                isPrimitive = true;
                break;
            }
        }

        if (isPrimitive == false)
            this.errorMessage += "k cannot be generated";
        else
            this.k = 9;
    }

    this.__calculate_Ko = function() {
        this.Ko = Math.pow(this.g, this.Kc) % this.p;
    }

    this.__calculate_a = function() {
        this.a = Math.pow(this.g, this.k) % this.p;
    }

    this.__calculate_b = function() {
        var multiplier = (this.m - this.Kc * this.a) % (this.p - 1);
        if (multiplier < 0)
            multiplier += (this.p - 1);

        this.b = this.__getReverseMultiplier() * multiplier % (this.p - 1);
    }

    this.__getReverseMultiplier = function() {
        return Math.pow(this.k, helper.getRevertedModuleElement(this.k) - 1) % (this.p - 1);
    }
}