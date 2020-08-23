import React from "react";
import {BrowserRouter, Redirect, Switch} from "react-router-dom";
import {withStyles} from "@material-ui/core";

import Header from "./components/header";
import About from "./scenes/about";
import Setfilter from "./scenes/setfilter";
import Setsorting from "./scenes/setsorting";
import Setlanguage from "./scenes/setlanguage";
import Canopy from "./scenes/canopy";
import Main from "./scenes/main";
import Manufacturer from "./scenes/manufacturer";

import KompasroosRoute from "./kompasroosroute";


const styles = theme => ({
  row: {
    display: "flex",
  },

  column: {
    flex: "50%",
  }
});


function KompasroosDesktop(props) {
  const {language} = props

  return (
    <BrowserRouter>
      <div>
        <Header
          {...props}
        />
        <Switch>
          <KompasroosRoute
            exact path={"/" + language + "/"}
            component={Main}

            {...props}
          />
          <KompasroosRoute
            path={"/" + language + "/about" }
            component={About}

            {...props}
          />
          <KompasroosRoute
            path={"/" + language + "/setfilter"}
            component={Setfilter}

            {...props}
          />
          <KompasroosRoute
            path={"/" + language + "/setsorting"}
            component={Setsorting}

            {...props}
          />
          <KompasroosRoute
            path={"/" + language + "/setlanguage"}
            component={Setlanguage}

            {...props}
          />
          <KompasroosRoute
            path={"/" + language + "/canopy/:slug"}
            component={Canopy}

            {...props}
          />
          <KompasroosRoute
            path={"/" + language + "/manufacturer/:slug"}
            component={Manufacturer}

            {...props}
          />
          <Redirect to={"/" + language + "/"} />
        </Switch>
      </div>
    </BrowserRouter>


  );
}

export default withStyles(styles)(KompasroosDesktop);
