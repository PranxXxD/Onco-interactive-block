
const drugCostInput = document.querySelector(".drugCost");
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

// Utility Functions
function parseCurrency(value) {
  return Number(value.replace(/[^0-9]/g, ""));
}

function formatCurrency(value) {
  return value.toLocaleString();
}

// Calculation Functions
function calculateTotalDrugCost(cost, cycles) {
  return cost * cycles;
}

// UI Update Functions
function updateDrugCostSummary() {
  costValue = parseCurrency(drugCostInput.value);
  cycleValue = parseInt(cycleInput.value, 10) || 0;
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
drugCostInput.addEventListener("input", updateDrugCostSummary);
cycleInput.addEventListener("input", updateDrugCostSummary);


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
    "below50": 0.8,
    "50to100": 0.7,
    "100to200": 0.6,
    "above200": 0.5
  };
  return rates[level] || 0;
}



function calculateCancerOnly({ status, incomeLevel, totalCost }) {

  console.log("totalCost", totalCost)
  let cancerCoverage = 30000000
  let CancerremaingValue = totalCost - 30000000;

  if (cancerCoverage > 30000000) {
    cancerCoverage = 30000000;
  }

  let cancerPercent = Math.round((cancerCoverage / totalCost) * 100);
  const medianSupportRate = getIncomeSupportRate(incomeLevel);

  console.log("medianSupportRate", medianSupportRate)

  const medianSupportforcancer =  CancerremaingValue * medianSupportRate;
  console.log("medianSupportforcancer", medianSupportforcancer)

  let medianPercentTwo = Math.round((medianSupportforcancer / totalCost) * 100);
  // console.log("medianPercentTwo",medianPercentTwo)

  const finalOutOfPocketTwo = totalCost - cancerCoverage - medianSupportforcancer;

  console.log("finalOutOfPocketTwo", finalOutOfPocketTwo)
  let outOfPocketPercentTwo = Math.round((finalOutOfPocketTwo / totalCost) * 100);

  let totalPercentTwo = cancerPercent + medianPercentTwo + outOfPocketPercentTwo;

  console.log(totalPercentTwo)

  if (totalPercentTwo > 100) {
    const scale = 100 / totalPercentTwo;
    cancerPercent = Math.round(cancerPercent * scale);
    medianPercentTwo = Math.round(medianPercentTwo * scale);
    outOfPocketPercentTwo = 100 - cancerPercent - medianPercentTwo;
  }



  middleIcome(status, incomeLevel, medianPercentTwo, null, null, medianSupportforcancer, null, null, null, drugsum);
  animateVerticalBar(cancerPercent, medianPercentTwo, outOfPocketPercentTwo);

  window.barAnimationValues = {
    cancerPercent,
    medianPercentTwo,
    outOfPocketPercentTwo
  };

  console.log("cancer values",
    "cancerCoverage", cancerCoverage, "\n",
    "cancerPercent:", cancerPercent, "\n",
    "medianPercentTwo", medianPercentTwo, "\n",
    "medianSupportforcancer", medianSupportforcancer, "\n",
    "outOfPocketPercentTwo", outOfPocketPercentTwo, "\n",
    "finalOutOfPocketTwo", finalOutOfPocketTwo, "\n",)

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
  const medianSupportforindemnity = remainingAmount * medianSupportRate;
  let medianPercentOne = Math.round((medianSupportforindemnity / totalCost) * 100);

  const finalOutOfPocketOne = totalCost - indemnityCoverage - medianSupportforindemnity;
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

  window.barAnimationValues = {
    indemnityPercent,
    medianPercentOne,
    outOfPocketPercentOne
  };

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

  let cancerplusindemnityRemainingAmt = 0

  if (indemnityCoverage > 50000000) {
    indemnityCoverage = 50000000;
  }

  let cancerplusindemnity = cancerCoverage + indemnityCoverage;
  let cancerandindemnityPercent = Math.round((cancerplusindemnity / totalCost) * 100);

  const medianSupportRate = getIncomeSupportRate(incomeLevel);
  const medianSupportforcancerandindemnity = cancerplusindemnityRemainingAmt * medianSupportRate;


  console.log("medianSupportforcancerandindemnity",medianSupportforcancerandindemnity)

  // let medianPercentThree = Math.round((medianSupportforcancerandindemnity / totalCost) * 100);

  let medianPercentThree = 0
  // const finalOutOfPocketThree = totalCost - cancerplusindemnity - medianSupportforcancerandindemnity;

  const finalOutOfPocketThree = 0

  console.log("finalOutOfPocketThree", finalOutOfPocketThree)

  // let outOfPocketPercentThree = Math.round((finalOutOfPocketThree / totalCost) * 100);
  
  let outOfPocketPercentThree = 0

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

  window.barAnimationValues = {
    cancerplusindemnity,
    medianPercentThree,
    cancerandindemnityPercent
  };

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

  const remainingAmt =  50000000 - totalCost 

  console.log("remainingAmt", remainingAmt)
  
  // const safeCatastrophic = Math.min(catastrophicmedicalExp, totalCost);

  const noInsurancemedianSupportRate = getIncomeSupportRate(incomeLevel);

  const noInsurancemedianSupportValue =  catastrophicmedicalExp * noInsurancemedianSupportRate;

  const outofpocketMoney = incomeLevel === "above200" ? totalCost :  totalCost - noInsurancemedianSupportValue;

  console.log("noInsurancemedianSupportValue",noInsurancemedianSupportValue)




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

  animateVerticalBar(catastrophicPercent, outofPocketPercent);

  window.barAnimationValues = {
    catastrophicmedicalExp,
    finalcatastrophicPercent
  };

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



  window.barAnimationValues = {
    costValue,
    cycleValue
  };

  bottomBalloon.style.background = "#eb6100";
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

function bindEvents() {
  drugCostInput.addEventListener("input", updateDrugCostSummary);
  cycleInput.addEventListener("input", updateDrugCostSummary);
  resetBtn.addEventListener("click", RestButton);

  insurSelector.forEach(el => {
    el.addEventListener("click", () => {
      const cost = parseCurrency(drugCostInput.value);
      const cycles = parseInt(cycleInput.value, 10) || 0;
      const total = calculateTotalDrugCost(cost, cycles);
      const incomeLevel = document.querySelector("input[name='income-range']:checked")?.value;
      const status = document.querySelector("input[name='insuranceStatus']:checked")?.value;
      console.log("status", status)
      const types = Array.from(document.querySelectorAll("input[name='insuranceType']:checked")).map(i => i.value);

      if (!cost || !cycles) {
        alert("약제비와 주기를 입력해주세요.");
        return;
      }

      if (status === "yes") {
        addedArea.classList.remove("disabled");
        console.log("disable removed")

      }

      if (status === "yes" && types?.includes("cancer")) {
        // addedArea.classList.remove("disabled");

        calculateCancerOnly({ status, type: types, incomeLevel, totalCost: total })
        updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
      }

      if (status === "yes" && types?.includes("indemnity")) {
        addedArea.classList.remove("disabled");

        calculateIndemnityOnly({ status, type: types, incomeLevel, totalCost: total })
        updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
      }

      if (status === "yes" && (types?.includes("cancer") && types?.includes("indemnity")) ) {
        addedArea.classList.remove("disabled");

        calculateCancerANDindemnity({ status, type: types, incomeLevel, totalCost: total })
        updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
      }

      if (status === "no") {
        addedArea.classList.add("disabled");
        noInsurance({ status, type: types, incomeLevel, totalCost: total })
        updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
      }

     
    });
  });
}

// function middleIcome(status, incomelevel, medianPercentOne, medianPercentTwo, medianSupportforindemnity, medianSupportforcancer, medianSupportforcancerandindemnity, medianPercentThree, finalcatastrophicPercent, catastrophicmedicalExp) {

//   if (status === "yes") {
//     if (incomelevel === "below50") {
//       // Update center balloon (median income support)
//       centerBalloon.innerHTML = `
//    <p class="def-sum">
//      재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString() || medianSupportforcancerandindemnity.toLocaleString()}원 (${medianPercentOne || medianPercentTwo || medianPercentThree}%)
//    </p> 
//  `;
//     } if (incomelevel === "50to100") {
//       // Update center balloon (median income support)
//       centerBalloon.innerHTML = `
//    <p class="def-sum">
//      재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString() || medianSupportforcancerandindemnity.toLocaleString()}원 (${medianPercentOne || medianPercentTwo}%)
//    </p> 
//  `;
//     } if (incomelevel === "100to200") {
//       // Update center balloon (median income support)
//       centerBalloon.innerHTML = `
//    <p class="def-sum">
//      재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString() || medianSupportforcancerandindemnity.toLocaleString()}원 (${medianPercentOne || medianPercentTwo || medianPercentThree}%)
//    </p> 
//  `;
//     } if (incomelevel === "above200") {
//       // Update center balloon (median income support)
//       centerBalloon.innerHTML = `
//    <p class="def-sum">
//      재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString() || medianSupportforcancerandindemnity.toLocaleString()}원 (${medianPercentOne || medianPercentTwo || medianPercentThree}%)
//    </p> 
//  `;
//     }

//   }


//   if (status === "no") {

//     console.log("status no")

//     if (incomelevel === "below50") {
//       // Update center balloon (median income support)
//       centerBalloon.innerHTML = `
//      <p class="def-sum">
//        재난적의료비 지원<br>${catastrophicmedicalExp}원 (${finalcatastrophicPercent}%)
//      </p> 
//    `;
//     } if (incomelevel === "50to100") {
//       // Update center balloon (median income support)
//       centerBalloon.innerHTML = `
//      <p class="def-sum">
//        재난적의료비 지원<br>${catastrophicmedicalExp}원 (${finalcatastrophicPercent}%)
//      </p> 
//    `;
//     } if (incomelevel === "100to200") {
//       // Update center balloon (median income support)
//       centerBalloon.innerHTML = `
//      <p class="def-sum">
//        재난적의료비 지원<br>${catastrophicmedicalExp}원 (${finalcatastrophicPercent}%)
//      </p> 
//    `;
//     } if (incomelevel === "above200") {
//       // Update center balloon (median income support)
//       centerBalloon.innerHTML = `
//      <p class="def-sum">
//        재난적의료비 지원<br>${0}원 (${0}%)
//      </p> 
//    `;
//     }

//   }
// }
// function calculateMedianIcom (outOfPocketMoney){
//   console.log("outOfPocket", outOfPocketMoney)
//   console.log("incomeSelect", incomeSelect)
//   let supportRate = 0;
//   if (incomeSelect.value === "≤50%") supportRate = 0.8;
//   else if (incomeSelect.value === "5>50% - ≤100%") supportRate = 0.7;
//   else if (incomeSelect.value === ">100% - ≤200%") supportRate = 0.6;
//   else if (incomeSelect.value === "200%") supportRate = 0.5;

//    let incomeSupport = outOfPocketMoney * supportRate;

//     console.log("incomeSupport", incomeSupport)
//     return incomeSupport


// }



// function calculate() {
//   const drugCost = parseFloat(drugCostInput.value);
//   const cycle = parseInt(cycleInput.value);
//   const selectedInsurancesStatus = Array.from(insuranceStatus)
//   .filter(i => i.checked)
//   .map(i => i.value);
//   console.log("selectedInsurances", selectedInsurancesStatus)
//   const selectedInsurances = Array.from(insuranceInputs)
//     .filter(i => i.checked)
//     .map(i => i.value);
//     console.log("selectedInsurances", selectedInsurances)


//   const incomeLevel = incomeSelect.value;

//   if (isNaN(drugCost) || isNaN(cycle)) {
//     totalCostDisplay.textContent = "Total Drug Cost: -";
//     outOfPocketDisplay.textContent = "Out-of-pocket Cost: -";
//     if (breakdownDisplay) breakdownDisplay.innerHTML = "";
//     return;
//   }

//   const totalDrugCost = drugCost * cycle;
//   totalCostDisplay.textContent = `Total Drug Cost: ₩${totalDrugCost.toLocaleString()}`;

//   let indemnitySupport = 0;
//   let cancerSupport = 0;
//   let incomeSupport = 0;
//   let outOfPocket = totalDrugCost;

//   // const hasIndemnity = selectedInsurances.includes("indemnity");
//   // const hasCancer = selectedInsurances.includes("cancer");

//   // Indemnity insurance: 70% of (total - 200,000 * cycle)
//   if (selectedInsurances.includes("indemnity")) {
//     indemnitySupport = (totalDrugCost - (200000 * cycle)) * 0.7;
//     // indemnitySupport = totalDrugCost - (totalDrugCost* 0.7);
//     console.log("indemnitySupport",indemnitySupport)
//     outOfPocket -= indemnitySupport;
//     outOfPocket -= (200000 * cycle);
//   }

//   // Cancer insurance: fixed 30,000,000 KRW
//   if (selectedInsurances.includes("cancer")) {
//     cancerSupport = 30000000;
//     outOfPocket -= cancerSupport;
//   }

//   // Median income support
//   let supportRate = 0;
//   if (incomeLevel === "below50") supportRate = 0.8;
//   else if (incomeLevel === "50to100") supportRate = 0.7;
//   else if (incomeLevel === "100to200") supportRate = 0.6;
//   else if (incomeLevel === "above200") supportRate = 0.5;

//   incomeSupport = outOfPocket * supportRate;
//   outOfPocket -= incomeSupport;

//   // Apply catastrophic medical expense support limit
//   const catastrophicLimit = 50000000;
//   if (outOfPocket > catastrophicLimit) {
//     outOfPocket = catastrophicLimit + (outOfPocket - catastrophicLimit);
//   }

//   outOfPocket = Math.max(0, outOfPocket);

//   // Display final out-of-pocket cost
//   outOfPocketDisplay.textContent = `Out-of-pocket Cost: ₩${Math.round(outOfPocket).toLocaleString()}`;

//   // Optional: Show breakdown with percentages
//   if (breakdownDisplay) {
//     breakdownDisplay.innerHTML = `
//       <p>Indemnity Insurance Support: ₩${Math.round(indemnitySupport).toLocaleString()} (${((indemnitySupport / totalDrugCost) * 100).toFixed(1)}%)</p>
//       <p>Cancer Insurance Support: ₩${Math.round(cancerSupport).toLocaleString()} (${((cancerSupport / totalDrugCost) * 100).toFixed(1)}%)</p>
//       <p>Median Income Support: ₩${Math.round(incomeSupport).toLocaleString()} (${((incomeSupport / totalDrugCost) * 100).toFixed(1)}%)</p>
//       <p><strong>Final Out-of-pocket Cost: ₩${Math.round(outOfPocket).toLocaleString()} (${((outOfPocket / totalDrugCost) * 100).toFixed(1)}%)</strong></p>
//     `;
//   }
// }

// // Attach listeners to inputs

// // Combine all inputs into one array
// const allInputs = [
//   drugCostInput,
//   cycleInput,
//   incomeSelect,
//   ...insuranceInputs,
//   ...insuranceStatus,

// ];

// // Attach listeners safely
// allInputs.forEach(el => {
//   if (el) {
//     el.addEventListener("input", calculate);
//   }
// });

// Reset logic


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