//инициализация
function initKox(id) {
  this.showBorders = function() {
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(1, 1);
    context.lineTo(1, canvas.height - context.lineWidth);
    context.lineTo(canvas.width - context.lineWidth, canvas.height - context.lineWidth);
    context.lineTo(canvas.width - context.lineWidth, 1);
    context.lineTo(1, 1);
    context.stroke();
  };
  this.clearField = function() {
    context.fillStyle = "#fff"; // цвет "заливки"
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  this.repetKox = function() {
      this.clearField();
      this.showBorders();
      var field = new kox();
      field.setParams(canvas.width, canvas.height, 250, 10, 200);
      field.draw(context);

      var field2 = new kox();
      field2.setParams(canvas.width, canvas.height, 150, 10 + Math.sqrt(200 * 200 - 100 * 100), 200);
      field2.draw(context);

      var field2 = new kox(); // создаём объект 
      field2.setParams(canvas.width, canvas.height, 350, 10 + Math.sqrt(200 * 200 - 100 * 100), 200);
      field2.draw(context);
    }

  var canvas = document.getElementById(id);

  canvas.width = 5 * 100; // ширина
  canvas.height = 5 * 100; // высота

  var context = canvas.getContext("2d");


  setInterval(this.repetKox, 9000);
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

initKox('fill1');