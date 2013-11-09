/**
 * Created with JetBrains WebStorm.
 * User: fantastik
 * Date: 11/9/13
 * Time: 11:09 PM
 * To change this template use File | Settings | File Templates.
 */

var helper = new (function() {
    this.parseStringToInt = function(str) {
        var val = parseInt(str);
        if (val < 0)
            val = NaN;
        return val;
    }

    this.isPairPrimitive = function(a, b) {
        while(a != b) {
            if (a > b)
                a = a - b;
            else
                b = b - a;
        }
        return a == 1;
    }

    this.getRevertedModuleElement = function (n) {
        var result = n;
        for (var i=2; i*i<=n; ++i)
            if (n % i == 0) {
                while (n % i == 0)
                    n /= i;
                result -= result / i;
            }
        if (n > 1)
            result -= result / n;
        return result;
    }
})();