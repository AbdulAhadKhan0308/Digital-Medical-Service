//marker with some task on it
//Used Marker = Marker+some popup data
class UsedMarker extends Marker {
  static total = 0;

  constructor(Lvar, map, lat, lng, date, time, type) {
    super(Lvar, map, lat, lng);
    UsedMarker.total++;
    this.attachPopUp(date, time, type);
  }
  attachPopUp(date, time, type) {
    this.markerPin
      .bindPopup(
        L.popup({
          autoClose: false,
          closeOnClick: false,
          className: `${type}-popup`,
        })
      )
      .setPopupContent(`on ${date} at ${time}`)
      .openPopup();
  }
}

export {};
