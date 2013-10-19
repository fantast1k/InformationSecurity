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

function main() {
    var reg = CreateRegister([7,5,3,2,1,0]);;
    var reg2 = clone(reg);
    console.log(reg.getValue().toString(16));
    reg.Next();
    console.log(reg.getValue().toString(16));


    console.log(reg2.getValue().toString(16));
    reg2.Next();
    console.log(reg2.getValue().toString(16));
}