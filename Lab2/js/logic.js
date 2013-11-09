var model;

function CreateModel() {
    this.registerOne = new CreateRegister([13,4,3,1,0], 32);
    this.registerTwo = new CreateRegister([24,4,3,1,0], 30);
    this.registerThree = new CreateRegister([25,3,0], 28);

    this.mergedBit = 0;
    this.inProgress = false;
    this.string = '';
    this.chipherKey = '';

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

    this.AppendNextBitForChipher = function() {
        if (this.__isChipherKeyValid() == false) {
            this.__appendNextBitToChipherKey();
        }
    }

    this.IsChipherKeyReadyToUse = function() {
        return this.__isChipherKeyValid();
    }

    this.__prepare = function() {
        this.encodedData.length = 0;
        this.decodedData.length = 0;

        this.encodedBinaryString = '';
        this.decodedBinaryString = '';

        this.stringData = StringToData(this.string);
        this.plainBinaryString = DataToBinaryString(this.stringData);

        while(this.__isChipherKeyValid() == false) {
            this.__appendNextBitToChipherKey();
        }

        this.__prepare_tmp();
    }

    this.__prepare_tmp = function() {
        this.__encodingLeftSymb = 0;
        this.__decodingLeftSymb = 0;

        this.__bitNomInSymbol = 15;
        this.__chipherCursor = 0;
    }

    this.__isChipherKeyValid = function() {
        return this.chipherKey.length == 50;
    }

    this.__appendNextBitToChipherKey = function() {
        this.__shuffle();
        this.chipherKey += this.mergedBit.toString(2);
    }

    this.__next = function() {
        if (this.__checkTheEnd()) {
            this.inProgress = false;
            return;
        }

        if (this.__encodingLeftSymb < this.stringData.length) {
            this.__doEncodeNext();

            if (this.__encodingLeftSymb == this.stringData.length) {
                this.__chipherCursor = 0;
            }
        }
        else {
            this.__doDecodeNext();
        }

        if (this.__checkTheEnd()) {
            this.inProgress = false;
        }
    }

    this.__checkTheEnd = function() {
        return this.__encodingLeftSymb === this.stringData.length && this.__decodingLeftSymb === this.stringData.length;
    }

    this.__doEncodeNext = function() {
        var short = this.encodedData[this.__encodingLeftSymb] ^ (this.stringData[this.__encodingLeftSymb] & (0x1 << this.__bitNomInSymbol));
        short ^= (this.__getChipherBitByCursor() << this.__bitNomInSymbol);
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
        short ^= (this.__getChipherBitByCursor() << this.__bitNomInSymbol);
        this.decodedData[this.__decodingLeftSymb] = short;

        this.decodedBinaryString += ((short >>> this.__bitNomInSymbol) & 0x1).toString(2);

        this.__bitNomInSymbol--;
        if (this.__bitNomInSymbol < 0) {
            this.__bitNomInSymbol = 15;
            this.__decodingLeftSymb++;

            this.decodedBinaryString += ' ';
        }
    }

    this.__getChipherBitByCursor = function() {
        var bit = this.chipherKey[this.__chipherCursor];
        this.__chipherCursor = ( ++this.__chipherCursor) % this.chipherKey.length;
        return bit;
    }

    this.__shuffle = function() {
        var v1 = this.registerOne.Next();
        var v2 = this.registerTwo.Next();
        var v3 = this.registerThree.Next();

        this.mergedBit = ((v1 ^ v2 ^ v3 ^ (v1 & v2) ^ (v1 & v2 & v3)) & 0x1) >>> 0;
    }

    return this;
}

function CreateRegister(pol, capacity) {
    this.value = Math.round(Math.random() * (parseInt(Array(capacity).join('1'), 2)));
    this.polinom = pol;
    this.shiftedBit = 0;

    this.Next = function() {
        var shiftBit = 0x0;
        for (var i = 0; i < this.polinom.length; i++) {
            shiftBit ^= (this.value >> this.polinom[i]);
            shiftBit >>>= 0;
        }
        this.value = ((((shiftBit & 0x1) << capacity - 1) >>> 0) | (this.value >>> 1)) >>> 0;
        this.shiftedBit = this.value & 0x1;
        return this.shiftedBit;
    }
    this.GetBinaryString = function() {
        return (Array(capacity).join("0") + this.value.toString(2)).substr(-capacity);
    }

    console.log("Shift register have been created with start value: " + this.value.toString(16));
    return this;
}

function main() {
    model = new CreateModel();
}

function initModel() {
    var inputData = document.getElementById('inputData').value;
    if(inputData !== undefined && inputData.length > 0) {
        model.Start(inputData);
        return true;
    }
    else {
        alert('Please enter input string');
        return false;
    }
}

function nextAction() {
    if(!model.inProgress) {
        initModel()
    }

    $name("inputData").disabled = true;
    model.Next();
    refreshUI();
}

function fullAction() {
    if(!model.inProgress) {
        initModel()
    }

    $name("inputData").disabled = false;
    model.DoAllScope();
    refreshUI();
}

function $name(name) {
    return document.getElementsByName(name)[0];
}
function refreshUI() {
    if(model !== undefined) {
        //registers
        var firstReg = $name('firstReg'),
            secondReg = $name('secondReg'),
            thirdReg = $name('thirdReg'),
        //symbols
            firstSymb = $name('firstSymb'),
            secondSymb = $name('secondSymb'),
            thirdSymb = $name('thirdSymb'),
        //data fields
            binaryData = $name('binaryData'),
            encodeData = $name('encodeData'),
            decodeData = $name('decodeData'),
            dataSymb = $name('dataSymb');
            gammaChiper = $name('gammaChiper');
            
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
        //gamma chiper
        gammaChiper.value = model.chipherKey;
        if(model.IsChipherKeyReadyToUse) {
            $name("nextBit").disabled = true;
        }
    }
}

function nextBit() {
    if(!model.inProgress) {
        initModel()
    }
    refreshUI();
}