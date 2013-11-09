/**
 * Created with JetBrains WebStorm.
 * User: fantastik
 * Date: 11/9/13
 * Time: 10:48 AM
 * To change this template use File | Settings | File Templates.
 */
var model_lab2;

function CreateModel_lab2() {
    // UI binding
    this.polinom = '';
    this.register = undefined;
    this.gamma = '';
    this.input = ''

    this.Start = function(input) {
        this.input = input;

        this.__prepareForAlgorithm();
        this.__applyBerlakhampAlgorithm();
        this.__makePolinomString();
        this.__createRegister();
    }

    this.Next = function() {
        this.register.Next();
        this.gamma += this.register.shiftedBit.toString();
    }

    // Private fields
    this.__b;
    this.__t;
    this.__c;
    this.__s;
    this.__N;
    this.__L;
    this.__m;

    // Private func
    this.__makePolinomString = function() {
        for (var i = this.__s.length - 1; i >=0; i--) {
            var degree = this.__c[i];
            if (degree === 1) {
                this.polinom += "x^" + i + " ";
            }
        }
    }

    this.__createRegister = function() {
        var polinom = this.__getPolinomForRegister();
        var val = this.__getInitialValueForRegister(polinom[0]);
        this.register = Register(polinom.slice(0), polinom[0], val);
    }

    this.__getPolinomForRegister = function() {
        var pol = new Array();
        for (var i = this.__c.length - 1; i >= 0; i--) {
            var val = this.__c[i];
            if (val === 1)
                pol.push(i);
        }
        return pol;
    }

    this.__getInitialValueForRegister = function(bits) {
        var val = 0;
        for (var i = 0, len = this.__s.length - 1; i < bits && i <= len; i++) {
            val ^= (this.__s[len - i] << i);
            val >>>= 0;
        }
        return val;
    }

    this.__prepareForAlgorithm = function() {
        this.__b = new Array(this.input.length);
        this.__t = new Array(this.input.length);
        this.__c = new Array(this.input.length);
        this.__s = new Array(this.input.length);

        for (var i = 0, len = this.input.length; i < len; i++) {
            this.__b[i] = 0;
            this.__t[i] = 0;
            this.__c[i] = 0;
            this.__s[i] = parseInt(this.input[i], 2);
        }

        this.__b[0] = 1;
        this.__c[0] = 1;
        this.__N = 0;
        this.__L = 0;
        this.__m = -1;
    }

    this.__applyBerlakhampAlgorithm = function() {
        var d;
        while (this.__N < this.__s.length) {
            d = 0;
            for (var i = 0; i <= this.__L; i++) {
                d = d + this.__s[this.__N - i] * this.__c[i];
            }
            d = d %2;

            if (d !== 0) {
                this.__t = this.__c.slice(0);
                for (var i = 0; i <= this.__s.length + this.__m - 1 - this.__N; i++) {
                    this.__c[this.__N - this.__m + i] = this.__c[this.__N - this.__m +i] ^ this.__b[i];
                }

                if (this.__L <= (this.__N / 2)) {
                    this.__L = this.__N + 1 - this.__L;
                    this.__m = this.__N;
                    this.__b = this.__t.slice(0);
                }
            }
            this.__N++;
        }
    }

    return this;
}

function test2() {
    model_lab2.Start("11001011");
}

function initModel_lab2() {
    // TODO: bind UI element here for binary input string
    var inputData = document.getElementById(''/* STUFF HERE */).value;
    if(inputData !== undefined && inputData.length > 0 && validateInputString(inputData)) {
        model_lab2.Start(RemoveSpacesInString(inputData));
        return true;
    }
    else {
        alert('Please enter valid input string');
        return false;
    }
}

var validateInputString = (function createValidator() {
    var regexp = new RegExp('^[0,1,\\s]+$');
    return function(str) {
        return regexp.text(str);
    }
})();

