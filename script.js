/*
    Coding Challenge Instructions:

    What we have now:
    - An overlay that blocks the screen but doesn’t behave correctly.
    - Broken animation logic (the ball doesn’t move as intended).
    - Timing handled incorrectly (uses setInterval / setTimeout or just doesn’t work).
    - Overall, the sequence is incomplete and buggy.

    What we want instead:

    1. Overlay Behavior
       - Start with the overlay fully covering the screen.
       - Fade the overlay away and hide the element so the animation can be seen.
       - When everything is finished, fade the overlay back in.

    2. Ball Animation
       - Display a single ball.
       - The ball animate smoothly to a random position within the container, instead of teleporting.
       - Move the ball to a different location 5 times.

    3. Sequence
       - Fade out overlay → animate the ball for 5 cycles → fade overlay back in.

    NOTE:
    - Use gsap or requestAnimationFrame() or another appropriate method to 
      control the animation instead of relying on timeouts and intervals.
    - Keep the ball within the container.
    - The provided implementation is intentionally broken.
    - Your task is to transform the broken version into the working version described above.
*/

const container = document.getElementById("container");
const cover = document.getElementById("overlay");

const width = container.clientWidth;
const height = container.clientHeight;

const maxRepeats = 5;
const moveDuration = 1000; //time in milliseconds to move
const fadeDuration = 2000; // time in milliseconds for overlay to fade out


let c = document.createElement("div");
c.className = "circle";
container.appendChild(c);

c.style.left = Math.random() * width + "px";
c.style.top = Math.random() * height + "px";

let r = 0; // repeats
let fromX = parseFloat(c.style.left); //previous locations
let fromY = parseFloat(c.style.top);
let toX = fromX; //current locations
let toY = fromY;
let phaseStart = null; //first frame of the animation
let phase = "fadeOut"; //Animation states fadeOut move fadeIn Done

function moveTowards() {
   toX = Math.random() * width;
   toY = Math.random() * height;
}

//the animation sequence
function sequence(now){
   if(phaseStart === null) phaseStart = now;
   const timeElapsed = now - phaseStart;
   
   //fading out
   if(phase === "fadeOut"){
      const t = Math.min(timeElapsed / fadeDuration,1);
      cover.style.opacity = String(1-t);

      if(t >= 1){
         cover.style.visibility = "hidden";
         phase = "move";
         phaseStart = null;
         moveTowards();
      }
   }

   //ball moving
   else if (phase === "move"){
      const t = Math.min(timeElapsed/moveDuration, 1);
      c.style.left = (fromX + (toX - fromX) * t) + "px";
      c.style.top = (fromY + (toY - fromY) * t ) + "px";

      if (t>=1)
      {
         r +=1;
         if (r >= maxRepeats){
            cover.style.visibility = "visible";
            phase = "fadeIn";
            phaseStart = null;
         }else{
            fromX =toX;
            fromY = toY;
            moveTowards();
            phaseStart=null;
         }
      }
   }
      //fadeback in
      else if (phase === "fadeIn")
      {
         const t = Math.min(timeElapsed / fadeDuration, 1);
         cover.style.opacity = String(t);
         if (t >= 1){
            phase = "done";
            return; //end sequence
         }
      } else{
         return;
      }
      requestAnimationFrame(sequence);
   }
   

requestAnimationFrame(sequence);

