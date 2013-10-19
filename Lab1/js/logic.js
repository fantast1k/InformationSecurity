/**
 * Created with JetBrains WebStorm.
 * User: fantastik
 * Date: 10/19/13
 * Time: 8:03 PM
 * To change this template use File | Settings | File Templates.
 */

function CreateRegister(polinom) {
    var neObj = {};
    neObj.ShiftRegister = Math.round(Math.random() * ((~0x0)>>>0));
    console.log("Shift register created with star value: " + neObj.ShiftRegister.toString(16));

    neObj.Next = function() {
        var shiftBit = 0x0;
        for (var i = 0; i < polinom.length; i++) {
            shiftBit ^= (neObj.ShiftRegister >> polinom[i]);
            shiftBit >>>= 0;
        }
        neObj.ShiftRegister = ((((shiftBit & 0x1) << 31) >>> 0) | (neObj.ShiftRegister >>> 1)) >>> 0;
        return neObj.ShiftRegister & 0x1;
    }
    return neObj;
}

function main() {
    var reg = CreateRegister([7,5,3,2,1,0]);
    console.log(reg);
    var reg2 = clone(reg);
    console.log(reg.ShiftRegister.toString(16));
    reg.Next();
    console.log(reg.ShiftRegister.toString(16));


    console.log(reg2.ShiftRegister.toString(16));
    reg2.Next();
    console.log(reg2.ShiftRegister.toString(16));
}