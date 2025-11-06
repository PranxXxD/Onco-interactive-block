
// const drugCostInput = document.querySelector(".drugCost");
const drugCostInput = document.getElementById("drugCost");
const cycleInput = document.querySelector(".cycle");
const defaultValue = document.querySelector('.def-sum')
const addedArea = document.querySelector('.added-check')
const insurSelector = document.querySelectorAll('.insur-checker')
const insurSelectorStatus = document.querySelectorAll(".status");
const topBalloon = document.querySelector('.top-ballon')
const centerBalloon = document.querySelector('.center-ballon');
const bottomBalloon = document.querySelector('.bottom-ballon')
const selectedInsurances = document.querySelectorAll(".insurances")
const barAreaBg1 = document.querySelector(".bar-area");
const barFill = document.querySelector(".bar-fill");
const incomeSelect = document.querySelector(".income");
const totalCostDisplay = document.getElementById("totalCost");
const outOfPocketDisplay = document.getElementById("outOfPocket");
const resetBtn = document.getElementById("resetBtn");

// Optional: Add these if you want to show breakdowns
const breakdownDisplay = document.getElementById("breakdown");


addedArea.classList.add('disabled')

// 상단 인풋
let costValue = 0;
let cycleValue = 0;
let drugsum = 0;
// let medianIcome = 0;



function setState(newState) {
  Object.assign(state, newState);
  console.log("Updated state:", state);
}



// // Utility Functions
function parseCurrency(value) {
  if (!value) return 0;
  const numeric = value.replace(/[^0-9]/g, "");
  return numeric ? Number(numeric) : 0;
}


function formatCurrency(value) {
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return "₩0";
  return `₩${num.toLocaleString()}`;
}


// Calculation Functions
function calculateTotalDrugCost(cost, cycles) {

  return cost * cycles;
}

// UI Update Functions
function updateDrugCostSummary() {
  costValue = parseCurrency(drugCostInput.value);
  // console.log("costValue",costValue)
  cycleValue = parseInt(cycleInput.value, 10) || 0; 
  // console.log("costValue",costValue)
  drugsum = calculateTotalDrugCost(costValue, cycleValue);

  if (costValue && cycleValue) {
    defaultValue.innerHTML = `
       <p class='def-sum'>
         <strong>전체 약제비<br>${formatCurrency(drugsum)} 원 (100%)</strong>
       </p>
     `;
  }
}
// Attach the unified handler to both inputs
// drugCostInput.addEventListener("input", updateDrugCostSummary);
// cycleInput.addEventListener("input", updateDrugCostSummary);


// insurSelector.forEach(el => {
//   el.addEventListener("click", function (e) {
//     const drugCostFilled = drugCostInput.value.trim() !== "";
//     const cycleFilled = cycleInput.value.trim() !== "";

//     if (!drugCostFilled || !cycleFilled) {
//       e.preventDefault();
//       alert("약제비와 주기를 입력해주세요.");
//       return;
//     }
//     let selectedStatus = document.querySelector('input[name="insuranceStatus"]:checked')?.value;
//     let selectedIncome;
//     document.querySelectorAll('input[name="income-range"]').forEach((radio) => {
//       radio.addEventListener('change', () => {
//        selectedIncome = document.querySelector('input[name="income-range"]:checked')?.value;

//       });
//     });

//     console.log("selectedIncome", selectedIncome)

//     if (selectedStatus === "no") {
//       addedArea.classList.remove("disabled");
//       updateInsuranceSummary({
//         status: selectedStatus,
//         type: "N/A",
//         incomeLevel: selectedIncome,
//         totalCost: drugsum
//       });
//     }


//     if (selectedStatus === "yes") {
//       addedArea.classList.remove("disabled");

//       const selectedType = Array.from(
//         document.querySelectorAll('input[name="insuranceType"]:checked')
//       ).map(input => input.value);

//       updateInsuranceSummary({
//         status: selectedStatus,
//         type: selectedType,
//         incomeLevel: selectedIncome,
//         totalCost: drugsum
//       });
//     }

//   });
// });




