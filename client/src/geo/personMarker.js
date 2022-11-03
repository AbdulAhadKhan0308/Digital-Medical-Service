//singleton class
//class for marker of a person
//TO DO:
//person marker's color be different from store
//person marker is live location (60s update)

class PersonMarker extends Marker {
  static instance = null;

  constructor(Lvar, map, lat, lng) {
    super(Lvar, map, lat, lng);

    if (PersonMarker.instance instanceof PersonMarker) {
      return PersonMarker.instance;
    }
    PersonMarker.instance = this;
    return PersonMarker.instance;
  }
  attachToMapCoords(lat, lng) {
    super.attachToMapCoords(lat, lng);
    //PersonMarker.#isOnMap = true;
  }
  removeFromMap() {
    super.removeFromMap();
    //PersonMarker.#isOnMap = false;
  }
}

export {};
