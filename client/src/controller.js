import { geolocate } from "./geo/StoreFinder";
const locateMedicalStoresBtn = document.querySelector(".geo-medicapp__btn");
const getSearchResultsBtn = document.querySelector(".search__form__btn");
const symptomCheckbox = document.querySelector("#symptom");
const fuzzyCheckbox = document.querySelector("#fuzzy");
const searchInput = document.querySelector(".search__form__input");
const searchResultDiv = document.querySelector(".search-medicapp__result");
const heartHealthFormBtn = document.querySelector(".heart-health__form__btn");
const heartHealthFormInput = document.querySelector(
  ".heart-health__form__input"
);
const heartHealthResult = document.querySelector(".heart-health__result");
// const heartHealthResultImage = document.querySelector(
//   ".heart-health__result__image"
// );
///////////////////////////////////////////////////

//ready search meds

const renderHTML = function (element, data) {
  //remove everything present before
  element.innerHTML = "";

  let html = `<h3>Results</h3>
  <div>Something went wrong. Please try again.</div>`;
  if (
    !!data &&
    !!data.stat &&
    data.stat === "SUCCESS" &&
    !!data.result &&
    Array.isArray(data.result)
  ) {
    html = `<h3>Results</h3>`;

    for (let i = 0; i < data.result.length; i++) {
      html += `
        <div>Medicine Name: ${data.result[i]["Medicine Name"]}</div>
        <div>MRP: ${data.result[i]["MRP"]}</div>
        <div>Uses: ${data.result[i]["Uses"]}</div>
        <div>Prescription: ${data.result[i]["Prescription"]}</div>
        <div>Side Effects: ${data.result[i]["Side Effects"]}</div>
        <div>Habit Forming: ${data.result[i]["Habit Forming"]}</div>
        <div>Alternate Medicines: ${data.result[i]["Alternate Medicines"]}</div><br/>`;
    }
  }
  element.insertAdjacentHTML("afterbegin", html);
};

getSearchResultsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked getSearchResultsBtn");
  searchResultDiv.textContent = "";

  let qStr = "http://127.0.0.1/search?";
  const symptomCheck = symptomCheckbox.checked;
  const fuzzyCheck = fuzzyCheckbox.checked;

  if (!symptomCheck && !fuzzyCheck) qStr += "illness=0&fuzzy=0";
  else if (!!symptomCheck && !fuzzyCheck) qStr += "illness=1&fuzzy=0";
  else if (!symptomCheck && !!fuzzyCheck) qStr += "illness=0&fuzzy=1";
  else qStr += "illness=1&fuzzy=1";

  qStr += `&searchTerm=${searchInput.value}`;

  console.log(qStr);

  fetch(qStr)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderHTML(searchResultDiv, data);
    })
    .catch((data) => renderHTML(searchResultDiv, data));
});

//ready locate medical stores

locateMedicalStoresBtn.addEventListener("click", () => {
  console.log("clicked locateMedicalStoresBtn");
  geolocate();
});

//ready heart health predictor

const renderPrediction = function (stat, element, data) {
  if (stat === 0) {
    const html =
      "<h3>Prediction Result</h3><div>Something went wrong. Please try again.</div>";

    element.insertAdjacentHTML("afterbegin", html);
  } else {
    const arrConditions = [
      "Normal Beat",
      "Supraventricular Premature Beat",
      "Premature Ventricular Contraction",
      "Fusion of Ventricular And Normal Beat",
      "Unclassifiable Beat",
    ];
    const arrData = data.split(":");
    const arrPredictions = arrData[2].slice(1, -1).split(" ");
    // console.log(arrPredictions);
    const html = `<div>Predicted Condition: ${arrConditions[+arrData[0]]}</div>
          <div>Actual Condition: ${arrConditions[+arrData[1]]}</div>
          <div><strong>Predicted Probabilities:</strong></div>
          <div>Normal Beat: ${arrPredictions[0]}</div>
          <div>Supraventricular Premature Beat: ${arrPredictions[1]}</div>
          <div>Premature Ventricular Contraction: ${arrPredictions[2]}</div>
          <div>Fusion of Ventricular And Normal Beat: ${arrPredictions[3]}</div>
          <div>Unclassifiable Beat: ${arrPredictions[4]}</div>`;

    element.insertAdjacentHTML("afterbegin", html);
  }
};

heartHealthFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  heartHealthResult.textContent = "";
  console.log("heartHealthPredictorBtn clicked");

  if (!isNaN(parseInt(heartHealthFormInput.value))) {
    fetch(
      `http://127.0.0.1:5000/ecg/?repno=${parseInt(heartHealthFormInput.value)}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("success");
        // console.log(data);
        if (data === "INVALID REPORT_NUMBER")
          renderPrediction(0, heartHealthResult);
        else renderPrediction(1, heartHealthResult, data);
      })
      .catch(() => renderPrediction(0, heartHealthResult));
  } else {
    renderPrediction(0, heartHealthResult);
  }
});
