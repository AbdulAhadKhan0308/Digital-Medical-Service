const heartHealthFormBtn = document.querySelector(".heart-health__form__btn");
const heartHealthFormInput = document.querySelector(
  ".heart-health__form__input"
);
const heartHealthResult = document.querySelector(".heart-health__result");
const heartHealthResultImage = document.querySelector(
  ".heart-health__result__image"
);
const welcomeTitle = document.querySelector(".welcome-medicapp--title");
const logoutBtn = document.querySelector(".logout-medicapp--button");
//////////////////////////////////////////////////////////////

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
    const html = `<h3>Prediction Result</h3><div>Predicted Condition: ${
      arrConditions[+arrData[0]]
    }</div>
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

//logout
logoutBtn.addEventListener("click", () => {
  console.log("logoutBtn");
  localStorage.clear();
  //we are at http-localhost/doctor/index3.html
  //go to http-localhost/index.html
  window.location = "./../index1.html";
});
/////////////////////////////////////////////////////

// display username from localStorage
window.onload = function () {
  const username = localStorage.getItem("username");
  const type = localStorage.getItem("type");

  if (!!username && !!type && type === "1") {
    //display title
    welcomeTitle.innerHTML = `Welcome ${username}!`;
  }
};
