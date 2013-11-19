var alfavit = [' ','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var FN = [],
    N = 0, 
    p = 19,      
    q = 11,
    f = 0;

function NOD(a, b) {
    if(a == b) 
        return a;
     else if (a > b) 
        return NOD(a - b, b);
    else
        return NOD(b - a, a);
}

function mod(K, tmp) {
    if (K < tmp)
        return K;            
    else
        return mod(K % tmp, tmp);
}

function Mnog(a) {
    var s = "";
    var tmp = Math.sqrt(a);
    for (var i = 2; i < tmp; i++) {
        if ((a % i) == 0) {
            while ((a % i) == 0) {
                a = a / i;
            }
            s += i + " ";
        }
    }
    s = s.substr(0, s.length - 1);
    return s;
}
function Sum(a) {
    var s = "";
    while (a > 5) {
        a = a - 5;
        s += "5 ";
    }
    s += a;
    return s;
}
function mass(s) {
    var razdel = ' ';
    var mas2 = s.split(razdel);
    var mas = [];
    for (var i = 0; i < mas2.length; i++) {
        mas[i] = parseFloat(mas2[i]);
    }
    return mas;
}

function mod_mod(b, f, step) {
    var str = Sum(step);
    var mas_step = mass(str);
    var KD = 1;
    for (var i = 0; i < mas_step.length; i++) {
        KD *= Math.pow(b, mas_step[i]);
        KD = mod(KD, f);
    }
    return KD;
}

function Text_line(line) {
     line = line.toLowerCase();
     FN = [];
     var line_mas = [];
     for (var i = 0; i < line.length; i++) {
         line_mas[i] = line.substr(i, 1);
     }
     for (var i = 0; i < line.length; i++) {
         for (var j = 0; j < alfavit.length; j++) {
             if (line_mas[i] == alfavit[j])
                 FN[i] = j;
         }
     }
}

 function shifr() {
    N = p * q;
    f = (p - 1) * (q - 1);
    Text_line($name('text-Part1').value);
    var fn_line = " ";
    for (var i = 0; i < FN.length; i++) {
        fn_line += FN[i].toString() + "; ";
    }
    $name('outputData').value += "Source Data: {" + fn_line + "}" + "\n";
    var Ke = parseInt($name('key-part1').value);//KE here
    if($name('key-part1').value.length > 0 && NOD(f, Ke) == 1) {
        $name('outputData').value += "Key: Ke= " + Ke + "\n";
        var s = Mnog(f);
        var mas = mass(s);
        var f2 = f;
        for (var i = 0; i < mas.length; i++) {
            f2 *= 1 - 1 / mas[i];
        }
        var step = parseInt(f2 - 1);
        var KD = mod_mod(Ke, f, step);
        var Kd = parseInt(KD);
        var c = [];
        for (var i = 0; i < FN.length; i++) {
            c[i] = mod_mod(FN[i], N, Ke);
        }
        var ci = "";
        for (var i = 0; i < c.length; i++) {
            ci += c[i] + "; ";
        }
        $name('outputData').value += "Encrypt: {" + ci + "}" + "\n";
        var m = [];
        for (var i = 0; i < c.length; i++) {
            m[i] = mod_mod(c[i], N, Kd);
        }
        var mi = "";
        for (var i = 0; i < m.length; i++) {
            mi += m[i] + "; ";
        }
        $name('outputData').value += "Decrypt: {" + mi + "}"+ "\n\n";
    }
    else {
        $name('outputData').value += "Bad key!"+ "\n\n";
    }
    $name('outputData').scrollTop = $name('outputData').scrollHeight;
}