/**
 * Created with JetBrains WebStorm.
 * User: fantastik
 * Date: 10/19/13
 * Time: 10:17 PM
 * To change this template use File | Settings | File Templates.
 */

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function StringToData(str) {
    var list = new Array();
    for(var i = 0, l = str.length; i < l; i++) {
        list.push((str.charCodeAt(i)) >>> 0);
    }
    return list;
}

function DataToString(data) {
    var str = '';
    for (var i = 0, l = data.length; i < l; i++) {
        str += String.fromCharCode(data[i]);
    }
    return str;
}