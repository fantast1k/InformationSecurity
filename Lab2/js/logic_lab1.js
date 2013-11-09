var model_lab1;

function CreateModel_lab1() {
    this.registerOne = new Register([13,4,3,1,0], 32);
    this.registerTwo = new Register([24,4,3,1,0], 30);
    this.registerThree = new Register([25,3,0], 28);

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

function initModel_lab1() {
    var inputData = document.getElementById('inputData').value;
    if(inputData !== undefined && inputData.length > 0) {
        model_lab1.Start(inputData);
        return true;
    }
    else {
        alert('Please enter input string');
        return false;
    }
}

function nextAction() {
    if(!model_lab1.inProgress) {
        initModel_lab1()
    }

    $name("inputData").disabled = false;
    model_lab1.Next();
    refreshUI_lab1();
}

function fullAction() {
    if(!model_lab1.inProgress) {
        initModel_lab1()
    }

    $name("inputData").disabled = false;
    model_lab1.DoAllScope();
    refreshUI_lab1();
}

function nextBit() {
    if(!model.inProgress) {
        initModel()
    }
    refreshUI_lab1();
}

function refreshUI_lab1() {
    if(model_lab1 !== undefined) {
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
            dataSymb = $name('dataSymb'),
            gammaChiper = $name('gammaChiper');

        //registers
        firstReg.value = model_lab1.registerOne.GetBinaryString();
        secondReg.value = model_lab1.registerTwo.GetBinaryString();
        thirdReg.value = model_lab1.registerThree.GetBinaryString();
        //symbols
        firstSymb.value = model_lab1.registerOne.shiftedBit;
        secondSymb.value = model_lab1.registerTwo.shiftedBit;
        thirdSymb.value = model_lab1.registerThree.shiftedBit;
        //data fields
        binaryData.value = model_lab1.plainBinaryString;
        encodeData.value = model_lab1.encodedBinaryString;
        decodeData.value = model_lab1.decodedBinaryString;
        dataSymb.value = model_lab1.mergedBit;
       //gamma chiper
        gammaChiper.value = model.chipherKey;
        if(model.IsChipherKeyReadyToUse) {
            $name("nextBit").disabled = true;
        }
    }
}

