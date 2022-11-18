import { Marker } from "leaflet-src.esm";

class GeoMarker {
  //supported in chrome #
  #lat;
  #lng;
  #map;
  #internalMarker;
  constructor(lat, lng, map) {
    this.#lat = lat;
    this.#lng = lng;
    this.#map = map;
    this.#internalMarker = new Marker("marker");
    this.attachToMapCoords();
  }
  get lat() {
    return this.#lat;
  }
  get lng() {
    return this.#lng;
  }
  get map() {
    return this.#map;
  }
  attachToMapCoords() {
    this.#internalMarker.setLatLng([this.#lat, this.#lng]);
    //console.log("this.#internalMarker", this.#internalMarker);
    this.#internalMarker.addTo(this.#map);
  }
}

export { GeoMarker };
