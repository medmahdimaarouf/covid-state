import React, { Component } from "react";
import View, { AppRegistry } from "react-native";

export default class MySideBar extends Component {
  state = {
    width: "40%",
  };
  constructor(props) {
    super(props);
    this.state = {
      width: "40%",
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "black",
          height: "100%",
          width: 0,
          float: "right",
          right: 0,
          position: "absolute",
          opacity: 0.8,
        }}
      ></View>
    );
  }

  open() {
    this.setState(this.state);
  }
  close() {
    this.setState({ width: 0 });
  }
}