// function updateBarArea(outOfPocket,indemnityValue, totalCost, medianSupport) {

//   console.log(outOfPocket,indemnityValue, totalCost, medianSupport)

//   let indemnityPercent = Math.round((indemnityValue / totalCost) * 100);
//   let medianPercent = Math.round((medianSupport / totalCost) * 100);
//   let outOfPocketPercent = Math.round((outOfPocket /totalCost) * 100);

//   // const barAreaValue = 100 - Math.round((outOfPocket / totalCost) * 100);
//   // const barAreaValue2 = 100 - Math.round((outOfPocket / medianIcome) * 100);
//   // console.log("Bar Area %:", barAreaValue2);

//   // Animate the bar fill
//   //  const fillColor = barAreaBg.classList.add(".bar-fill")
//   //  barAreaBg2.style.height = `${barArea}%`;

//   animateVerticalBar(indemnityPercent, medianPercent, outOfPocketPercent)
// }



function handleIncomeChange() {
  return document.querySelector('input[name="income-range"]:checked')?.value || null;
}

// insurSelector.forEach(el => {
//   el.addEventListener("click", function (e) {
//     const drugCostFilled = drugCostInput.value.trim() !== "";
//     const cycleFilled = cycleInput.value.trim() !== "";

//     if (!drugCostFilled || !cycleFilled) {
//       e.preventDefault();
//       alert("약제비와 주기를 입력해주세요.");
//       return;
//     }

//     const selectedStatus = document.querySelector('input[name="insuranceStatus"]:checked')?.value;
//     const selectedIncome = handleIncomeChange(); // ✅ Always gets the current value

//     console.log("selectedIncome", selectedIncome);

//     addedArea.classList.remove("disabled");

//     if (selectedStatus === "no") {
//       updateInsuranceSummary({
//         status: selectedStatus,
//         type: "N/A",
//         incomeLevel: selectedIncome,
//         totalCost: drugsum
//       });
//     }

//     if (selectedStatus === "yes") {
//       const selectedType = Array.from(
//         document.querySelectorAll('input[name="insuranceType"]:checked')
//       ).map(input => input.value);

//       updateInsuranceSummary({
//         status: selectedStatus,
//         type: selectedType,
//         incomeLevel: selectedIncome,
//         totalCost: drugsum
//       });
//     }
//   });
// });


function animateVerticalBar(BoxOne, BoxTwo, BoxThree) {
  console.log("BoxOne", BoxOne)
  console.log("BoxTwo", BoxTwo)
  console.log("BoxThree", BoxThree)
  // console.log(indemnityPercent, medianPercent, outOfPocketPercent, catastrophicPercent, outofPocketPercent)

  // Apply heights to each segment

  const indemnityBar = document.getElementById("bar-indemnity");
  const medianBar = document.getElementById("bar-median");
  const outOfPocketBar = document.getElementById("bar-outofpocket");


  [indemnityBar, medianBar, outOfPocketBar].forEach(bar => {
    bar.style.height = "0%";
    bar.style.animation = "none";
    bar.offsetHeight; // Trigger reflow
    bar.style.animation = "fillBar 1.2s ease-out forwards";
  });

  // Apply final heights
  indemnityBar.style.height = `${BoxOne || 0}%`;
  // console.log(indemnityBar.style.height = `${BoxOne || 0}%`)
  medianBar.style.height = `${BoxTwo || 0}%`;
  outOfPocketBar.style.height = `${BoxThree}%`;

}

function getIncomeSupportRate(level) {
  const rates = {
    "below50": 0.7,
    "50to100": 0.6,
    "100to200": 0.5,
    "above200": 0.0
  };
  return rates[level] || 0;
}



