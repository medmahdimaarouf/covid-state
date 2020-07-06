export default class MapRendersAnnotations {
  static renderCasesAnnotation(country) {
    var countryInfo = country.countryInfo;
    const id = country._id;
    const coordinate = [country.countryInfo.long, country.countryInfo.lat];
    var pointerWidth = 4;
    var pointerColor = "#d49490";
    var newCases = country.newCases;

    if (country.totalCases > 100000) {
      pointerWidth = 32;
      pointerColor = "#e81c0e";
    } else if (country > 50000) {
      pointerWidth = 28;
      pointerColor = "#f0382b";
    } else if (country.totalCases > 10000) {
      pointerWidth = 24;
      pointerColor = "#ed544a";
    } else if (country.totalCases > 1000) {
      pointerWidth = 20;
      pointerColor = "#e86e66";
    } else if (country.totalCases > 1000) {
      pointerWidth = 16;
      pointerColor = "#ed857e";
    } else if (country.totalCases > 100) {
      pointerWidth = 14;
      pointerColor = "#eba09b";
    } else {
      pointerWidth = 8;
      pointerColor = "#e8c3c1";
    }
    //console.log(coordinate);

    return (
      <MapboxGL.PointAnnotation
        key={id}
        id={id}
        title="Test"
        coordinate={coordinate}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: pointerColor,
            resizeMode: "contain",
            opacity: 0.1,
            width: pointerWidth,
            height: pointerWidth,
            borderRadius: pointerWidth / 2,
          }}
        >
          <Text
            style={{
              color: "white",
              flex: 1,
              alignContent: "center",
            }}
          >
            {this.getCasesSTR(newCases)}
          </Text>
        </View>
      </MapboxGL.PointAnnotation>
    );
  }
}
