import { GeoMarker } from "./geoMarker";

//singleton class
//class for marker of a person
//TO DO:
//person marker's color be different from store
//person marker is live location (60s update)

class PersonMarker extends GeoMarker {
  static instance = null;

  constructor(lat, lng, map) {
    super(lat, lng, map);

    if (PersonMarker.instance instanceof PersonMarker) {
      return PersonMarker.instance;
    }
    PersonMarker.instance = this;
    return PersonMarker.instance;
  }
}

export { PersonMarker };