function calculateCancerOnly({ status, incomeLevel, totalCost }) {

  // console.log("totalCost", totalCost)
  let cancerCoverage = 30000000
  let CancerremaingValue = totalCost - 30000000;

  if (cancerCoverage > 30000000) {
    cancerCoverage = 30000000;
  }

  let cancerPercent = Math.round((cancerCoverage / totalCost) * 100);
  const medianSupportRate = getIncomeSupportRate(incomeLevel);

  // console.log("medianSupportRate", medianSupportRate)

  let medianSupportforcancer = totalCost > cancerCoverage ? CancerremaingValue * medianSupportRate : 0;

  if (medianSupportforcancer > 50000000) {
    medianSupportforcancer = 50000000
  }

  console.log("medianSupportforcancer", medianSupportforcancer)

  let medianPercentTwo = Math.round((medianSupportforcancer / totalCost) * 100);
  // console.log("medianPercentTwo",medianPercentTwo)

  const finalOutOfPocketTwo = totalCost > cancerCoverage ? totalCost - cancerCoverage - medianSupportforcancer : 0;

  console.log("finalOutOfPocketTwo", finalOutOfPocketTwo)
  let outOfPocketPercentTwo = Math.round((finalOutOfPocketTwo / totalCost) * 100);

  let totalPercentTwo = cancerPercent + medianPercentTwo + outOfPocketPercentTwo;

  // console.log(totalPercentTwo)

  if (totalPercentTwo > 100) {
    const scale = 100 / totalPercentTwo;
    cancerPercent = Math.round(cancerPercent * scale);
    medianPercentTwo = Math.round(medianPercentTwo * scale);
    outOfPocketPercentTwo = 100 - cancerPercent - medianPercentTwo;
  }



  middleIcome(status, incomeLevel, medianPercentTwo, null, null, medianSupportforcancer, null, null, null, drugsum);
  animateVerticalBar(cancerPercent, medianPercentTwo, outOfPocketPercentTwo);

  // setState({
  //   costValue: costValue,
  //   cycleValue: cycleValue,
  //   BoxOne: cancerPercent,
  //   BoxTwo: medianPercentTwo,
  //   BoxThree: outOfPocketPercentTwo,
  //   BoxOneValue: cancerCoverage,
  //   BoxTwoValue: medianSupportforcancer,
  //   BoxThreeValue: finalOutOfPocketTwo,
  //   TotalDrugCost : totalCost

  // });


  return {
    cancerCoverage,
    cancerPercent,
    medianPercentTwo,
    medianSupportforcancer,
    outOfPocketPercentTwo,
    finalOutOfPocketTwo
  };
}




function calculateIndemnityOnly({ status, incomeLevel, totalCost }) {
  let indemnityCoverage = totalCost * 0.7
  let remainingAmount = totalCost - indemnityCoverage

  if (indemnityCoverage > 50000000) {
    indemnityCoverage = 50000000;
  }

  let indemnityPercent = Math.round((indemnityCoverage / totalCost) * 100);
  const medianSupportRate = getIncomeSupportRate(incomeLevel);
  let medianSupportforindemnity = totalCost > indemnityCoverage ? remainingAmount * medianSupportRate : 0;

  if (medianSupportforindemnity > 50000000) {
    medianSupportforindemnity = 50000000
  }

  let medianPercentOne = Math.round((medianSupportforindemnity / totalCost) * 100);

  const finalOutOfPocketOne = totalCost > indemnityCoverage ? totalCost - indemnityCoverage - medianSupportforindemnity : 0;
  let outOfPocketPercentOne = Math.round((finalOutOfPocketOne / totalCost) * 100);

  let totalPercentOne = indemnityPercent + medianPercentOne + outOfPocketPercentOne;

  if (totalPercentOne > 100) {
    const scale = 100 / totalPercentOne;
    indemnityPercent = Math.round(indemnityPercent * scale);
    medianPercentOne = Math.round(medianPercentOne * scale);
    outOfPocketPercentOne = 100 - indemnityPercent - medianPercentOne;
  }

  middleIcome(status, incomeLevel, medianPercentOne, null, medianSupportforindemnity, null, null, null, null, totalCost);
  animateVerticalBar(indemnityPercent, medianPercentOne, outOfPocketPercentOne);


  // setState({
  //   costValue: costValue,
  //   cycleValue: cycleValue,
  //   BoxOne: indemnityPercent,
  //   BoxTwo: medianPercentOne,
  //   BoxThree: outOfPocketPercentOne,
  //   BoxOneValue: indemnityCoverage,
  //   BoxTwoValue: medianSupportforindemnity,
  //   BoxThreeValue: finalOutOfPocketOne,
  //   TotalDrugCost : totalCost
  // });


  return {
    indemnityCoverage,
    indemnityPercent,
    medianPercentOne,
    medianSupportforindemnity,
    outOfPocketPercentOne,
    finalOutOfPocketOne
  };
}



