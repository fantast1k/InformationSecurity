/**
 * Created with JetBrains WebStorm.
 * User: fantastik
 * Date: 10/19/13
 * Time: 8:03 PM
 * To change this template use File | Settings | File Templates.
 */

function CreateRegister(polinom) {
    var shiftRegister = Math.round(Math.random() * ((~0x0)>>>0));
    console.log("Shift register created with star value: " + shiftRegister.toString(16));
    return function() {
        var shiftBit = 0x0;
        for (var i = 0; i < polinom.length; i++) {
            shiftBit ^= (shiftRegister >> polinom[i]);
            shiftBit >>>= 0;
        }
        shiftRegister = ((((shiftBit & 0x1) << 31) >>> 0) | (shiftRegister >>> 1)) >>> 0;
        console.log(shiftRegister.toString(16));
        return shiftRegister & 0x1;
    }
}

function main() {
    var reg = CreateRegister([7,5,3,2,1,0]);
    for (var i = 0; i < 320; i++) {
        reg();
    }
}