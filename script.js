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
let medianIcome = 0;

// Unified function to handle both inputs
function updateDrugCostSummary() {
  // Clean and parse drug cost
  let rawDrugCost = drugCostInput.value.replace(/[^0-9]/g, "");
  costValue = Number(rawDrugCost);
  drugCostInput.value = rawDrugCost;

  // Parse cycle value
  cycleValue = parseInt(cycleInput.value, 10);
  if (isNaN(cycleValue) || cycleValue <= 0) {
    cycleInput.value = "";
    cycleValue = 0;
  }

  // Calculate total drug cost
  drugsum = costValue * cycleValue;

  // Display result if both values are valid
  if (costValue && cycleValue) {
    defaultValue.innerHTML = `
      <p class="def-sum">
        <strong>전체 약제비<br> ${drugsum.toLocaleString()} 원 (100%)</strong>
      </p>
    `;
  }
}

// Attach the unified handler to both inputs
drugCostInput.addEventListener("input", updateDrugCostSummary);
cycleInput.addEventListener("input", updateDrugCostSummary);


insurSelector.forEach(el => {
  el.addEventListener("click", function (e) {
    const drugCostFilled = drugCostInput.value.trim() !== "";
    const cycleFilled = cycleInput.value.trim() !== "";

    if (!drugCostFilled || !cycleFilled) {
      e.preventDefault();
      alert("약제비와 주기를 입력해주세요.");
      return;
    }
    const selectedStatus = document.querySelector('input[name="insuranceStatus"]:checked')?.value;
    const selectedIncome = document.querySelector('input[name="income-range"]:checked')?.value;

    if (selectedStatus === "no") {
      addedArea.classList.remove("disabled");
      updateInsuranceSummary({
        status: selectedStatus,
        type : "N/A",
        incomeLevel: selectedIncome,
        totalCost: drugsum
      });
    }

 
    if (selectedStatus === "yes") {
    addedArea.classList.remove("disabled");

      const selectedType = Array.from(
        document.querySelectorAll('input[name="insuranceType"]:checked')
      ).map(input => input.value);
    
      updateInsuranceSummary({
        status: selectedStatus,
        type: selectedType,
        incomeLevel: selectedIncome,
        totalCost: drugsum
      });
    }


  



    // if (selectedStatus === "no") {
    //   addedArea.classList.add("disabled");
    //   topBalloon.innerHTML = `
    //     <p class="def-sum">
    //       사보험 지원<br>0원 (0%)
    //     </p>
    //   `;
    // } else if (selectedStatus === "yes" && selectedType === "indemnity" && incomeSelect.value === "≤50%") {
    //   const result = calculateIndemnityOnly(drugsum);
    //   const medianResult = calculateMedianIcom(outOfPocket);
    //   console.log("medianResult", medianResult)
    //   topBalloon.innerHTML = `
    //     <p class="def-sum">
    //       사보험 지원<br>${result.indemnityCoverage.toLocaleString()}원 (${Math.round((result.indemnityCoverage / result.totalCost) * 100)}%)
    //     </p>
    //   `;
    //   incomeSelect.value ? 
    //     centerBalloon.innerHTML =  `
    //     <p class="def-sum">재난적의료비 지원 <br> ${medianResult} (${Math.round(( medianResult / result.outOfPocket) * 100)}%)
    //     </p> :
    //   ` : "0 (0%)";

    //   barAreaBg1.style.background = "#eb6100";
    //   bottomBalloon.style.background = "#eb6100";
    //   bottomBalloon.innerHTML = `
    //     <p class="def-sum">
    //       본인 부담 비율<br>${result.outOfPocket.toLocaleString()}원 (${Math.round((result.outOfPocket / result.totalCost) * 100)}%)
    //     </p>
    //   `;
    // } else {
    //   topBalloon.innerHTML = "";
    // }


  });
});




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


function animateVerticalBar(indemnityPercent, medianPercent, outOfPocketPercent) {

  console.log(indemnityPercent, medianPercent, outOfPocketPercent)

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
  indemnityBar.style.height = `${indemnityPercent}%`;
  medianBar.style.height = `${medianPercent}%`;
  outOfPocketBar.style.height = `${outOfPocketPercent}%`;

}


function calculateCancerOnly(totalCost) {
  let cancerCoverage = totalCost - 30000000

  let CanceroutOfPocket = totalCost - cancerCoverage

  console.log("cancerCoverage", cancerCoverage)
  console.log("outOfPocketCancer", CanceroutOfPocket)

  return { cancerCoverage, CanceroutOfPocket }
}


