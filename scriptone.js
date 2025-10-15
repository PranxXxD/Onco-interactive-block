/**
 * Refactored script.js
 * Modular, readable, and production-ready version
 */

// DOM Elements
const DOM = {
    drugCostInput: document.querySelector(".drugCost"),
    cycleInput: document.querySelector(".cycle"),
    defaultValue: document.querySelector(".def-sum"),
    addedArea: document.querySelector(".added-check"),
    insurSelectors: document.querySelectorAll(".insur-checker"),
    incomeSelect: document.querySelector(".income"),
    topBalloon: document.querySelector(".top-ballon"),
    centerBalloon: document.querySelector(".center-ballon"),
    bottomBalloon: document.querySelector(".bottom-ballon"),
    resetBtn: document.getElementById("resetBtn")
  };

  let costValue, cycleValue, total
  
  // Utility Functions
  function parseCurrency(value) {
    return  Number(value.replace(/[^0-9]/g, ""));
  }
  
  function formatCurrency(value) {
    return value.toLocaleString();
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
  
  // Calculation Functions
  function calculateTotalDrugCost(cost, cycles) {
    return cost * cycles;
  }
  
  // UI Update Functions
  function updateDrugCostSummary() {
     cost = parseCurrency(DOM.drugCostInput.value);
     cycles = parseInt(DOM.cycleInput.value, 10) || 0;
     total = calculateTotalDrugCost(cost, cycles);
  
    if (cost && cycles) {
      DOM.defaultValue.innerHTML = `
        <p class='def-sum'>
          <strong>전체 약제비<br>${formatCurrency(total)} 원 (100%)</strong>
        </p>
      `;
    }
  }

  function animateVerticalBar(indemnityPercent, medianPercent, outOfPocketPercent) {

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
    indemnityBar.style.height = `${indemnityPercent || 0}%`;
    medianBar.style.height = `${medianPercent || 0}%`;
    outOfPocketBar.style.height = `${outOfPocketPercent}%`;
  
  }
  
  // Reset Functionality
  function resetCalculator() {
    DOM.drugCostInput.value = "";
    DOM.cycleInput.value = "";
    DOM.topBalloon.innerHTML = "";
    DOM.centerBalloon.innerHTML = "";
    DOM.bottomBalloon.innerHTML = "";
    DOM.incomeSelect.value = "";
    DOM.bottomBalloon.style.background = "#68b64a";
    removeAnimation();
  }
  
  function removeAnimation() {
    const bars = ["bar-indemnity", "bar-median", "bar-outofpocket"];
    bars.forEach(id => {
      const bar = document.getElementById(id);
      if (bar) {
        bar.style.height = "0%";
        bar.style.animation = "none";
      }
    });
  }

  function calculateCancerOnly(totalCost, incomeLevel, status) {
    let cancerCoverage = 30000000;
  
    if (cancerCoverage > 30000000) {
      cancerCoverage = 30000000;
    }
  
    let cancerPercent = Math.round((cancerCoverage / totalCost) * 100);
    const medianSupportRate = getIncomeSupportRate(incomeLevel);
    const medianSupportforcancer = totalCost - cancerCoverage * medianSupportRate;
    let medianPercentTwo = Math.round((medianSupportforcancer / totalCost) * 100);
  
    const finalOutOfPocketTwo = totalCost - cancerCoverage - medianSupportforcancer;
    let outOfPocketPercentTwo = Math.round((finalOutOfPocketTwo / totalCost) * 100);
  
    let totalPercentTwo = cancerPercent + medianPercentTwo + outOfPocketPercentTwo;
  
    if (totalPercentTwo > 100) {
      const scale = 100 / totalPercentTwo;
      cancerPercent = Math.round(cancerPercent * scale);
      medianPercentTwo = Math.round(medianPercentTwo * scale);
      outOfPocketPercentTwo = 100 - cancerPercent - medianPercentTwo;
    }
  
    middleIcome(status, incomeLevel, medianPercentTwo, null, null, medianSupportforcancer, null, null, null, totalCost);
    animateVerticalBar(cancerPercent, medianPercentTwo, outOfPocketPercentTwo);
  
    window.barAnimationValues = {
      cancerPercent,
      medianPercentTwo,
      outOfPocketPercentTwo
    };
  
    return {
      cancerCoverage,
      cancerPercent,
      medianPercentTwo,
      medianSupportforcancer,
      outOfPocketPercentTwo,
      finalOutOfPocketTwo
    };
  }


  function calculateIndemnityOnly(totalCost, incomeLevel, status) {
    let indemnityCoverage = totalCost * 0.7;
  
    if (indemnityCoverage > 50000000) {
      indemnityCoverage = 50000000;
    }
  
    let indemnityPercent = Math.round((indemnityCoverage / totalCost) * 100);
    const medianSupportRate = MediaSupportFun(incomeLevel);
    const medianSupportforindemnity = totalCost - indemnityCoverage * medianSupportRate;
    let medianPercentOne = Math.round((medianSupportforindemnity / totalCost) * 100);
  
    const finalOutOfPocketOne = totalCost - indemnityCoverage - medianSupportforindemnity;
    let outOfPocketPercentOne = Math.round((finalOutOfPocketOne / totalCost) * 100);
  
    let totalPercentOne = indemnityPercent + medianPercentOne + outOfPocketPercentOne;
  
    if (totalPercentOne >= 100) {
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


  function calculateCancerANDindemnity(totalCost, status, incomeLevel) {
    let cancerCoverage = 30000000;
    let indemnityCoverage = totalCost * 0.7;
  
    if (indemnityCoverage > 50000000) {
      indemnityCoverage = 50000000;
    }
  
    let cancerplusindemnity = indemnityCoverage - cancerCoverage;
    let cancerandindemnityPercent = Math.round((cancerplusindemnity / totalCost) * 100);
  
    const medianSupportRate = MediaSupportFun(incomeLevel);
    const medianSupportforcancerandindemnity = totalCost - cancerplusindemnity * medianSupportRate;
    let medianPercentThree = Math.round((medianSupportforcancerandindemnity / totalCost) * 100);
  
    const finalOutOfPocketThree = totalCost - cancerplusindemnity - medianSupportforcancerandindemnity;
    let outOfPocketPercentThree = Math.round((finalOutOfPocketThree / totalCost) * 100);
  
    let totalPercentThree = cancerandindemnityPercent + medianPercentThree + outOfPocketPercentThree;
  
    if (totalPercentThree > 100) {
      const scale = 100 / totalPercentThree;
      medianPercentThree = Math.round(medianPercentThree * scale);
      outOfPocketPercentThree = 100 - medianPercentThree - cancerandindemnityPercent;
    }
  
    middleIcome(status, incomeLevel, null, null, null, null, medianSupportforcancerandindemnity, medianPercentThree, null, totalCost);
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
  
  function updateInsuranceSummary({ status, type, incomeLevel, totalCost }) {
    const catastrophicmedicalExp = 50000000;
    const outofpocketMoney = incomeLevel === "above200" ? totalCost : catastrophicmedicalExp - totalCost;
    const safeCatastrophic = Math.min(catastrophicmedicalExp, totalCost);
  
    let indemnityresult, cancerValue, cancerandindemnity;
  
    if (status === "yes" && type.includes("indemnity")) {
      indemnityresult = calculateIndemnityOnly(type, status, totalCost, incomeLevel);
      DOM.topBalloon.innerHTML = `
        <p class="def-sum">
          사보험 지원<br>${indemnityresult.indemnityCoverage.toLocaleString()}원 (${indemnityresult.indemnityPercent}%)
        </p>
      `;
      DOM.bottomBalloon.innerHTML = `
        <p class="def-sum">
          본인 부담 비율<br>${indemnityresult.finalOutOfPocketOne.toLocaleString()}원 (${indemnityresult.outOfPocketPercentOne}%)
        </p>
      `;
    }
  
    if (status === "yes" && type.includes("cancer")) {
      cancerValue = calculateCancerOnly(status, type, totalCost, incomeLevel);
      DOM.topBalloon.innerHTML = `
        <p class="def-sum">
          사보험 지원<br>${cancerValue.cancerCoverage.toLocaleString()}원 (${cancerValue.cancerPercent}%)
        </p>
      `;
      DOM.bottomBalloon.innerHTML = `
        <p class="def-sum">
          본인 부담 비율<br>${cancerValue.finalOutOfPocketTwo.toLocaleString()}원 (${cancerValue.outOfPocketPercentTwo}%)
        </p>
      `;
    }
  
    if (status === "yes" && type.includes("cancer") && type.includes("indemnity")) {
      cancerandindemnity = calculateCancerANDindemnity(type, totalCost, incomeLevel, status);
      DOM.topBalloon.innerHTML = `
        <p class="def-sum">
          사보험 지원<br>${cancerandindemnity.cancerplusindemnity.toLocaleString()}원 (${cancerandindemnity.cancerandindemnityPercent}%)
        </p>
      `;
      DOM.bottomBalloon.innerHTML = `
        <p class="def-sum">
          본인 부담 비율<br>${cancerandindemnity.finalOutOfPocketThree.toLocaleString()}원 (${cancerandindemnity.outOfPocketPercentThree}%)
        </p>
      `;
    }
  
    const catastrophicPercent = Math.round((safeCatastrophic / totalCost) * 100);
    const outofPocketPercent = Math.round((outofpocketMoney / totalCost) * 100);
    const finalcatastrophicPercent = 100 - outofPocketPercent;
  
    if (status === "no") {
      DOM.addedArea.classList.add("disabled");
      DOM.topBalloon.innerHTML = `
        <p class="def-sum">
          사보험 지원<br>0원 (0%)
        </p>
      `;
      DOM.bottomBalloon.innerHTML = `
        <p class="def-sum">
          본인 부담 비율<br>${outofpocketMoney.toLocaleString()}원 (${outofPocketPercent}%)
        </p>
      `;
    }
  
    middleIcome(
      status,
      incomeLevel,
      indemnityresult?.medianPercentOne,
      cancerValue?.medianPercentTwo,
      indemnityresult?.medianSupportforindemnity,
      cancerValue?.medianSupportforcancer,
      cancerandindemnity?.medianSupportforcancerandindemnity,
      cancerandindemnity?.medianPercentThree,
      finalcatastrophicPercent,
      catastrophicmedicalExp
    );
  
    animateVerticalBar(outofPocketPercent, catastrophicPercent);
  
    window.barAnimationValues = {
      catastrophicPercent,
      outofPocketPercent,
      costValue,
      cycleValue
    };
  
    DOM.bottomBalloon.style.background = "#eb6100";
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
    finalcatastrophicPercent,
    catastrophicmedicalExp
  ) {
    const supportAmount =
      medianSupportforindemnity?.toLocaleString() ||
      medianSupportforcancer?.toLocaleString() ||
      medianSupportforcancerandindemnity?.toLocaleString();
  
    const supportPercent =
      medianPercentOne || medianPercentTwo || medianPercentThree;
  
    if (status === "yes") {
      DOM.centerBalloon.innerHTML = `
        <p class="def-sum">
          재난적의료비 지원<br>${supportAmount}원 (${supportPercent}%)
        </p>
      `;
    }
  
    if (status === "no") {
      const amount = incomeLevel === "above200" ? 0 : catastrophicmedicalExp;
      const percent = incomeLevel === "above200" ? 0 : finalcatastrophicPercent;
  
      DOM.centerBalloon.innerHTML = `
        <p class="def-sum">
          재난적의료비 지원<br>${amount.toLocaleString()}원 (${percent}%)
        </p>
      `;
    }
  }
  
  // Event Binding
  function bindEvents() {
    DOM.drugCostInput.addEventListener("input", updateDrugCostSummary);
    DOM.cycleInput.addEventListener("input", updateDrugCostSummary);
    DOM.resetBtn.addEventListener("click", resetCalculator);
  
    DOM.insurSelectors.forEach(el => {
      el.addEventListener("click", () => {
        const cost = parseCurrency(DOM.drugCostInput.value);
        const cycles = parseInt(DOM.cycleInput.value, 10) || 0;
        const total = calculateTotalDrugCost(cost, cycles);
        const incomeLevel = document.querySelector("input[name='income-range']:checked")?.value;
        const status = document.querySelector("input[name='insuranceStatus']:checked")?.value;
        const types = Array.from(document.querySelectorAll("input[name='insuranceType']:checked")).map(i => i.value);
  
        if (!cost || !cycles) {
          alert("약제비와 주기를 입력해주세요.");
          return;
        }
  
        DOM.addedArea.classList.remove("disabled");
        updateInsuranceSummary({ status, type: types, incomeLevel, totalCost: total });
      });
    });
  }
  
  // Initialize
  bindEvents();