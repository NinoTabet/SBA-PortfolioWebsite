const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

document.addEventListener("DOMContentLoaded", () => {
  const h1Element = document.querySelector("h1");
  const originalText = h1Element.dataset.value;

  h1Element.innerText = "Hello!";

  setTimeout(() => {
    clearInterval(interval);
    h1Element.innerText = originalText;
    h1Element.dispatchEvent(new Event("mouseover"));
  }, 2000);
});

function nameChange(element) {
  let iteration = 0;
  clearInterval(interval);

  interval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return element.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= element.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 40);
}

document.querySelector("h1").addEventListener("mouseover", event => {
  nameChange(event.target);
});

const track = document.getElementById("image-carousel");
const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}
const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth *4.5;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -93.5);
  
  track.dataset.percentage = nextPercentage;
 
  track.animate({
    transform: `translate(${nextPercentage}%, -20%)`
  }, { duration: 2000, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.style.objecPosition = '100% 50%';
  }
}

window.onmousedown = e => handleOnDown(e);
window.onmouseup = e => handleOnUp(e);
window.onmousemove = e => handleOnMove(e);