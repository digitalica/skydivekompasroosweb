import React from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";


import T from "../services/kompasroostranslations";
import C from "../services/kompasroosconstants";


function Sorting(props) {
  const {language} = props;

  return (
    <FormControl component="fieldset">

      <FormLabel component="legend">{T[language].SORTING}</FormLabel>
      <RadioGroup
        aria-label={T[language].SORTING}
        name={T[language].SORTING}
        value={props.sorting}
        onChange={props.updateSorting}
      >
        <FormControlLabel value={C.SORTING_NAME} control={<Radio/>} label={T[language].SORTING_NAME}/>
        <FormControlLabel value={C.SORTING_MANUFACTURER} control={<Radio/>}
                          label={T[language].SORTING_MANUFACTURER}/>
        <FormControlLabel value={C.SORTING_CATEGORY} control={<Radio/>} label={T[language].SORTING_CATEGORY}/>
      </RadioGroup>

    </FormControl>

  );

}


export default Sorting;
