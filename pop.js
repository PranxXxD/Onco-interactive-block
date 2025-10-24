const state = {
    costValue: 0,
    cycleValue: 0,
    BoxOne: 0,
    BoxTwo: 0,
    BoxThree: 0,
    BoxOneValue: 0,
    BoxTwoValue: 0,
    BoxThreeValue: 0,
    TotalDrugCost : 0
  };


  // Modal Code
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');



// Open modal

function animateBarInModal(BoxOne, BoxTwo, BoxThree) {

  console.log("Modal values", BoxOne, BoxTwo, BoxThree)
  // console.log("popup.js",indemnityPercent, medianPercent, outOfPocketPercent, catastrophicPercent, outofPocketPercent)

  const indemnityBarModal = document.getElementById("Modal-bar-indemnity");
  const medianBarModal = document.getElementById("Modal-bar-median");
  const outOfPocketBarModal = document.getElementById("Modal-bar-outofpocket");

  [indemnityBarModal, medianBarModal, outOfPocketBarModal].forEach(bar => {
    bar.style.width = "0%";
    bar.style.animation = "none";
    bar.offsetWidth; // Trigger reflow
    bar.style.animation = "fillBarWidth 1.2s ease-out forwards";
  });


  indemnityBarModal.style.width = `${BoxOne || 0}%`;
  medianBarModal.style.width = `${BoxTwo || 0}%`;
  outOfPocketBarModal.style.width = `${BoxThree || 0}%`;
}

openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  closeModalBtn.focus();

  // ✅ Use stored values

  const { costValue, cycleValue, BoxOne, BoxTwo, BoxThree, BoxOneValue, BoxTwoValue, BoxThreeValue, TotalDrugCost} = state

  const valueArray = {
    boxOnevalue: ["본인 부담 비율",BoxOneValue, BoxOne,"#fafafa","#007e41"],
    boxTwoValue: ["재난적의료비 지원",BoxTwoValue, BoxTwo,"#bddba5","#007e41"],
    boxThreeValue: ["본인 부담 비율",BoxThreeValue, BoxThree,"#eb6100","white"]
  }
  console.log(BoxOneValue, BoxTwoValue, BoxThreeValue)
  const addValues = document.getElementById("cycle-values")
  addValues.innerHTML = `<span>1 cycle 약제비 : ${costValue}원 / 1년 치료 ${cycleValue} cycle 기준</span>`
  animateBarInModal(BoxOne, BoxTwo, BoxThree);

  const addDrugValue = document.getElementById("total-drug-cost")
  addDrugValue.innerHTML = `<span class="spanvalue">
         전체 약제비<br>${formatCurrency(TotalDrugCost)} 원 (100%)
       </span>
     `;
  const tooltipContainer = document.querySelector(".tooltip-container")
  tooltipContainer.innerHTML = ""
  Object.keys(valueArray).forEach(key => {
    const [text,amount, percent,color, fontColor] = valueArray[key]

    const tooltipBox = document.createElement("div");
    tooltipBox.className = "tooltip-box";
    tooltipBox.style.backgroundColor =  color 
    tooltipBox.style.color = fontColor
    tooltipBox.innerHTML = `
   <span class="tooltip-title">${text}</span>
   <span class="tooltip-value">${amount.toLocaleString()}원 (${percent}%)</span>
 `;

    tooltipContainer.appendChild(tooltipBox);

  })



  // BoxValues.innerHTML = `<div><span>${BoxOneValue}</span> <span>${BoxTwoValue}</span>  <span>${BoxThreeValue}</span> </div>`





});

// Close modal
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  openModalBtn.focus(); // Return focus

});

// Close on outside click
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
    openModalBtn.focus();
  }
});

// Close on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    openModalBtn.focus();
  }
});
