import { geolocate } from "./geo/storeFinder";

const locateMedicalStoresBtn = document.querySelector(".geo-medicapp__btn");

///////////////////////////////////////////////////

//ready search meds

//ready locate medical stores

locateMedicalStoresBtn.addEventListener("click", () => {
  console.log("clicked locateMedicalStoresBtn");
  geolocate();
});

//ready book appointments
