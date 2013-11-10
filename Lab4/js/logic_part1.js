var model_part1;

function Model_part1() {
    // Models for UI
    this.encModel = undefined;
    this.decModel = undefined;

    this.TrySend = function(p, g, Kc, m) {
        this.encModel = new EncModel(p, g, Kc, m);
        return this.encModel.IsDataValid();
    }

    this.TryReceive = function(Ko, p, g, m, a, b) {
        this.decModel = new DecModel(Ko, p, g, m, a, b);
        return this.decModel.IsDataValid();
    }

    this.MakeSignature = function(){
        this.encModel.Start();
    }

    this.ValidateSignature = function() {
        return this.decModel.ValidateSignature();
    }

    return this;
}

function send() {
    if(model_part1 != undefined) {
        var p = $name('p-input').value,
            g = $name('g-input').value,
            kc = $name('kc-input').value,
            m = $name('m-input').value;
        if(model_part1.TrySend(p, g, kc, m))
            alert('ALL OK, CONGRATULATIONZ!111')
        else 
            alert(model_part1.encModel.errorMessage);
    }
}

function recive() {
        var ko = $name('ko-input').value,
            p = $name('p-input').value,
            g = $name('g-input').value,
            mr = $name('mr-input').value,
            a = $name('cbr-input').value,
            b = $name('cbr-input').value;
        if(model_part1.TryReceive(ko, p, g, mr, a, b))
            alert('ALL OK, CONGRATULATIONZ!111')
        else 
            alert(model_part1.encModel.errorMessage);
}