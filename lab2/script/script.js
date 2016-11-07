var canvas = document.getElementById('bezier');
var ctx = canvas.getContext('2d');

ctx.lineWidth = 0.1;

var arr = new Array();
arr[0] = new Array(100, 100);
arr[1] = new Array(120, 420);
arr[2] = new Array(150, 10);
arr[3] = new Array(200, 200);

drawLines(getBezierCurve(0.03));


// i - номер вершины, n - количество вершин, t - положение кривой (от 0 до 1)
function getBezierBasis(i, n, t) {
    // Факториал
    function f(n) {
        return (n <= 1) ? 1 : n * f(n - 1);
    }
    // считаем i-й элемент полинома Берштейна
    return (f(n) / (f(i) * f(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
}

function getBezierCurve(step) {
    if (step === undefined) {
        step = 0.01;
    }
    var res = [];
    step = step / arr.length;
    for (var t = 0.0; t < 1 + step; t += step) {
        if (t > 1) {
            t = 1;
        }
        var ind = res.length;
        res[ind] = new Array(0, 0);
        for (var i = 0; i < arr.length; i++) {
            var b = getBezierBasis(i, arr.length - 1, t);
            res[ind][0] += arr[i][0] * b;
            res[ind][1] += arr[i][1] * b;
        }
    }
    return res;
}

function drawLines(array) {
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
    var i = 0;
    function delayDraw() {
        if (i >= array.length - 1) {
            return;
        }
        ctx.moveTo(array[i][0], array[i][1]);
        ctx.lineTo(array[i + 1][0], array[i + 1][1]);
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        ++i;
        delayDraw();
    }
    delayDraw();
}

function move(x, y) {
    arr.forEach(function(item, i, arr) {
    	item[0] += x;
    	item[1] += y;
    });
    drawLines(getBezierCurve(0.03));
}

function turn(angle) {
    var center = {
    	x : Math.abs((arr[0][0] - arr[arr.length - 1][0]) / 2) + arr[0][0],
    	y : Math.abs((arr[0][1] - arr[arr.length - 1][1]) / 2) + arr[0][1]
    }
    arr.forEach(function(item, i, arr) {
    	var buf = item[0] - center.x;
    	item[0] = parseInt((item[0] - center.x) * Math.cos(angle) - (item[1] - center.y) * Math.sin(angle)) + center.x;
    	item[1] = parseInt(buf * Math.sin(angle) + (item[1] - center.y) * Math.cos(angle)) + center.y;
    });
    drawLines(getBezierCurve(0.03));
}

function scale(k) {
    arr.forEach(function(item, i, arr) {
    	item[0] *= k;
    	item[1] *= k;
    });
    drawLines(getBezierCurve(0.03));
}