function calculateIndemnityOnly(totalCost) {
  // Calculate 70% of total cost
  let indemnityCoverage = totalCost * 0.7;

  // Apply maximum cap of 30,000,000 KRW
  if (indemnityCoverage > 30000000) {
    indemnityCoverage = 30000000;
  }

  // Calculate out-of-pocket cost
  outOfPocket = totalCost - indemnityCoverage;

  // console.log("totalCost", totalCost, "indemnityCoverage", indemnityCoverage, "outOfPocket", outOfPocket)

  return {
    totalCost,
    indemnityCoverage,
    outOfPocket
  };
}


function calculateCancerANDindemnity(totalCost) {

  let cancerCoverage = totalCost - 30000000
  let indemnityCoverage = totalCost * 0.7;

  let cancerplusindemnity = cancerCoverage - indemnityCoverage

  console.log("cancerplusindemnity", cancerplusindemnity)
  return { cancerplusindemnity }

}

function updateInsuranceSummary({ status, type, incomeLevel, totalCost }) {
  // Calculate indemnity coverage
  let result = { totalCost, incomeLevel };
  const indemnityresult = calculateIndemnityOnly(drugsum);


  // if ((status === "yes")  && (type === "cancer")) {
  const cancerValue = calculateCancerOnly(totalCost)

  // } 



  // Calculate median income support
  let medianSupportRate = 0;
  if (incomeLevel === "below50") medianSupportRate = 0.8;
  else if (incomeLevel === "50to100") medianSupportRate = 0.7;
  else if (incomeLevel === "100to200") medianSupportRate = 0.6;
  else if (incomeLevel === "above200") medianSupportRate = 0.5;

  const medianSupportforindemnity = indemnityresult.indemnityCoverage * medianSupportRate

  const medianSupportforcancer = cancerValue.cancerCoverage * medianSupportRate


  console.log("medianSupportforcancer", medianSupportforcancer)

  console.log("medianSupport", medianSupportforindemnity)

  const finalOutOfPocketOne = result.totalCost - indemnityresult.outOfPocket - medianSupportforindemnity;

  const finalOutOfPocketTwo = result.totalCost - cancerValue.CanceroutOfPocket - medianSupportforcancer;



  let indemnityPercent = Math.round((indemnityresult.indemnityCoverage / totalCost) * 100);
  let cancerPercent = Math.round((cancerValue.cancerCoverage / totalCost) * 100);

  let medianPercentOne = Math.round((medianSupportforindemnity / result.totalCost) * 100);
  let medianPercentTwo = Math.round((medianSupportforcancer / result.totalCost) * 100);
  let outOfPocketPercentOne = Math.round((finalOutOfPocketOne / result.totalCost) * 100);

  let outOfPocketPercentTwo = Math.round((finalOutOfPocketTwo / result.totalCost) * 100);

  // Ensure total does not exceed 100%
  let totalPercentOne = indemnityPercent + medianPercentOne + outOfPocketPercentOne;

  let totalPercentTwo = cancerPercent + medianPercentTwo + outOfPocketPercentTwo


  if (totalPercentOne > 100) {
    const scale = 100 / totalPercentOne;
    indemnityPercent = Math.round(indemnityPercent * scale);
    cancerPercent = Math.round(cancerPercent * scale);
    medianPercentOne = Math.round(medianPercentOne * scale);
    outOfPocketPercentOne = 100 - indemnityPercent - medianPercentOne;
    // Ensure total is exactly 100
  }

  if (totalPercentTwo > 100) {
    const scale = 100 / totalPercentTwo;
    cancerPercent = Math.round(cancerPercent * scale);
    medianPercentTwo = Math.round(medianPercentTwo * scale);
    outOfPocketPercentTwo = 100 - cancerPercent - medianPercentTwo;
  }


  if (status === "no") {
    addedArea.classList.add("disabled");
    topBalloon.innerHTML = `
        <p class="def-sum">
          사보험 지원<br>0원 (0%)
        </p>
      `;
  }

  if ((status === "no") && (type === "indemnity") && (type === "cancer")) {
    return calculateCancerANDindemnity(totalCost)
  }



  if ((status === "yes") && type.includes("indemnity")) {
    // Update top balloon (insurance support)
    topBalloon.innerHTML = `
    <p class="def-sum">
      사보험 지원<br>${indemnityresult.indemnityCoverage.toLocaleString()}원 (${indemnityPercent}%)
    </p>
  `;
    // Update bottom balloon (final out-of-pocket)
    bottomBalloon.innerHTML = `
    <p class="def-sum">
      본인 부담 비율<br>${finalOutOfPocketOne.toLocaleString()}원 (${outOfPocketPercentOne}%)
    </p>
  `;
  }

  if ((status === "yes") && type.includes("cancer")) {
    // Update top balloon (insurance support)
    topBalloon.innerHTML = `
    <p class="def-sum">
      사보험 지원<br>${cancerValue.cancerCoverage.toLocaleString()}원 (${indemnityPercent}%)
    </p>
  `;
    // Update bottom balloon (final out-of-pocket)
    bottomBalloon.innerHTML = `
    <p class="def-sum">
      본인 부담 비율<br>${finalOutOfPocketTwo.toLocaleString()}원 (${outOfPocketPercentTwo}%)
    </p>
  `;
    console.log("cancerPocket", outOfPocketPercentTwo)
  }


  if ((status === "yes") && type.includes("cancer") && type.includes("indemnity")) {
    // Update top balloon (insurance support)
    topBalloon.innerHTML = `
    <p class="def-sum">
      사보험 지원<br>${cancerValue.cancerCoverage.toLocaleString()}원 (${indemnityPercent}%)
    </p>
  `;
    // Update bottom balloon (final out-of-pocket)
    bottomBalloon.innerHTML = `
    <p class="def-sum">
      본인 부담 비율<br>${finalOutOfPocketTwo.toLocaleString()}원 (${outOfPocketPercentTwo}%)
    </p>
  `;
    console.log("cancerPocket", outOfPocketPercentTwo)
  }

  middleIcome(status, incomeLevel, medianPercentOne, medianPercentTwo, medianSupportforindemnity, medianSupportforcancer)



  // Animate bar area
  animateVerticalBar(indemnityPercent, medianPercentOne, medianPercentTwo, outOfPocketPercentOne, outOfPocketPercentTwo)
  // barAreaBg2.style.background = "#bddba5";
  // barAreaBg1.style.background = "#eb6100";
  bottomBalloon.style.background = "#eb6100";
}


