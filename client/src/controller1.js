const loginPatientBtn = document.querySelector(".login-medicapp__btn--patient");
const loginDoctorBtn = document.querySelector(".login-medicapp__btn--doctor");
const loginUsernameInput = document.querySelector(".login__form__username");
const loginPassInput = document.querySelector(".login__form__pass");
const loginStatus = document.querySelector(".login-div__status");

const signupPatientBtn = document.querySelector(
  ".signup-medicapp__btn--patient"
);
const signupDoctorBtn = document.querySelector(".signup-medicapp__btn--doctor");
const signupUsernameInput = document.querySelector(".signup__form__username");
const signupPassInput = document.querySelector(".signup__form__pass");
const signupConfirmPassInput = document.querySelector(
  ".signup__form__confirm-pass"
);
const signupStatus = document.querySelector(".signup-div__status");
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

const signupPerson = (type) => {
  signupStatus.innerHTML = "";

  const confirmPass = signupConfirmPassInput.value;
  const signupCredentials = {
    user: signupUsernameInput.value,
    pass: signupPassInput.value,
    type: type,
  };
  const url = "http://127.0.0.1/signup";
  console.log(signupCredentials);

  if (
    !!signupCredentials.user &&
    !!signupCredentials.pass &&
    signupCredentials.user !== "" &&
    signupCredentials.pass !== ""
  ) {
    if (signupCredentials.pass !== confirmPass) {
      signupStatus.innerHTML = "Passwords do not match.";
      return;
    }
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupCredentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!!data && !!data.stat && data.stat === "SUCCESS") {
          console.log("SUCCESS");
          //display info that user has been registered.
          if (type === "0")
            signupStatus.innerHTML = "Successfully registered as patient.";
          else signupStatus.innerHTML = "Successfully registered as doctor.";
        } else {
          if (
            !!data &&
            !!data.stat &&
            !!data.message &&
            data.stat === "FAILURE" &&
            data.message === "NON UNIQUE"
          ) {
            signupStatus.innerHTML = "Username not unique, try a new one.";
          } else {
            signupStatus.innerHTML = "Something went wrong. Please try again.";
          }
        }
      })
      .catch(() => {
        loginStatus.innerHTML = "Something went wrong. Please try again.";
      });
  }
};
/////////////////////////////////////////////////////
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

//signup patient
signupPatientBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("signupPatientBtn");
  signupPerson("0");
});

//signup doctor
signupDoctorBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("signupDoctorBtn");
  signupPerson("1");
});
