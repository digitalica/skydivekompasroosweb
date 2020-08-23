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

function KompasroosMobile(props) {
  const {language} = props
  return (
    <BrowserRouter>
      <div>
        <Header
          {...props}
        />
        <Switch>
          <KompasroosRoute
            exact path={"/" + language +"/"}
            component={Main}

            {...props}
          />
          <KompasroosRoute
            path={"/" + language + "/about"}
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
            path={"/" + language + "/setjumps"}
            component={SetJumps}

            {...props}
          />
          <KompasroosRoute
            path={"/" + language + "/setweight"}
            component={SetWeight}

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
        <Footer
          {...props}
        />
      </div>
    </BrowserRouter>

  );

}

export default KompasroosMobile
