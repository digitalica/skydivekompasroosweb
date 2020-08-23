import { Route } from "react-router-dom";
import GetExperience from "./scenes/getexperience";
import React from "react";

function KompasroosRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={(props) => {
      // console.log(rest.showWelcome ? "show welcome" : "ready");
      // console.log(JSON.stringify(rest));
      // console.log(JSON.stringify(props));
      return rest.showWelcome
        ? <GetExperience {...rest} />
        : <Component slug={props.match.params.slug} {...rest} />
    }} />
  );
}

export default KompasroosRoute
