import React from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";


import T from "../services/kompasroostranslations";
import C from "../services/kompasroosconstants";


function Filter(props) {
  const {language} = props;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{T[language].FILTER}</FormLabel>
      <RadioGroup
        aria-label={T[language].FILTER}
        name={T[language].FILTER}
        value={props.filter}
        onChange={props.updateFilter}
      >
        <FormControlLabel value={C.FILTER_ALL} control={<Radio/>} label={T[language].FILTER_ALL}/>
        <FormControlLabel value={C.FILTER_COMMON} control={<Radio/>} label={T[language].FILTER_COMMON}/>
        <FormControlLabel value={C.FILTER_AROUND} control={<Radio/>}
                          label={T[language].FILTER_AROUND + ' ' + props.category}/>
      </RadioGroup>
    </FormControl>
  );

}


export default Filter;
