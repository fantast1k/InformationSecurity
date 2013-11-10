/**
 * Created with JetBrains WebStorm.
 * User: fantastik
 * Date: 11/9/13
 * Time: 11:09 PM
 * To change this template use File | Settings | File Templates.
 */

var model_part1;

function Model_part1() {
    // Models for UI
    this.encModel = undefined;
    this.decModel = undefined;

    this.TrySend = function(p, g, Kc, m)
    {
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