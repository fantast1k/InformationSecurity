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

function $name(name) {
    return document.getElementsByName(name)[0];
}

function $id(id) {
    return document.getElementById(id);
}

function showPart1() {
    $name('link-part1').className = "active";
    $name('link-part2').className = "";
    $id('tab-part1').style.display = 'block';
    $id('tab-part2').style.display = 'none';
}
function showPart2() {
    $name('link-part1').className = "";
    $name('link-part2').className = "active";
    $id('tab-part1').style.display = 'none';
    $id('tab-part2').style.display = 'block';
}