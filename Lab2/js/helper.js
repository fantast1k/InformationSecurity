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

function DataToBinaryString(data) {
    var str = '';
    for (var i = 0, l = data.length; i < l; i++) {
        var hex = ('0000000000000000' + data[i].toString(2)).substr(-16);
        str = str + hex + ' ';
    }
    return str;
}

function RemoveSpacesInString(str) {
    return str.replace('/\\s/g', '');
}

function $name(name) {
    return document.getElementsByName(name)[0];
}

function $id(id) {
    return document.getElementById(id);
}

function showPart1() {
    $name('link-part1').className = "active";
    $name('link-part2').className = "";
    $id('tab-part1').style.display = 'block';
    $id('tab-part2').style.display = 'none';
}
function showPart2() {
    $name('link-part1').className = "";
    $name('link-part2').className = "active";
    $id('tab-part1').style.display = 'none';
    $id('tab-part2').style.display = 'block';
}