function middleIcome(status,incomelevel, medianPercentOne, medianPercentTwo, medianSupportforindemnity, medianSupportforcancer) {
  if (incomelevel === "below50") {
    // Update center balloon (median income support)
    centerBalloon.innerHTML = `
   <p class="def-sum">
     재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString}원 (${medianPercentOne || medianPercentTwo}%)
   </p> 
 `;
  } if (incomelevel === "50to100") {
    // Update center balloon (median income support)
    centerBalloon.innerHTML = `
   <p class="def-sum">
     재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString()}원 (${medianPercentOne || medianPercentTwo}%)
   </p> 
 `;
  } if (incomelevel === "100to200") {
    // Update center balloon (median income support)
    centerBalloon.innerHTML = `
   <p class="def-sum">
     재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString()}원 (${medianPercentOne || medianPercentTwo}%)
   </p> 
 `;
  } if (incomelevel === "above200") {
    // Update center balloon (median income support)
    centerBalloon.innerHTML = `
   <p class="def-sum">
     재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString()}원 (${medianPercentOne || medianPercentTwo}%)
   </p> 
 `;
  }



  if (status === "no") {
    if (incomelevel === "below50") {
      // Update center balloon (median income support)
      centerBalloon.innerHTML = `
     <p class="def-sum">
       재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString}원 (${medianPercentOne || medianPercentTwo}%)
     </p> 
   `;
    } if (incomelevel === "50to100") {
      // Update center balloon (median income support)
      centerBalloon.innerHTML = `
     <p class="def-sum">
       재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString()}원 (${medianPercentOne || medianPercentTwo}%)
     </p> 
   `;
    } if (incomelevel === "100to200") {
      // Update center balloon (median income support)
      centerBalloon.innerHTML = `
     <p class="def-sum">
       재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString()}원 (${medianPercentOne || medianPercentTwo}%)
     </p> 
   `;
    } if (incomelevel === "above200") {
      // Update center balloon (median income support)
      centerBalloon.innerHTML = `
     <p class="def-sum">
       재난적의료비 지원<br>${medianSupportforindemnity.toLocaleString() || medianSupportforcancer.toLocaleString()}원 (${medianPercentOne || medianPercentTwo}%)
     </p> 
   `;
    }
  }
}
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