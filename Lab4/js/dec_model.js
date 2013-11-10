function DecModel(Ko, p, g, m, a, b){
    // UI elements
    this.Ko = helper.parseStringToInt(Ko);
    this.p = helper.parseStringToInt(p);
    this.g = helper.parseStringToInt(g);
    this.m = helper.parseStringToInt(m);
    this.a = helper.parseStringToInt(a);
    this.b = helper.parseStringToInt(b);

    this.errorMessage = '';

    this.IsDataValid = function() {
        this.errorMessage = '';

        this.__validateValue(this.Ko, 'Ko');
        this.__validateValue(this.p, 'p');
        this.__validateValue(this.g, 'g');
        this.__validateValue(this.m, 'm');
        this.__validateValue(this.a, 'a');
        this.__validateValue(this.b, 'b');

        if (this.p < 3)
            this.errorMessage += "p should be greater than 3\n";

        if (this.g < 0)
            this.errorMessage += "g should be positive\n";

        if (this.p <= this.g)
            this.errorMessage += "p should be greater than g\n";

        if (this.m < 1 || this.m >= this.p)
            this.errorMessage += "m should be in range (1 < m < (p - 1))\n";

        if (this.a < 0 || this.a >= this.p)
            this.errorMessage += "a should be in range (0 < a < p)\n";

        if (this.b < 0 || this.b >= (this.p - 1))
            this.errorMessage += "b should be in range (0 < b < (p - 1))\n";

        if (this.Ko < 0 || this.Ko >= this.p)
            this.errorMessage += "Ko should be in range (o < Kc < p)\n";

        return this.errorMessage.length == 0;
    }

    this.ValidateSignature = function() {
        return this.__calculateLeftSideOfEquastion() == this.__calculateRightSideOfEquastion();
    }

    this.__calculateLeftSideOfEquastion = function() {
        return (Math.pow(this.a, this.b) * Math.pow(this.Ko, this.a)) % this.p;
    }

    this.__calculateRightSideOfEquastion = function() {
        return Math.pow(this.g, this.m) % this.p;
    }

    this.__validateValue = function(a, name) {
        var valid = !isNaN(a) && a !== undefined;
        if (!valid)
            this.errorMessage += name + " shoud be defined\n";
        return valid
    }
}