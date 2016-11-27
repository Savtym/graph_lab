var scaleK = 1;

function initKox(id) {
  this.repetKox = function() {
    var field = new kox();
    field.setParams(canvas.width, canvas.height, 150, 10, 150);
    field.draw(context);
  }
  var canvas = document.getElementById(id);
  var context = canvas.getContext("2d");
  setInterval(this.repetKox, 5000);
  this.repetKox();
}

function kox() {
  var context = null;
  var width;
  var height;
  var startWidth;
  var limWidth = 1;
  var xBeg;
  var yBeg;
  this.setParams = function(w, h, x, y, Width) {
    width = w;
    height = h;
    startWidth = Width;
    xBeg = x;
    yBeg = y;
  };

  this.PaintTimer = function(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }
  var delay = 0;
  this.LineTo = function(x1, y1, x2, y2) {
    delay += 10;
    setTimeout(this.PaintTimer, delay, x1, y1, x2, y2);
  }

  this.drawSide = function(x1, y1, x2, y2) {
    var sideWidth = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    if (sideWidth / 3 < limWidth) {
      this.LineTo(x1, y1, x2, y2);
    } else {
      var x2t1 = x1 + (sideWidth / 3) * (x2 - x1) / sideWidth;
      var y2t1 = y1 + (sideWidth / 3) * (y2 - y1) / sideWidth;
      var temp1 = x2t1;
      var temp2 = y2t1;

      this.drawSide(x1, y1, x2t1, y2t1);

      var x1t2 = temp1;
      var y1t2 = temp2;

      var x2t2 = x1 + (2 * sideWidth / 3) * (x2 - x1) / sideWidth;
      var y2t2 = y1 + (2 * sideWidth / 3) * (y2 - y1) / sideWidth;

      var temp3 = x1t2 + (x2t2 - x1t2) * Math.cos(Math.PI / 3) + (y1t2 - y2t2) * Math.sin(Math.PI / 3);
      var temp4 = y1t2 + (x2t2 - x1t2) * Math.sin(Math.PI / 3) + (y2t2 - y1t2) * Math.cos(Math.PI / 3);
      var x2t2 = temp3;
      var y2t2 = temp4;

      this.drawSide(x1t2, y1t2, x2t2, y2t2);
      var x1t3 = x2t2;
      var y1t3 = y2t2;
      var x2t3 = x1 + (2 * sideWidth / 3) * (x2 - x1) / sideWidth;
      var y2t3 = y1 + (2 * sideWidth / 3) * (y2 - y1) / sideWidth;
      this.drawSide(x1t3, y1t3, x2t3, y2t3);
      var x1t4 = x1 + (2 * sideWidth / 3) * (x2 - x1) / sideWidth;
      var y1t4 = y1 + (2 * sideWidth / 3) * (y2 - y1) / sideWidth;
      this.drawSide(x1t4, y1t4, x2, y2);
    }

  }

  this.drawKox = function() {
    context.lineWidth = 1;
    var x1 = xBeg;
    var y1 = yBeg;
    var x2 = x1;
    var y2 = y1 + startWidth;
    var x2t1 = x1 + (x2 - x1) * Math.cos(Math.PI / 6) + (y1 - y2) * Math.sin(Math.PI / 6);
    var y2t1 = y1 + (x2 - x1) * Math.sin(Math.PI / 6) + (y2 - y1) * Math.cos(Math.PI / 6);
    this.drawSide(x1, y1, x2t1, y2t1);
    this.drawSide(x2t1, y2t1, x1 + startWidth / 2, y2t1);
    this.drawSide(x1 + startWidth / 2, y2t1, x1, y1);

  }

  this.draw = function(cont) {
    context = cont;
    this.drawKox();
  }
}

function cloud(id, height, width) {
  const STEP_X = 10;
  const STEP_Y = 10;
  const SX = 0.005;
  const SY = 0.005;
  const DX = -150;
  const DY = -135;
  const COUNT_ITER = 500;
  const BAIL_OUT = 32;

  var canvas = document.getElementById(id);
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.stroke();
  context.closePath();

  drawClouds(context, height, width);

  function draw(x, y, ctx) {
    ctx.fillStyle = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
    ctx.stroke();
  }

  function drawClouds(ctx, height, width) {
    for (var i = 0; i < width; i += STEP_X) {
      for (var j = 0; j < height; j += STEP_Y) {
        var c = SX * (i + DX),
          d = SY * (j + DY),
          x = c,
          y = d,
          t;
        for (var k = 0; x * x + y * y < BAIL_OUT && k < COUNT_ITER; k++) {
          t = x * x - y * y + c;
          y = 2 * x * y + d;
          x = t;
          draw(x / SX - DX, y / SY - DY, ctx);
        }
      }
    }
  }
}

function triangle(id) {
  function drawPixel(x, y, context) {
    context.fillRect(x, y, 1, 1);
  }

  canvas = document.getElementById(id);
  c = canvas.getContext("2d");
  c.fillStyle = "#000";

  var tr = new Array(canvas.height);
  for (i = 0; i < canvas.height; i++) {
    tr[i] = new Array(canvas.width);
    for (k = 0; k < canvas.width; k++) {
      if (k == 0)
        tr[i][k] = 1;
      else
        tr[i][k] = 0;
    }
  }

  for (i = 1; i < canvas.height; i++) {
    for (k = 1; k < canvas.width; k++) {
      tr[i][k] = (tr[i - 1][k - 1] + tr[i - 1][k]) % 2;
    }
  }

  for (i = 0; i < canvas.height; i++) {
    for (k = 0; k < canvas.width; k++) {
      if (tr[i][k] != 0)
        drawPixel(k, i, c);
    }
  }
}

function carter(id) {
  class Rectangle {
    constructor(x, y, height, width) {
      this.x = Math.round(x);
      this.y = Math.round(y);
      this.height = Math.round(height);
      this.width = Math.round(width);
    }
  };

  var ctx = document.getElementById(id).getContext('2d');
  carpet(5, new Rectangle(0, 0, 450, 450), ctx);

  function draw(rect, ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(rect.x, rect.y, rect.height, rect.width);
    ctx.stroke();
  }

  function carpet(level, rect, ctx) {
    if (level == 0) {
      draw(rect, ctx);
      return;
    }

    var height = rect.height / 3,
      width = rect.width / 3,
      x1 = rect.x,
      x2 = x1 + width,
      x3 = x1 + 2 * width,
      y1 = rect.y,
      y2 = y1 + height,
      y3 = y1 + 2 * height;

    carpet(level - 1, new Rectangle(x1, y1, width, height), ctx);
    carpet(level - 1, new Rectangle(x2, y1, width, height), ctx);
    carpet(level - 1, new Rectangle(x3, y1, width, height), ctx);
    carpet(level - 1, new Rectangle(x1, y2, width, height), ctx);
    carpet(level - 1, new Rectangle(x3, y2, width, height), ctx);
    carpet(level - 1, new Rectangle(x1, y3, width, height), ctx);
    carpet(level - 1, new Rectangle(x2, y3, width, height), ctx);
    carpet(level - 1, new Rectangle(x3, y3, width, height), ctx);
  }
}

function kohCross(id) {
  var ctx = document.getElementById(id).getContext('2d');
}

function scale(k, id) {
  scaleK += k;
  var canvas = document.getElementById(id);
  canvas.cleat
  cloud('fill2', canvas.width * scaleK, canvas.height * scaleK);
}


initKox('fill1');
cloud('fill2', 400, 300);
triangle('fill3');
carter('fill4');
kohCross('fill5');
