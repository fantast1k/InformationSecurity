/**
 * Created with JetBrains WebStorm.
 * User: fantastik
 * Date: 10/19/13
 * Time: 8:03 PM
 * To change this template use File | Settings | File Templates.
 */

function CreateRegister(polinom) {
    var obj = {};
    obj.value = Math.round(Math.random() * ((~0x0)>>>0));
    obj.Next = function() {
        var shiftBit = 0x0;
        for (var i = 0; i < polinom.length; i++) {
            shiftBit ^= (this.value >> polinom[i]);
            shiftBit >>>= 0;
        }
        this.value = ((((shiftBit & 0x1) << 31) >>> 0) | (this.value >>> 1)) >>> 0;
        return this.value & 0x1;
    }
    obj.getValue = function() {
        return this.value;
    };

    console.log("Shift register created with start value: " + obj.value.toString(16));
    return obj;
}

function RegisterMergeFunc(reg1, reg2, reg3) {
    return function() {
        var v1 = reg1.Next();
        var v2 = reg2.Next();
        var v3 = reg3.Next();

        return ((v1 ^ v2 ^ v3 ^ (v1 & v2) ^ (v1 & v2 & v3)) & 0x1) >>> 0;
    }
}

function EncryptData(mergeFunc, data) {
    var charMerg = function(mergeFunc, char) {
        for (var i = 15; i >= 0; i--) {
            char ^= (mergeFunc() << i)
        }
        return char;
    }

    var encData = new Array();
    for(var i = 0, l = data.length; i < l; i++) {
        encData.push(charMerg(mergeFunc, data[i]));
    }
    return encData;
}

function main() {
    var reg1 = CreateRegister([7,5,3,2,1,0]);
    var reg2 = CreateRegister([7,5,3,2,1,0]);
    var reg3 = CreateRegister([7,5,3,2,1,0]);

    var regMerge = RegisterMergeFunc(reg1, reg2, reg3);
    var regMergeCopy = RegisterMergeFunc(clone(reg1), clone(reg2), clone(reg3));

    var data = StringToData("hello");
    var encData = EncryptData(regMerge, data);
    var decData = EncryptData(regMergeCopy, encData);
    console.log(DataToString(decData));
}