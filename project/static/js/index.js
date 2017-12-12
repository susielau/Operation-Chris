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
    width = window.innerWidth,
    height = window.innerHeight,
    objects = [],
    interval = 300,
    start = performance.now(),
    id = 0,
    obstacle = document.getElementById('obstacle').getBoundingClientRect();

const MIN_INIT_V_X = 2,
      MAX_INIT_V_X = 10,
      MIN_INIT_V_Y = 0,
      MAX_INIT_V_Y = 5,
      MIN_TIME_INTERVAL = 1, // second
      MAX_TIME_INTERVAL = 5, // between two objects falling
      bounce_factor = 0.8,
      gravity = 0.7;

window.onload = lets_fall
window.onresize = function(){
  width = window.innerWidth;
  height = window.innerHeight;
  obstacle = document.getElementById('obstacle').getBoundingClientRect();
}

var icons = [
  burger = {src: "static/images/burger.png" },
  hotdog = {src: 'static/images/hotdog.png'},
  fries = {src: 'static/images/fries.png'},
  apple = {src: 'static/images/apple.png'},
  egg = {src: 'static/images/egg.png'},
  chicken = {src: 'static/images/chicken.png'},
  ice_cream = {src: 'static/images/ice_cream.png'},
  pizza = {src: 'static/images/pizza.png'},
  toast = {src: 'static/images/toast.png'},
  salad = {src: 'static/images/salad.png'},
  sandwich = {src: 'static/images/sandwich.png'},
  donut = {src: 'static/images/donut.png'},
  taco = {src: 'static/images/taco.png'}
]

function lets_fall() {
  animate();
  setInterval(
    function() {
      // random time interval
      interval = (Math.random() * (MAX_TIME_INTERVAL - MIN_TIME_INTERVAL) + MIN_TIME_INTERVAL) * 500
    }, 500)
}

function add_new_projectile(time) {
  if ((time - start) >= interval){
    let image = new Image();
    // randomly select an icon from the list and let it fall
    let icon = icons[Math.floor(Math.random() * icons.length)];
    image.src = icon.src; // @to delete
    image.onload = () => {
      // creating the icon and initializing CSS
      let img = document.createElement("img");
      img.src = icon.src; // @may not work
      let w = (70 * image.width) / image.height;
      img.style.width = w + "px";
      img.style.height = "70px";
      img.style.position = "absolute";
      img.style.left = (width - w) / 2 + "px";
      img.style.top = "-70px";
      img.style.transform = "rotate(0deg)";
      img.id = id;
      id++;
      // making a js object based on this image
      let falling_object = new Projectile(img);
      // put this object onto the  "falling list"
      objects.push(falling_object);
      // put the image onto html
      canvas.appendChild(img);
    }
    start = performance.now();
  }
}


function animate() {
    fall();
    requestAnimFrame(function (time) {
      add_new_projectile(time)
    })
    requestAnimFrame(animate);
}


function Projectile(img) {
  this.node = img;
  this.height = 70;
  this.width = parseInt(img.style.width);
  this.x = width / 2 - this.width / 2;
  this.y = -70;
  this.angle = 0;
  this.vx = (Math.random() * (MAX_INIT_V_X - MIN_INIT_V_X) + MIN_INIT_V_X) * Math.pow(-1, Math.floor(Math.random() * 2));
  this.vy = Math.random() * (MAX_INIT_V_Y - MIN_INIT_V_Y) + MIN_INIT_V_Y;
  this.draw = () => {
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";
    this.node.style.transform = `rotate(${this.angle}deg)`;
  }
}

function fall() {
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
      obj.angle += obj.vx
      obj.draw();
    } else {
      remove_list.push(obj);
    }
    for(j = 0; j < remove_list.length; j++){
      try {
        // remove the out of frame object from our list
        canvas.removeChild(remove_list[j].node);
        objects.splice(objects.indexOf(obj), 1);
      } catch(err) {}
    }

  }
}
