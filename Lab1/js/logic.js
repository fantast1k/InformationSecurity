/**
 * Created with JetBrains WebStorm.
 * User: fantastik
 * Date: 10/19/13
 * Time: 8:03 PM
 * To change this template use File | Settings | File Templates.
 */

function CreateRegister(polinom) {
    this.ShiftRegister = Math.round(Math.random() * ((~0x0)>>>0));
    console.log("Shift register created with star value: " + ShiftRegister.toString(16));

    this.Next = function() {
        var shiftBit = 0x0;
        for (var i = 0; i < polinom.length; i++) {
            shiftBit ^= (ShiftRegister >> polinom[i]);
            shiftBit >>>= 0;
        }
        ShiftRegister = ((((shiftBit & 0x1) << 31) >>> 0) | (ShiftRegister >>> 1)) >>> 0;
        return ShiftRegister & 0x1;
    }
    return this;
}

function main() {
    var reg = CreateRegister([7,5,3,2,1,0]);
    var reg2 = clone(reg);
    console.log(reg.ShiftRegister.toString(16));
    reg.Next();
    console.log(reg.ShiftRegister.toString(16));


    console.log(reg2.ShiftRegister.toString(16));
    reg2.Next();
    console.log(reg2.ShiftRegister.toString(16));
}