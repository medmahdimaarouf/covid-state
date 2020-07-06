import Orientation from "react-native-orientation";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { Component } from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import LinearGradient from "react-native-linear-gradient";
import AnimatedCircularProgress from "react-native-circular-progress";
//import FastImage from "react-native-fast-image";
MapboxGL.setAccessToken(
  "pk.eyJ1IjoibWVkbWFoZGltYWFyb3VmIiwiYSI6ImNrYnh5N3JscTB1amEyeXA3bjFwYjd6NzUifQ.oGn8zFx9U8Lc1nZL9Iy1sg"
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapcontainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  navbar: {
    flex: 0.15,
    backgroundColor: "#3a3a6c",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  navItem: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    borderColor: "black",
    borderLeftWidth: 1,
    margin: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    margin: 1,
    borderColor: "#2a4944",
    borderWidth: 1,
    backgroundColor: "#d2f7f1",
  },
});

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export default class MainActivity extends Component {
  state = {
    data_countries: [],
    data_world: {},
    screen_state: 0,
    filter_state: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      data_countries: [],
      data_world: {},
      screen_state: 0,
      filter_state: 0,
    };
    this.mapbox_cases_data_countries = [];
    this.mapbox_deaths_data_countries = [];
    this.mapbox_recovers_data_countries = [];
    this.mapbox_tests_data_countries = [];

    this.filterCasesPress.bind(this.filterCasesPress);
    this.filterDeathsPress.bind(this.filterDeathsPress);
    this.filterRecoversPress.bind(this.filterRecoversPress);
    this.filterTestsPress.bind(this.filterTestsPress);
  }

  renderDeathsAnnotation(country) {
    const id = country._id;
    const coordinate = [country.countryInfo.long, country.countryInfo.lat];
    var pointerColor = "#9c47c9";
    var totalDeaths = country.totalDeaths;
    var newDeaths = country.newDeaths;
    var pointerWidth = 5;

    if (totalDeaths > 100000) {
      pointerWidth = 55;
      pointerColor = "#9c47c9";
    } else if (totalDeaths > 50000) {
      pointerWidth = 50;
      pointerColor = "#9c47c9";
    } else if (totalDeaths > 10000) {
      pointerWidth = 45;
      pointerColor = "#2a2c78;";
    } else if (totalDeaths > 5000) {
      pointerWidth = 40;
      pointerColor = "#31337a";
    } else if (totalDeaths > 1000) {
      pointerColor = "#3f418c";
      pointerWidth = 35;
    } else if (totalDeaths > 500) {
      pointerWidth = 30;
      pointerColor = "#3f418c";
    } else if (totalDeaths > 100) {
      pointerWidth = 25;
      pointerColor = "#3f418c";
    } else if (totalDeaths > 50) {
      pointerWidth = 20;
    } else if (totalDeaths > 10) {
      pointerWidth = 15;
      pointerColor = "#5b5ea8";
    } else if (totalDeaths > 5) {
      pointerWidth = 10;
      pointerColor = "#6d6fb5";
    } else {
      pointerWidth = totalDeaths;
      pointerColor = "#787bbf";
    }
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
            {newDeaths == 0 ? "" : "+" + newDeaths}
          </Text>
        </View>
      </MapboxGL.PointAnnotation>
    );
  }
  renderTestsAnnotation(country) {
    const id = country._id;
    const coordinate = [country.countryInfo.long, country.countryInfo.lat];
    var pointerColor = "yellow";
    var pointerWidth = 10;
    var tests = country.tests;
    if (tests > 10000000) {
      pointerWidth = 60;
      pointerColor = "#d4c208";
    } else if (tests > 1000000) {
      pointerWidth = 50;
      pointerColor = "#c2b315";
    } else if (tests > 100000) {
      pointerWidth = 40;
      pointerColor = "#c9bb26";
    } else if (tests > 10000) {
      pointerWidth = 30;
      pointerColor = "#d4c850";
    } else if (tests > 1000) {
      pointerWidth = 20;
      pointerColor = "#ded576";
    } else if (tests > 100) {
      pointerWidth = 10;
      pointerColor = "#e6de8c";
    } else {
      pointerWidth = 5;
      pointerColor = "#ede7a8";
    }
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
        ></View>
      </MapboxGL.PointAnnotation>
    );
  }
  renderRecoversAnnotation(country) {
    const id = country._id;
    const coordinate = [country.countryInfo.long, country.countryInfo.lat];
    var pointerColor = "#1ca327";
    var totalRecovered = country.totalRecovered;
    var pointerWidth = 5;
    if (totalRecovered > 1000000) {
      pointerWidth = 50;
      pointerColor = "#1ca327";
    } else if (totalRecovered > 100000) {
      pointerWidth = 40;
    } else if (totalRecovered > 10000) {
      pointerWidth = 30;
      pointerColor = "#43b04b";
    } else if (totalRecovered > 1000) {
      pointerWidth = 20;
      pointerColor = "#68c46f";
    } else if (totalRecovered > 100) {
      pointerWidth = 10;
      pointerColor = "#8cd191";
    } else if (totalRecovered > 10) {
      pointerWidth = 5;
      pointerColor = "#aff0b4";
    } else {
      pointerWidth = totalRecovered % 5;
      pointerColor = "#c7f0ca";
    }
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
        ></View>
      </MapboxGL.PointAnnotation>
    );
  }
  renderCasesAnnotation(country) {
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
            {newCases == 0 ? "" : "+" + newCases}
          </Text>
        </View>
      </MapboxGL.PointAnnotation>
    );
  }

  render() {
    if (this.state.screen_state == 0)
      return this.getSplashScreen("Collecting ressources ...");
    else if (this.state.screen_state == 1)
      return this.getSplashScreen("Fetching data ...");
    else if (this.state.screen_state == 2)
      return this.getSplashScreen("Initzialization view ....");
    else {
      return (
        <View style={styles.container}>
          <View
            style={{
              alignItems: "center",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "gray",
            }}
          ></View>
          <View style={styles.mapcontainer}>
            <MapboxGL.MapView
              ref={(c) => (this._map = c)}
              style={{ flex: 1, backgroundColor: "white" }}
              rotateEnabled={false}
              logoEnabled={false}
              userTrackingMode={1}
              pitchEnabled={false}
            >
              {this.getFiltredMapAnnotaions()}
              <MapboxGL.Camera
                zoomLevel={1.1}
                followUserLocation={false}
                centerCoordinate={[9, 34]}
              />
            </MapboxGL.MapView>
            <View
              style={{
                backgroundColor: "black",
                height: "100%",
                width: "45%",
                float: "right",
                right: 0,
                position: "absolute",
                opacity: 0.8,
              }}
            >
              <View
                style={{
                  flex: 0.2,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                }}
              >
                <Image
                  style={{
                    alignContent: "flex-start",
                    margin: 8,
                  }}
                  source={require("./assets/images/virus.png")}
                />
                <Text
                  style={{
                    alignContent: "flex-end",
                    margin: 8,
                    color: "white",
                  }}
                >
                  {" "}
                  {"Updated :" +
                    this.getDateUpdateFormat(this.state.data_world.updated)}
                </Text>
              </View>
              <ScrollView
                style={{
                  flex: 1,
                  backgroundColor: "#3a3a6c",
                }}
              >
                {this.state.data_countries.map((country, index) => (
                  <View key={country._id} style={styles.item}>
                    <Image
                      source={{
                        uri: country.countryInfo.flag + "?ts=Math.random()",
                        width: 40,
                        height: 30,
                      }}
                      style={{
                        maxWidth: 40,
                        maxHeight: 30,
                        flex: 1,
                      }}
                      onError={this.test_error}
                    ></Image>
                    <Text
                      style={{
                        textAlign: "center",
                        flex: 1,
                      }}
                    >
                      {country.country}
                    </Text>
                    <Text
                      style={{
                        color: "red",
                        textAlign: "center",
                        flex: 1,
                      }}
                    >
                      {this.filtrateListItem(country)}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.navbar}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={this.filterCasesPress}
            >
              <Image
                margin={4}
                source={require("./assets/images/m_infectes.png")}
              />
              <Text
                style={{
                  alignContent: "center",
                  flex: 1,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Cases
              </Text>
              <Text
                style={{
                  color: "red",
                  flex: 1,
                  fontSize: 10,
                }}
              >
                (+ {this.state.data_world.newCases})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={this.filterDeathsPress}
            >
              <Image
                margin={4}
                source={require("./assets/images/m_deaths.png")}
              />
              <Text
                style={{
                  alignContent: "center",
                  flex: 1,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Deaths
              </Text>
              <Text
                style={{
                  color: "red",
                  flex: 1,
                  fontSize: 10,
                }}
              >
                (+{this.state.data_world.newDeaths})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={this.filterRecoversPress}
            >
              <Image
                margin={4}
                source={require("./assets/images/m_recovers.png")}
              />
              <Text
                style={{
                  alignContent: "center",
                  flex: 1,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Recovers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={this.filterTestsPress}
            >
              <Image
                margin={5}
                source={require("./assets/images/m_test.png")}
              />
              <Text
                style={{
                  alignContent: "center",
                  flex: 1,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Tests
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                (styles.navItem,
                {
                  borderLeftWidth: 1,
                  alignContent: "center",
                  alignItems: "center",
                  marginLeft: 8,
                  marginRight: 8,
                })
              }
            >
              <Image margin={5} source={require("./assets/images/menu.png")} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  UNSAFE_componentWillMount() {
    this.state.screen_state = 1;
    console.log("state screen 1");
    this.setState(this.state);
    this.load_covid_data();
  }

  componentDidMount() {
    Orientation.lockToLandscapeLeft();
    MapboxGL.setTelemetryEnabled(false);
  }

  filterRecoversPress = () => {
    if (this.state.filter_state != 2) {
      this.setState({
        data_world: this.state.data_world,
        data_countries: this.state.data_countries,
        screen_state: this.state.screen_state,
        filter_state: 2,
      });
    }
  };

  filterTestsPress = () => {
    if (this.state.filter_state != 3) {
      this.setState({
        data_world: this.state.data_world,
        data_countries: this.state.data_countries,
        screen_state: this.state.screen_state,
        filter_state: 3,
      });
    }
  };
  filterDeathsPress = () => {
    if (this.state.filter_state != 1) {
      this.setState({
        data_world: this.state.data_world,
        data_countries: this.state.data_countries,
        screen_state: this.state.screen_state,
        filter_state: 1,
      });
    }
  };

  filterCasesPress = () => {
    if (this.state.filter_state != 0) {
      this.setState({
        data_world: this.state.data_world,
        data_countries: this.state.data_countries,
        screen_state: this.state.screen_state,
        filter_state: 0,
      });
    }
  };

  load_covid_data() {
    fetch("https://nepalcorona.info/api/v1/data/world", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((json_response) => {
        this.state.screen_state = 2;
        this.setState(this.state);
        console.log("state screen 2");

        var data = this.fetchResrponse(json_response);

        var mapbox_data = this.renderAnnotations(data.data_countries);
        this.mapbox_cases_data_countries = mapbox_data.map_cases_items;
        this.mapbox_deaths_data_countries = mapbox_data.map_deaths_items;
        this.mapbox_recovers_data_countries = mapbox_data.map_recovers_items;
        this.mapbox_tests_data_countries = mapbox_data.map_tests_items;

        data.screen_state = 3;
        data.filter_state = 0;
        this.setState(data);
        console.log("state screen 3");
      });
  }

  fetchResrponse(response) {
    var data_countries = [];
    var data_world = {};
    response.forEach((country, index) => {
      if (index == 0) {
      } else if (index == 1) {
        data_world = country;
      } else data_countries.push(country);
    });
    //data_countries = [data_countries[0]];
    return { data_countries, data_world };
  }

  test_error(eror) {
    //console.log("eror load image");
  }

  renderAnnotations(data_countries) {
    var map_cases_items = [];
    var map_deaths_items = [];
    var map_recovers_items = [];
    var map_tests_items = [];

    data_countries.forEach((country, index) => {
      map_cases_items.push(this.renderCasesAnnotation(country));
      map_deaths_items.push(this.renderDeathsAnnotation(country));
      map_recovers_items.push(this.renderRecoversAnnotation(country));
      map_tests_items.push(this.renderTestsAnnotation(country));
    });
    return {
      map_cases_items,
      map_deaths_items,
      map_recovers_items,
      map_tests_items,
    };
  }

  getFiltredMapAnnotaions() {
    console.log("Filter sate : " + this.state.filter_state);
    switch (this.state.filter_state) {
      case 1:
        return this.mapbox_deaths_data_countries;
        break;
      case 2:
        return this.mapbox_recovers_data_countries;
        break;
      case 3:
        return this.mapbox_tests_data_countries;
        break;
      default:
        return this.mapbox_cases_data_countries;
        break;
    }
  }

  getSplashScreen(message) {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5, 0.6]}
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={{
          flex: 1,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Image
          style={{
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            margin: 0,
            maxWidth: "50%",
            maxHeight: "50%",
            resizeMode: "center",
          }}
          source={require("./assets/images/xxl_icon.png")}
        ></Image>
        <Text
          style={{
            fontSize: 16,
            color: "#36c0d9",
          }}
        >
          Cororna Virus Tracker mobile dashbord
        </Text>
        <Text style={{ color: "white", fontSize: 12 }}>{message}</Text>
      </LinearGradient>
    );
  }

  filtrateListItem = (country) => {
    switch (this.state.filter_state) {
      case 1:
        return country.totalDeaths;
      case 2:
        return country.totalRecovered;
      case 3:
        return country.tests;
      default:
        return country.totalCases;
    }
  };

  getDateUpdateFormat(date) {
    return this.format(new Date(date), "yyyy/mm/dd hh:mm:ss");
  }

  format = function date2str(x, y) {
    var z = {
      M: x.getMonth() + 1,
      d: x.getDate(),
      h: x.getHours(),
      m: x.getMinutes(),
      s: x.getSeconds(),
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
      return ((v.length > 1 ? "0" : "") + eval("z." + v.slice(-1))).slice(-2);
    });

    return y.replace(/(y+)/g, function (v) {
      return x.getFullYear().toString().slice(-v.length);
    });
  };
}