function calculateCancerANDindemnity({ status, incomeLevel, totalCost }) {
  let cancerCoverage = 30000000;
  // let CancerremaingValue = totalCost - 30000000;

  let indemnityCoverage = totalCost * 0.7;
  // let indemnityremaingValue = totalCost - indemnityCoverage;


  if (indemnityCoverage > 50000000) {
    indemnityCoverage = 50000000;
  }

  let cancerplusindemnity = cancerCoverage + indemnityCoverage;
  let cancerplusindemnityRemainingAmt = totalCost - cancerplusindemnity

  let cancerandindemnityPercent = Math.round((cancerplusindemnity / totalCost) * 100);

  const medianSupportRate = getIncomeSupportRate(incomeLevel);
  let medianSupportforcancerandindemnity = totalCost > cancerplusindemnity ? cancerplusindemnityRemainingAmt * medianSupportRate : 0;

  if (medianSupportforcancerandindemnity > 50000000) {
    medianSupportforcancerandindemnity = 50000000
  }


  // console.log("medianSupportforcancerandindemnity", medianSupportforcancerandindemnity)

  let medianPercentThree = Math.round((medianSupportforcancerandindemnity / totalCost) * 100);

  // let medianPercentThree = 0
  const finalOutOfPocketThree = cancerplusindemnity < totalCost ? cancerplusindemnityRemainingAmt - medianSupportforcancerandindemnity : 0;

  // const finalOutOfPocketThree = 0

  // console.log("finalOutOfPocketThree", finalOutOfPocketThree)

  let outOfPocketPercentThree = Math.round((finalOutOfPocketThree / totalCost) * 100);

  // let outOfPocketPercentThree = 0

  let totalPercentThree = cancerandindemnityPercent + medianPercentThree + outOfPocketPercentThree;

  if (totalPercentThree > 100) {
    const scale = 100 / totalPercentThree;
    cancerandindemnityPercent = Math.round(cancerandindemnityPercent * scale);
    medianPercentThree = Math.round(medianPercentThree * scale);
    outOfPocketPercentThree = 100 - medianPercentThree - cancerandindemnityPercent;
  }

  middleIcome(
    status,
    incomeLevel,
    null,
    null,
    null,
    null,
    medianSupportforcancerandindemnity,
    medianPercentThree,
    null,
    totalCost
  );
  animateVerticalBar(cancerandindemnityPercent, medianPercentThree, outOfPocketPercentThree);


  // setState({
  //   costValue: costValue,
  //   cycleValue: cycleValue,
  //   BoxOne: cancerandindemnityPercent,
  //   BoxTwo: medianPercentThree,
  //   BoxThree: outOfPocketPercentThree,
  //   BoxOneValue: cancerplusindemnity,
  //   BoxTwoValue: medianSupportforcancerandindemnity,
  //   BoxThreeValue: finalOutOfPocketThree,
  //   TotalDrugCost : totalCost
  // });


  return {
    cancerplusindemnity,
    cancerandindemnityPercent,
    medianPercentThree,
    medianSupportforcancerandindemnity,
    outOfPocketPercentThree,
    finalOutOfPocketThree
  };
}

