window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 30);
          };
})();
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    objects = [];

const MIN_INIT_V_X = 3,
      MAX_INIT_V_X = 11,
      MIN_INIT_V_Y = 0,
      MAX_INIT_V_Y = 5,
      MIN_TIME_INTERVAL = 1, // second
      MAX_TIME_INTERVAL = 5, // between two objects falling
      bounce_factor = 0.8,
      gravity = 0.7;

var obstacle = document.getElementById('obstacle').getBoundingClientRect();

window.onload = lets_fall

var icons = [
  burger = {src: 'images/burger.png'},
  hotdog = {src: 'images/hotdog.png'},
  fries = {src: 'images/fries.png'}
]

function lets_fall() {
  animate();
  setInterval(
    function() {
      let image = new Image();
      // randomly select an icon from the list and let it fall
      icon = icons[Math.floor(Math.random() * icons.length)];
      image.src = icon.src;
      image.onload = () => {
        let falling_object = new Projectile(image);
        objects.push(falling_object)
      }
    },
    // random time interval
    (Math.random() * (MAX_TIME_INTERVAL - MIN_TIME_INTERVAL) + MIN_TIME_INTERVAL) * 500
  )

}

function animate() {
    fall();
    requestAnimFrame(animate);
}

function fall() {
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, width, height);
  let remove_list = [];
  for (i = 0; i < objects.length; i++) {
    obj = objects[i];
    if (obj.x > 0 - obj.width && obj.x < width && obj.y < height){
      // bounce when fall on top of the obstacle
      if (obstacle.left <= obj.x
          && obj.vy > 0
          && obj.x <= (obstacle.right - obj.width)
          && obj.y >= (obstacle.top - obj.height * 2 / 3)
          && obj.y <= (obstacle.top + obj.height)
        ){
            obj.vy *= -bounce_factor;
      // bounce when contact the either side of wall
    } else if (obj.vx < 0
          && obj.x <= 0
          || obj.vx > 0
          && obj.x >= width - obj.width) {
            obj.vx *= -bounce_factor * 1.2;
      // bounce when contact either side of obstacle
    } else if (obj.y >= obstacle.top
          && obj.y + obj.height / 2 <= obstacle.bottom) {
            if (obj.vx > 0
              && (obj.x + obj.width / 2) >= obstacle.left
              && obj.x <= obstacle.left + obj.width
              || obj.vx < 0
              && obj.x + obj.width / 2 <= obstacle.right
              && obj.x + obj.width >= obstacle.right
            ) {
                obj.vx *= -bounce_factor * 1.2;
              }
        }
      obj.x += obj.vx;
      obj.y += obj.vy;
      obj.vy += gravity;
      obj.draw(ctx);
    } else {
      remove_list.push(i);
    }
    for(j = 0; j < remove_list; j--){
      // remove the out of frame object from our list
      objects.splice(remove_list[0], 1);
    }
  }
}

function Projectile(img) {
  this.img = img;
  this.height = 70;
  this.width = (70 * img.width) / img.height;
  this.x = width / 2 - this.width / 2;
  this.y = 0 - this.height;
  this.vx = (Math.random() * (MAX_INIT_V_X - MIN_INIT_V_X) + MIN_INIT_V_X) * Math.pow(-1, Math.floor(Math.random() * 2));
  this.vy = Math.random() * (MAX_INIT_V_Y - MIN_INIT_V_Y) + MIN_INIT_V_Y;
  this.draw = (ctx) => {
    if (this.vx < 0){
      this.img = rotateAndCache(this.img, 0.02 * this.vx)
    } else {
      this.img = rotateAndCache(this.img, 0.02 * this.vx)
    }

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}
// return a new canvas containing the rotated image
// source: Google IO Talk
rotateAndCache = function(image,angle) {
  var offscreenCanvas = document.createElement('canvas');
  var offscreenCtx = offscreenCanvas.getContext('2d');

  var size = Math.max(image.width, image.height);
  offscreenCanvas.width = size;
  offscreenCanvas.height = size;
  console.log(size)
  offscreenCtx.translate(size/2, size/2);
  offscreenCtx.rotate(angle);
  offscreenCtx.drawImage(image, -(image.width/2), -(image.height/2));

  return offscreenCanvas;
}
