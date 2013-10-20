var model;

function CreateModel() {
    this.registerOne = new CreateRegister([7,5,3,2,1,0]);
    this.registerTwo = new CreateRegister([7,5,3,2,1,0]);
    this.registerThree = new CreateRegister([7,5,3,2,1,0]);

    this.mergedBit = 0;
    this.inProgress = false;
    this.string = '';

    this.encodedData = new Array();
    this.decodedData = new Array();
    this.stringData = new Array();

    this.encodedBinaryString = '';
    this.decodedBinaryString = '';
    this.plainBinaryString = '';

    this.Start = function(str) {
        this.string = str;
        this.inProgress = true;
        this.__prepare();
    }

    this.Next = function() {
        if (this.inProgress) {
            this.__next();
        }
    }

    this.DoAllScope = function() {
        while(this.inProgress) {
            this.Next();
        }
    }

    this.__prepare = function() {
        this.encodedData.length = 0;
        this.decodedData.length = 0;

        this.encodedBinaryString = '';
        this.decodedBinaryString = '';

        this.stringData = StringToData(this.string);
        this.plainBinaryString = DataToBinaryString(this.stringData);

        this.__prepare_tmp();
    }

    this.__prepare_tmp = function() {
        this.__regCopyOne = clone(this.registerOne);
        this.__regCopyTwo = clone(this.registerTwo);
        this.__regCopyThree = clone(this.registerThree);

        this.__encodingLeftSymb = 0;
        this.__decodingLeftSymb = 0;

        this.__bitNomInSymbol = 15;
    }

    this.__next = function() {
        if (this.__checkTheEnd()) {
            this.inProgress = false;
            return;
        }

        this.__shuffle();
        if (this.__encodingLeftSymb < this.stringData.length) {
            this.__doEncodeNext();

            if (this.__encodingLeftSymb == this.stringData.length) {
                this.__swapRegisters();
            }
        }
        else {
            this.__doDecodeNext();
        }
    }

    this.__checkTheEnd = function() {
        return this.__encodingLeftSymb === this.stringData.length && this.__decodingLeftSymb === this.stringData.length;
    }

    this.__doEncodeNext = function() {
        var short = this.encodedData[this.__encodingLeftSymb] ^ (this.stringData[this.__encodingLeftSymb] & (0x1 << this.__bitNomInSymbol));
        short ^= (this.mergedBit << this.__bitNomInSymbol);
        this.encodedData[this.__encodingLeftSymb] = short;

        this.encodedBinaryString += ((short >>> this.__bitNomInSymbol) & 0x1).toString(2);

        this.__bitNomInSymbol--;
        if (this.__bitNomInSymbol < 0) {
            this.__bitNomInSymbol = 15;
            this.__encodingLeftSymb++;

            this.encodedBinaryString += ' ';
        }
    }

    this.__doDecodeNext = function() {
        var short = this.decodedData[this.__decodingLeftSymb] ^ (this.encodedData[this.__decodingLeftSymb] & (0x1 << this.__bitNomInSymbol));
        short ^= (this.mergedBit << this.__bitNomInSymbol);
        this.decodedData[this.__decodingLeftSymb] = short;

        this.decodedBinaryString += ((short >>> this.__bitNomInSymbol) & 0x1).toString(2);

        this.__bitNomInSymbol--;
        if (this.__bitNomInSymbol < 0) {
            this.__bitNomInSymbol = 15;
            this.__decodingLeftSymb++;

            this.decodedBinaryString += ' ';
        }
    }

    this.__swapRegisters = function() {
        this.registerOne = this.__regCopyOne;
        this.registerTwo = this.__regCopyTwo;
        this.registerThree = this.__regCopyThree;
    }

    this.__shuffle = function() {
        var v1 = this.registerOne.Next();
        var v2 = this.registerTwo.Next();
        var v3 = this.registerTwo.Next();

        this.mergedBit = ((v1 ^ v2 ^ v3 ^ (v1 & v2) ^ (v1 & v2 & v3)) & 0x1) >>> 0;
    }

    return this;
}

function CreateRegister(polinom) {
    this.value = Math.round(Math.random() * ((~0x0)>>>0));
    this.polinom = polinom;
    this.shiftedBit = 0;

    this.Next = function() {
        var shiftBit = 0x0;
        for (var i = 0; i < polinom.length; i++) {
            shiftBit ^= (this.value >> polinom[i]);
            shiftBit >>>= 0;
        }
        this.value = ((((shiftBit & 0x1) << 31) >>> 0) | (this.value >>> 1)) >>> 0;
        this.shiftedBit = this.value & 0x1;
        return this.shiftedBit;
    }
    this.GetBinaryString = function() {
        return ('00000000000000000000000000000000' + this.value.toString(2)).substr(-32);
    }

    console.log("Shift register have been created with start value: " + this.value.toString(16));
    return this;
}

function main() {
    model = CreateModel();
}

function initModel() {
    var inputData = document.getElementById('inputData').value;
    if(inputData != undefined && inputData.length > 0) {
        model.Start(inputData);
        return true;
    }
    else {
        alert('Please enter input string');
        return false;
    }
}

function nextAction() {
    if(initModel()) {
        model.Next();
        refreshUI();
    }
}

function fullAction() {
    if(initModel()) {
        model.DoAllScope();
        refreshUI();
    }
}
function refreshUI() {
    if(model != undefined) {
        //registers
        var firstReg = document.getElementsByName("firstReg")[0];
        var secondReg = document.getElementsByName("secondReg")[0];
        var thirdReg = document.getElementsByName("thirdReg")[0];
        //symbols
        var firstSymb = document.getElementsByName("firstSymb")[0];
        var secondSymb = document.getElementsByName("secondSymb")[0];
        var thirdSymb = document.getElementsByName("thirdSymb")[0];      
        //data fields
        var binaryData = document.getElementsByName("binaryData")[0];
        var encodeData = document.getElementsByName("encodeData")[0];
        var decodeData = document.getElementsByName("decodeData")[0];
        var dataSymb = document.getElementsByName("dataSymb")[0];
        //registers
        firstReg.value = model.registerOne.GetBinaryString();
        secondReg.value = model.registerTwo.GetBinaryString();
        thirdReg.value = model.registerThree.GetBinaryString();
        //symbols
        firstSymb.value = model.registerOne.shiftedBit;
        secondSymb.value = model.registerTwo.shiftedBit;
        thirdSymb.value = model.registerThree.shiftedBit;
        //data fields
        binaryData.value = model.plainBinaryString;
        encodeData.value = model.encodedBinaryString;
        decodeData.value = model.decodedBinaryString;
        dataSymb.value = model.mergedBit;
    }
}