function noInsurance({ status, incomeLevel, totalCost }) {
  const catastrophicmedicalExp = 50000000;

  // const remainingAmt = 50000000 - totalCost

  // console.log("remainingAmt", remainingAmt)

  // const safeCatastrophic = Math.min(catastrophicmedicalExp, totalCost);

  const noInsurancemedianSupportRate = getIncomeSupportRate(incomeLevel);

  let noInsurancemedianSupportValue = totalCost < catastrophicmedicalExp ? totalCost * noInsurancemedianSupportRate : catastrophicmedicalExp;

  if (noInsurancemedianSupportValue > 50000000) {
    noInsurancemedianSupportValue = 50000000
  }

  console.log("noInsurancemedianSupportValue", noInsurancemedianSupportValue)

  const outofpocketMoney = incomeLevel === "above200" ? totalCost : totalCost - noInsurancemedianSupportValue;

  const catastrophicPercent = Math.round((noInsurancemedianSupportValue / totalCost) * 100);
  const outofPocketPercent = Math.round((outofpocketMoney / totalCost) * 100);
  const finalcatastrophicPercent = 100 - outofPocketPercent;



  middleIcome(
    status,
    incomeLevel,
    null, // medianPercentOne
    null, // medianPercentTwo
    null, // medianSupportforindemnity
    null, // medianSupportforcancer
    null, // medianSupportforcancerandindemnity
    null, // medianPercentThree
    noInsurancemedianSupportValue,
    catastrophicPercent,
    // finalcatastrophicPercent,

  );

  animateVerticalBar(0, catastrophicPercent, outofPocketPercent);

  // setState({
  //   costValue: costValue,
  //   cycleValue: cycleValue,
  //   BoxOne: 0,
  //   BoxTwo: catastrophicPercent,
  //   BoxThree: outofPocketPercent,
  //   BoxOneValue: 0,
  //   BoxTwoValue: noInsurancemedianSupportValue,
  //   BoxThreeValue: outofpocketMoney,
  //   TotalDrugCost : totalCost
  // });

  return {
    catastrophicmedicalExp,
    outofpocketMoney,
    catastrophicPercent,
    outofPocketPercent,
    noInsurancemedianSupportValue,
    finalcatastrophicPercent
  }

}

function updateInsuranceSummary({ status, type, incomeLevel, totalCost }) {

  let indemnityResult, cancerValue, cancerandindemnity, noInsuranceCase;

  // cancerValue = calculateCancerOnly();
  // cancerandindemnity = calculateCancerANDindemnity();

  if (status === "yes" && type.includes("indemnity")) {

    indemnityResult = calculateIndemnityOnly({ status, incomeLevel, totalCost });
    topBalloon.innerHTML = `
      <p class="def-sum">
        사보험 지원<br>${indemnityResult.indemnityCoverage.toLocaleString()}원 (${indemnityResult.indemnityPercent}%)
      </p>
    `;
    bottomBalloon.innerHTML = `
      <p class="def-sum">
        본인 부담 비율<br>${indemnityResult.finalOutOfPocketOne.toLocaleString()}원 (${indemnityResult.outOfPocketPercentOne}%)
      </p>
    `;
  }

  if (status === "yes" && type.includes("cancer")) {
    cancerValue = calculateCancerOnly({ status, incomeLevel, totalCost });
    topBalloon.innerHTML = `
      <p class="def-sum">
        사보험 지원<br>${cancerValue.cancerCoverage.toLocaleString()}원 (${cancerValue.cancerPercent}%)
      </p>
    `;
    bottomBalloon.innerHTML = `
      <p class="def-sum">
        본인 부담 비율<br>${cancerValue.finalOutOfPocketTwo.toLocaleString()}원 (${cancerValue.outOfPocketPercentTwo}%)
      </p>
    `;
  }

  if (status === "yes" && type.includes("cancer") && type.includes("indemnity")) {
    cancerandindemnity = calculateCancerANDindemnity({ status, incomeLevel, totalCost });

    topBalloon.innerHTML = `
      <p class="def-sum">
        사보험 지원<br>${cancerandindemnity.cancerplusindemnity.toLocaleString()}원 (${cancerandindemnity.cancerandindemnityPercent}%)
      </p>
    `;
    bottomBalloon.innerHTML = `
      <p class="def-sum">
        본인 부담 비율<br>${cancerandindemnity.finalOutOfPocketThree.toLocaleString()}원 (${cancerandindemnity.outOfPocketPercentThree}%)
      </p>
    `;
  }

  if (status === "no") {

    noInsuranceCase = noInsurance({ status, incomeLevel, totalCost })
    addedArea.classList.add("disabled");
    topBalloon.innerHTML = `
      <p class="def-sum">
        사보험 지원<br>0원 (0%)
      </p>
    `;
    bottomBalloon.innerHTML = `
      <p class="def-sum">
        본인 부담 비율<br>${noInsuranceCase.outofpocketMoney.toLocaleString()}원 (${noInsuranceCase.outofPocketPercent}%)
      </p>
    `;
  }



  middleIcome(
    status,
    incomeLevel,
    indemnityResult?.medianPercentOne,
    cancerValue?.medianPercentTwo,
    indemnityResult?.medianSupportforindemnity,
    cancerValue?.medianSupportforcancer,
    cancerandindemnity?.medianSupportforcancerandindemnity,
    cancerandindemnity?.medianPercentThree,
    // noInsuranceCase?.finalcatastrophicPercent,
    // noInsuranceCase?.catastrophicPercent
    noInsuranceCase?.noInsurancemedianSupportValue,
    noInsuranceCase?.catastrophicPercent,
  );

  bottomBalloon.style.background = "#943F00";
}

