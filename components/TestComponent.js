import React, { Component } from "react";
import handleViewport from "react-in-viewport";

class MySectionBlock extends Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}
const Inner = handleViewport(MySectionBlock, { rootMargin: "-1.0px" });

const MySection = props => (
  <Inner
    {...props}
    />
);

export default MySection;
