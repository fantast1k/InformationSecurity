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