function middleIcome(
  status,
  incomeLevel,
  medianPercentOne,
  medianPercentTwo,
  medianSupportforindemnity,
  medianSupportforcancer,
  medianSupportforcancerandindemnity,
  medianPercentThree,
  noInsurancemedianSupportValue,
  catastrophicPercent,
) {
  let supportAmount = 0;
  let supportPercent = 0;

  if (status === "yes") {
    if (incomeLevel) {
      // Prioritize cancer + indemnity > cancer > indemnity
      if (medianSupportforcancerandindemnity !== null && medianSupportforcancerandindemnity !== undefined) {
        supportAmount = medianSupportforcancerandindemnity;
        supportPercent = medianPercentThree;
      } else if (medianSupportforcancer !== null && medianSupportforcancer !== undefined) {
        supportAmount = medianSupportforcancer;
        supportPercent = medianPercentTwo;
      } else if (medianSupportforindemnity !== null && medianSupportforindemnity !== undefined) {
        supportAmount = medianSupportforindemnity;
        supportPercent = medianPercentOne;
      }

      centerBalloon.innerHTML = `
        <p class="def-sum">
          재난적의료비 지원<br>${supportAmount.toLocaleString()}원 (${supportPercent}%)
        </p>
      `;
    }
  }

  if (status === "no") {
    const amount = incomeLevel === "above200" ? 0 : noInsurancemedianSupportValue;
    const percent = incomeLevel === "above200" ? 0 : catastrophicPercent

    centerBalloon.innerHTML = `
      <p class="def-sum">
        재난적의료비 지원<br>${amount.toLocaleString()}원 (${percent}%)
      </p>
    `;
  }
}

// function bindEvents() {
//  drugCostInput.addEventListener("input", (e) => {
//   let value = e.target.value.replace(/[^0-9]/g, "");
//   if (value) {
//     e.target.value = `₩ ${Number(value).toLocaleString()}`; // Add commas and ₩
//   } else {
//     e.target.value = "";
//   }
//   updateDrugCostSummary(); // Update summary after formatting
// });

// drugCostInput.addEventListener("keydown", (e) => {
//   if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
//     e.preventDefault();
//   }
// });

//   cycleInput.addEventListener("input", updateDrugCostSummary);
//   resetBtn.addEventListener("click", RestButton);

//   insurSelector.forEach(el => {
//     el.addEventListener("click", () => {
//       // const cost = parseCurrency(drugCostInput.value);
//       // const cycles = parseInt(cycleInput.value, 10) || 0;
//       const total = calculateTotalDrugCost(costValue, cycleValue);
//       const incomeLevel = document.querySelector("input[name='income-range']:checked")?.value;
//       const status = document.querySelector("input[name='insuranceStatus']:checked")?.value;
//       console.log("status", status)
//       const types = Array.from(document.querySelectorAll("input[name='insuranceType']:checked")).map(i => i.value);

//       if (!costValue || !cycleValue) {
//         alert("약제비와 주기를 입력해주세요.");
//         return;
//       }

