function DecModel(Ko, p, g, m, a, b){
    // UI elements
    this.Ko = Ko;
    this.p = p;
    this.g = g;
    this.m = m;
    this.a = a;
    this.b = b;

    this.errorMessage = '';

    this.IsDataValid = function() {
        var valCheck = function(a, name) {
            var valid = a !== NaN && a !== undefined;
            if (!valid)
                this.errorMessage += name + " shoud be defined\n";
            return valid
        }
        valCheck(this.Ko, 'Ko');
        valCheck(this.p, 'p');
        valCheck(this.g, 'g');
        valCheck(this.m, 'm');
        valCheck(this.a, 'a');
        valCheck(this.b, 'b');

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
        return (Math.pow(this.a, this.b) * Math.pow(this.b, this.a)) % this.p;
    }

    this.__calculateRightSideOfEquastion = function() {
        return Math.pow(this.g, this.m) % this.p;
    }
}