// const

var colorFigure = { 'r': 1000, 'g': 0, 'b': 0, 'a': 10000 };

// 1
var obj1 = {
    x1: 10,
    y1: 10,
    x2: 90,
    y2: 30
};

// 2
var obj2_1 = {
    x1: 10,
    y1: 10,
    x2: 90,
    y2: 30
};

// 2
var obj2_2 = {
    x: 150,
    y: 50,
    r: 30
}

// 3
var obj3 = {
    x1: 10,
    y1: 10,
    x2: 90,
    y2: 30
}

var byNameText = 'Tymofii';

$(function() {
    DDA(obj1.x1, obj1.y1, obj1.x2, obj1.y2);
    bresenhamLine(obj2_1.x1, obj2_1.y1, obj2_1.x2, obj2_1.y2);
    bresenhamCircle(obj2_2.x, obj2_2.y, obj2_2.r);
    wuLine(obj3.x1, obj3.y1, obj3.x2, obj3.y2);
    byName(byNameText);
});

function draw(context, color, x, y) {
    var imagedata = context.createImageData(1, 1);
    imagedata.data[0] = color.r;
    imagedata.data[1] = color.g;
    imagedata.data[2] = color.b;
    imagedata.data[3] = color.a;
    context.putImageData(imagedata, x, y);
};

// speed = ((x2 - x1) * (2 + const) + 2 * 3)
function DDA(x1, y1, x2, y2) {
    var canvas = document.getElementById("canvas1");
    var context = canvas.getContext("2d");
    if (x1 > x2) {
        x2 = [x1, x1 = x2][0];
        if (y1 > y2) {
            y2 = [y1, y1 = y2][0];
        }
    }
    var Px = x2 - x1;
    var Py = y2 - y1;
    var y = y1;
    for (var x = x1; x <= x2; x++) {
        y += Py / Px;
        draw(context, colorFigure, x, y);
    }
}

// speed = ((x2 - x1) * (3 + const) + 4 * 3 + 4)
function bresenhamLine(x1, y1, x2, y2) {
    var canvas = document.getElementById("canvas2");
    var context = canvas.getContext("2d");
    var steep = Math.abs(y2 - y1) > Math.abs(x2 - x1);
    if (steep) {
        x1 = [y1, y1 = x1][0];
        x2 = [y2, y2 = x2][0];
    }
    if (x1 > x2) {
        x1 = [x2, x2 = x1][0];
        y1 = [y2, y2 = y1][0];
    }
    var dx = x2 - x1;
    var dy = y2 - y1;
    var error = dx / 2;
    var yStep = (y1 < y2) ? 1 : -1;
    var y = y1;
    for (var x = x1; x < x2; x++) {
        draw(context, colorFigure, steep ? y : x, steep ? x : y);
        error -= dy;
        if (error < 0) {
            y += yStep;
            error += dx;
        }
    }
}

// speed = (x1 / 4) * (((const * 8 + 16)) + 3)
function bresenhamCircle(x1, y1, r) {
    var canvas = document.getElementById("canvas2");
    var context = canvas.getContext("2d");
    x = r;
    y = 0;
    rError = 1 - x;
    for (; x >= y;) {
        draw(context, colorFigure, x + x1, y + y1);
        draw(context, colorFigure, y + x1, x + y1);
        draw(context, colorFigure, -x + x1, y + y1);
        draw(context, colorFigure, -y + x1, x + y1);
        draw(context, colorFigure, -x + x1, -y + y1);
        draw(context, colorFigure, -y + x1, -x + y1);
        draw(context, colorFigure, x + x1, -y + y1);
        draw(context, colorFigure, y + x1, -x + y1);
        y++;
        if (rError < 0) {
            rError += 2 * y + 1;
        } else {
            x--;
            rError += 2 * (y - x + 1);
        }
    }
}

// speed = ((x2 - x1) * (3 + const * 2) + 4 * 3 * 2 + const * 2 + 5)
function wuLine(x1, y1, x2, y2) {
    var canvas = document.getElementById("canvas3");
    var context = canvas.getContext("2d");
    var steep = Math.abs(y2 - y1) > Math.abs(x2 - x1);
    if (steep) {
        x1 = [y1, y1 = x1][0];
        x2 = [y2, y2 = x2][0];
    }
    if (x1 > x2) {
        x1 = [x2, x2 = x1][0];
        y1 = [y2, y2 = y1][0];
    }
    draw(context, colorFigure, steep ? y1 : x1, steep ? x1 : y1);
    draw(context, colorFigure, steep ? y2 : x2, steep ? x2 : y2);
    var dx = x2 - x1;
    var dy = y2 - y1;
    var gradient = dy / dx;
    var y = y1 + gradient;
    for (var x = x1 + 1; x < x2 - 1; x++) {
        colorFigure.a = (1 - (y - Math.floor(y))) * 10000;
        draw(context, colorFigure, x, Math.floor(y));
        colorFigure.a = (y - Math.floor(y)) * 10000;
        draw(context, colorFigure, x, Math.floor(y));
        y += gradient;
    }
}

function byName(text) {
    var canvas = document.getElementById("canvas4");
    var context = canvas.getContext("2d");
    context.fillStyle = "#00F";
    context.strokeStyle = "#F00";
    context.font = "30pt Arial";
    context.fillText(text, 20, 50);
}
