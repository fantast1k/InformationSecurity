function Register(pol, capacity, value) {
    if (value === undefined) {
        this.value = Math.round(Math.random() * (parseInt(Array(capacity).join('1'), 2)));
    }
    else {
        this.value = value;
    }

    this.polinom = pol;
    this.shiftedBit = this.value & 0x1;

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