//       if (status === "yes") {
//         addedArea.classList.remove("disabled");
//         // console.log("disable removed")

//       }

//       if (status === "yes" && types?.includes("cancer")) {
//         // addedArea.classList.remove("disabled");

//         calculateCancerOnly({ status, type: types, incomeLevel, totalCost: total })
//         updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
//       }

//       if (status === "yes" && types?.includes("indemnity")) {
//         addedArea.classList.remove("disabled");

//         calculateIndemnityOnly({ status, type: types, incomeLevel, totalCost: total })
//         updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
//       }

//       if (status === "yes" && (types?.includes("cancer") && types?.includes("indemnity"))) {
//         addedArea.classList.remove("disabled");

//         calculateCancerANDindemnity({ status, type: types, incomeLevel, totalCost: total })
//         updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
//       }

//       if (status === "no") {
//         addedArea.classList.add("disabled");
//         noInsurance({ status, type: types, incomeLevel, totalCost: total })
//         updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
//       }


//     });
//   });
// }


// Table Modal code


function bindEvents() {
  drugCostInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      e.target.value = `₩ ${Number(value).toLocaleString()}`;
    } else {
      e.target.value = "";
    }
    updateDrugCostSummary();
  });
 
  drugCostInput.addEventListener("keydown", (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
      e.preventDefault();
    }
  });
 
  cycleInput.addEventListener("input", updateDrugCostSummary);
  resetBtn.addEventListener("click", RestButton);
 
  insurSelector.forEach(el => {
    el.addEventListener("click", () => {
      const costValue = parseCurrency(drugCostInput.value);
      const cycleValue = parseInt(cycleInput.value, 10) || 0;
 
      const statusInput = document.querySelector("input[name='insuranceStatus']:checked");
      const typeInputs = Array.from(document.querySelectorAll("input[name='insuranceType']:checked"));
 
      if (!costValue || !cycleValue) {
        alert("약제비와 주기를 입력해주세요.");
 
        if (statusInput) statusInput.checked = false;
        typeInputs.forEach(input => input.checked = false);
 
        return;
      }
 
      const total = calculateTotalDrugCost(costValue, cycleValue);
      const incomeLevel = document.querySelector("input[name='income-range']:checked")?.value;
      const status = statusInput?.value;
      const types = typeInputs.map(i => i.value);
 
      if (status === "yes") {
        addedArea.classList.remove("disabled");
      }
 
      if (status === "yes" && types.includes("cancer")) {
        calculateCancerOnly({ status, type: types, incomeLevel, totalCost: total });
        updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
      }
 
      if (status === "yes" && types.includes("indemnity")) {
        addedArea.classList.remove("disabled");
        calculateIndemnityOnly({ status, type: types, incomeLevel, totalCost: total });
        updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
      }
 
      if (status === "yes" && types.includes("cancer") && types.includes("indemnity")) {
        addedArea.classList.remove("disabled");
        calculateCancerANDindemnity({ status, type: types, incomeLevel, totalCost: total });
        updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
      }
 
      if (status === "no") {
        addedArea.classList.add("disabled");
        noInsurance({ status, type: types, incomeLevel, totalCost: total });
        updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
      }
    });
  });
}
 


function openModal() {
  document.getElementById("Modal").style.display = "block";
}

function closeModal() {
  document.getElementById("Modal").style.display = "none";
}

// Optional: Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("Modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}


function removeAnimation() {
  // Apply heights to each segment
  const indemnityBar = document.getElementById("bar-indemnity");
  const medianBar = document.getElementById("bar-median");
  const outOfPocketBar = document.getElementById("bar-outofpocket");


  [indemnityBar, medianBar, outOfPocketBar].forEach(bar => {
    bar.style.height = "0%";
    bar.style.animation = "none";

  });

}
function RestButton() {
  drugCostInput.value = '';
  cycleInput.value = '';
  topBalloon.innerHTML = "";
  centerBalloon.innerHTML = "";
  bottomBalloon.innerHTML = "";
  incomeSelect.value = "";
  bottomBalloon.style.background = "#68b64a";
  removeAnimation()

}


// Initialize
bindEvents();