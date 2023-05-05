import { Map, TileLayer } from "leaflet-src.esm";
import { PersonMarker } from "./personMarker";

function geolocate() {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (positionObj) {
        const { latitude } = positionObj.coords;
        const { longitude } = positionObj.coords;
        //TO DO:
        //coords to come from google's api as it is more accurate
        const coords = [latitude, longitude];

        const map = new Map("map");
        map.setView(coords, 15);

        new TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        //coordinates medical stores

        //mark person on map
        new PersonMarker(latitude, longitude, map);

        // const personMarker = new PersonMarker(
        //   TileLayer,
        //   map,
        //   latitude,
        //   longitude
        // );
        // personMarker.attachToMapCoords([latitude, longitude]);;

        //mark stores on map
      },
      function () {
        alert(
          "Could not get your coordinates. Please allow location permission."
        );
      }
    );
  }
}

export { geolocate };
