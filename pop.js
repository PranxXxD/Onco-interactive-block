const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
// Open modal

function animateBarInModal(BoxOne,BoxTwo,BoxThree) {

    console.log("popup.js",BoxOne,BoxTwo,BoxThree )
    // console.log("popup.js",indemnityPercent, medianPercent, outOfPocketPercent, catastrophicPercent, outofPocketPercent)

    const indemnityBarModal = document.getElementById("Modal-bar-indemnity");
    const medianBarModal = document.getElementById("Modal-bar-median");
    const outOfPocketBarModal = document.getElementById("Modal-bar-outofpocket");




    [indemnityBar, medianBar, outOfPocketBar].forEach(bar => {
        bar.style.width = "0%";
        bar.style.animation = "none";
        bar.offsetWidth; // Trigger reflow
        bar.style.animation = "fillBarWidth 1.2s ease-out forwards";
    });


    indemnityBar.style.width = `${BoxOne || 0}%`;
    medianBar.style.width = `${BoxTwo || 0}%`;
    outOfPocketBar.style.width = `${BoxThree || 0}%`;
}

openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    closeModalBtn.focus();



    // Check if values are available
    if (window.barAnimationValues) {
        const {
            noInsurancemedianSupportValue,
            catastrophicPercent,
            outofpocketMoney,
            outofPocketPercent,
            indemnityPercent,
            medianPercentOne,
            outOfPocketPercentOne,
            costValue,
            cycleValue,
        } = window.barAnimationValues;

        const addValues = document.getElementById("cycle-values")
        addValues.innerHTML = `<span>1 cycle 약제비 : ${costValue}원 / 1년 치료 ${cycleValue} cycle 기준</span>`
        // Call animation function with stored values
        animateBarInModal( 
            indemnityPercent,
            medianPercentOne,
            outOfPocketPercentOne,
            outofpocketMoney,
            noInsurancemedianSupportValue,
            catastrophicPercent,
            outofPocketPercent
        );
    }
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