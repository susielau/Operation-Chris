/*
This function keeps drawing (draw) according to the timing fucntion
until end of the duration.
@parameter:
  timing(timeFraction): a timing function, e.g. linear would return timeFraction directly
  draw(progress): change the property of the target based on progress, e.g. target.style.width = progress * 100 + "%" will lengthen the target
  duration: a number, total time of animation, in ms. e.g. 1000 means 1s total time
*/
function animate({timing, draw, duration}) {
  let start = performance.now();

  // the time parameter is the current time
  requestAnimationFrame(function animate(time){
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    // progress is the current state in animation (where on the graph am I)
    let progress = timing(timeFraction)

    draw(progress);

    if (timeFraction < 1){
      requestAnimationFrame(animate);
    }


  })
}
