const loginPatientBtn = document.querySelector(".login-medicapp__btn--patient");
const loginDoctorBtn = document.querySelector(".login-medicapp__btn--doctor");
const loginUsernameInput = document.querySelector(".login__form__username");
const loginPassInput = document.querySelector(".login__form__pass");
const loginStatus = document.querySelector(".login-div__status");

///////////////////////////////////////////////////////////////

loginPerson = (type) => {
  loginStatus.innerHTML = "";
  const loginCredentials = {
    user: loginUsernameInput.value,
    pass: loginPassInput.value,
    type: type,
  };
  const url = "http://127.0.0.1/login";
  console.log(loginCredentials);

  if (
    !!loginCredentials.user &&
    !!loginCredentials.pass &&
    loginCredentials.user !== "" &&
    loginCredentials.pass !== ""
  ) {
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCredentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data || !data.stat || data.stat !== "SUCCESS") {
          loginStatus.innerHTML =
            "Something went wrong. Try recheking username or password.";
        } else {
          console.log("SUCCESS");
          //synchronously store username in localStorage
          localStorage.setItem("username", loginCredentials.user);
          localStorage.setItem("type", loginCredentials.type);
          //to be displayed on logged in page
          //load the new page
          if (type === "0") window.location = "./patient/index2.html";
          else window.location = "./doctor/index3.html";
        }
      })
      .catch(() => {
        loginStatus.innerHTML = "Something went wrong. Please try again.";
      });
  }
};

// login patient
loginPatientBtn.addEventListener("click", (e) => {
  console.log("loginPatientBtn");
  e.preventDefault();
  loginPerson("0");
});

//login doctor
loginDoctorBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginPerson("1");
});
