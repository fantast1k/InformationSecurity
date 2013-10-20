/**
 * Created with JetBrains WebStorm.
 * User: fantastik
 * Date: 10/19/13
 * Time: 8:03 PM
 * To change this template use File | Settings | File Templates.
 */

var model;

function CreateModel() {
    var obj = {};
    obj.registerOne = CreateRegister([7,5,3,2,1,0]);
    obj.registerTwo = CreateRegister([7,5,3,2,1,0]);
    obj.registerThree = CreateRegister([7,5,3,2,1,0]);

    obj.mergedBit = 0;
    obj.inProgress = false;
    obj.string = '';

    obj.encodedData = new Array();
    obj.decodedData = new Array();
    obj.stringData = new Array();

    obj.encodedBinaryString = '';
    obj.decodedBinaryString = '';
    obj.plainBinaryString = '';

    obj.Start = function(str) {
        obj.string = str;
        obj.inProgress = true;
        obj.__prepare();
    }

    obj.Next = function() {
        if (obj.inProgress) {
            obj.__next();
        }
    }

    obj.DoAllScope = function() {
        while(obj.inProgress) {
            obj.Next();
        }
    }

    obj.__prepare = function() {
        obj.encodedData.length = 0;
        obj.decodedData.length = 0;

        obj.encodedBinaryString = '';
        obj.decodedBinaryString = '';

        obj.stringData = StringToData(obj.string);
        obj.plainBinaryString = DataToBinaryString(obj.stringData);

        obj.__prepare_tmp();
    }

    obj.__prepare_tmp = function() {
        obj.__regCopyOne = clone(obj.registerOne);
        obj.__regCopyTwo = clone(obj.registerTwo);
        obj.__regCopyThree = clone(obj.registerThree);

        obj.__encodingLeftSymb = 0;
        obj.__decodingLeftSymb = 0;

        obj.__bitNomInSymbol = 15;
    }

    obj.__next = function() {
        if (obj.__checkTheEnd()) {
            obj.inProgress = false;
            return;
        }

        obj.__shuffle();
        if (obj.__encodingLeftSymb < obj.stringData.length) {
            obj.__doEncodeNext();

            if (obj.__encodingLeftSymb == obj.stringData.length) {
                obj.__swapRegisters();
            }
        }
        else {
            obj.__doDecodeNext();
        }
    }

    obj.__checkTheEnd = function() {
        return obj.__encodingLeftSymb === obj.stringData.length && obj.__decodingLeftSymb === obj.stringData.length;
    }

    obj.__doEncodeNext = function() {
        var short = obj.encodedData[obj.__encodingLeftSymb] ^ (obj.stringData[obj.__encodingLeftSymb] & (0x1 << obj.__bitNomInSymbol));
        short ^= (obj.mergedBit << obj.__bitNomInSymbol);
        obj.encodedData[obj.__encodingLeftSymb] = short;

        obj.encodedBinaryString += ((short >>> obj.__bitNomInSymbol) & 0x1).toString(2);

        obj.__bitNomInSymbol--;
        if (obj.__bitNomInSymbol < 0) {
            obj.__bitNomInSymbol = 15;
            obj.__encodingLeftSymb++;

            obj.encodedBinaryString += ' ';
        }
    }

    obj.__doDecodeNext = function() {
        var short = obj.decodedData[obj.__decodingLeftSymb] ^ (obj.encodedData[obj.__decodingLeftSymb] & (0x1 << obj.__bitNomInSymbol));
        short ^= (obj.mergedBit << obj.__bitNomInSymbol);
        obj.decodedData[obj.__decodingLeftSymb] = short;

        obj.decodedBinaryString += ((short >>> obj.__bitNomInSymbol) & 0x1).toString(2);

        obj.__bitNomInSymbol--;
        if (obj.__bitNomInSymbol < 0) {
            obj.__bitNomInSymbol = 15;
            obj.__decodingLeftSymb++;

            obj.decodedBinaryString += ' ';
        }
    }

    obj.__swapRegisters = function() {
        obj.registerOne = obj.__regCopyOne;
        obj.registerTwo = obj.__regCopyTwo;
        obj.registerThree = obj.__regCopyThree;
    }

    obj.__shuffle = function() {
        var v1 = obj.registerOne.Next();
        var v2 = obj.registerTwo.Next();
        var v3 = obj.registerTwo.Next();

        obj.mergedBit = ((v1 ^ v2 ^ v3 ^ (v1 & v2) ^ (v1 & v2 & v3)) & 0x1) >>> 0;
    }

    return obj;
}

function CreateRegister(polinom) {
    var obj = {};
    obj.value = Math.round(Math.random() * ((~0x0)>>>0));
    obj.polinom = polinom;
    obj.shiftedBit = 0;

    obj.Next = function() {
        var shiftBit = 0x0;
        for (var i = 0; i < polinom.length; i++) {
            shiftBit ^= (this.value >> polinom[i]);
            shiftBit >>>= 0;
        }
        this.value = ((((shiftBit & 0x1) << 31) >>> 0) | (this.value >>> 1)) >>> 0;
        this.shiftedBit = this.value & 0x1;
        return this.shiftedBit;
    }
    obj.GetBinaryString = function() {
        return ('00000000000000000000000000000000' + obj.value.toString(2)).substr(-32);
    }

    console.log("Shift register created with start value: " + obj.value.toString(16));
    return obj;
}

function main() {
    model = CreateModel();

    // All scope usage
    model.Start('hello');
    model.DoAllScope();

    // Step by step usage
    model.Start('hello');
    for (var i = 0, end = 'hello'.length*2*16; i < end; i++) {
        model.Next();
    }
}