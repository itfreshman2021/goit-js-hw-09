import Notiflix from 'notiflix';

const refsForm = document.querySelector(".form");
let position = 0;
let deLay = 0;
let step = 0;
let amount = 0;


refsForm.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  deLay = parseInt(refsForm.elements.delay.value, 10);
  step = parseInt(refsForm.elements.step.value, 10);
  amount = parseInt(refsForm.elements.amount.value, 10);
  

  for (let i = 1; i <= amount; i += 1) {
    position = i;
    createPromise(position, deLay).then(({ position, deLay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${deLay}ms`);
      
  })
  .catch(({ position, deLay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${deLay}ms`);
    
  });
    deLay += step;
    
  }
}

function createPromise(position, deLay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({ position, deLay });  // Fulfill
  } else {
    reject({ position, deLay }); // Reject
  }
      }, deLay);
    });
}



  