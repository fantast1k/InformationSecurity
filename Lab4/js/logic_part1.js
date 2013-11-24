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

function send_part1() {
    if(model_part1 != undefined) {
        var p = $name('p-input').value,
            g = $name('g-input').value,
            kc = $name('kc-input').value,
            m = $name('m-input').value;
        if(model_part1.TrySend(p, g, kc, m)) {
            model_part1.MakeSignature();
            refreshSendUI_part1();
            fullfillReceiveUI_part1();
        }
        else 
            alert(model_part1.encModel.errorMessage);
    }
}

function recive_part1() {
        var ko = $name('kor-input').value,
            p = $name('p-input').value,
            g = $name('g-input').value,
            mr = $name('mr-input').value,
            a = $name('car-input').value,
            b = $name('cbr-input').value;
        if(model_part1.TryReceive(ko, p, g, mr, a, b)) {
            alert('Signature valid: ' + model_part1.ValidateSignature());
        }
        else 
            alert(model_part1.encModel.errorMessage);
}

function refreshSendUI_part1() {
    $name('ca-input').value = model_part1.encModel.a;
    $name('cb-input').value = model_part1.encModel.b;
    $name('k-input').value = model_part1.encModel.k;
    $name('ko-input').value = model_part1.encModel.Ko;
    $name('p-input').disabled = 'true';
    $name('g-input').disabled = 'true';
}

function fullfillReceiveUI_part1() {
    $name('car-input').value = model_part1.encModel.a;
    $name('cbr-input').value = model_part1.encModel.b;
    $name('mr-input').value = model_part1.encModel.m;
    $name('kor-input').value = model_part1.encModel.Ko;
}