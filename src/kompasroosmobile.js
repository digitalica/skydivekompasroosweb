import React from "react";
import {BrowserRouter, Redirect, Switch} from "react-router-dom";

import Header from "./components/header";
import Main from "./scenes/main";
import About from "./scenes/about";
import Setfilter from "./scenes/setfilter";
import Setsorting from "./scenes/setsorting";
import Setlanguage from "./scenes/setlanguage";
import SetJumps from "./scenes/setjumps";
import SetWeight from "./scenes/setweight";
import Canopy from "./scenes/canopy";
import Manufacturer from "./scenes/manufacturer";
import Footer from "./components/footer";

import KompasroosRoute from "./kompasroosroute";

import C from "./services/kompasroosconstants";

function KompasroosMobile(props) {
  const {language} = props
  return (
    <BrowserRouter>
      <div>
        <Header
          {...C.withoutClasses(props)}
        />
        <Switch>
          <KompasroosRoute
            exact path={"/" + language +"/"}
            component={Main}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/about"}
            component={About}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/setfilter"}
            component={Setfilter}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/setsorting"}
            component={Setsorting}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/setlanguage"}
            component={Setlanguage}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/setjumps"}
            component={SetJumps}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/setweight"}
            component={SetWeight}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/canopy/:slug"}
            component={Canopy}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/manufacturer/:slug"}
            component={Manufacturer}

            {...C.withoutClasses(props)}
          />
          <Redirect to={"/" + language + "/"} />
        </Switch>
        <Footer
          {...C.withoutClasses(props)}
        />
      </div>
    </BrowserRouter>

  );

}

export default KompasroosMobile
