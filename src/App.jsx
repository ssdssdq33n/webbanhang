import Header from "./Header";
import { WOW } from "wowjs";
import React from "react";
class App extends React.Component {
  componentDidMount() {
    const wow = new WOW({
      offset: 100,
      mobile: false,
      live: true,
    });

    wow.init();
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default App;
