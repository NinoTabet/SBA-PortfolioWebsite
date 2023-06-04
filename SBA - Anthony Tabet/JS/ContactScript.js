const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

document.querySelector("h1").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 40);
}
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = emailInput.value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }

  if (/\s+/.test(name) || /\s+/.test(subject) || /\s+/.test(message)) {
    alert('Please be sure to fill all fields');
    return;
  }


  const formData = {
    name: name,
    email: email,
    subject: subject,
    message: message
  };

  console.log(formData);

  form.reset();
});