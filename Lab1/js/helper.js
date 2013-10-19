/**
 * Created with JetBrains WebStorm.
 * User: fantastik
 * Date: 10/19/13
 * Time: 10:17 PM
 * To change this template use File | Settings | File Templates.
 */

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
