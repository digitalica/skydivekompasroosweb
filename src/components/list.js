import React from "react";
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";

import Summary from "../components/summary";
import kompasroosData from "../services/kompasroosdata";
import C from "../services/kompasroosconstants";
import T from "../services/kompasroostranslations";

import Listelement from "../components/listelement";

const styles = theme => ({
  '@global': {
    a: {
      color: "inherit",
      textDecoration: 'none'
    }
  },
  list: {
    padding: 0,
    listStyleType: "none",
    maxWidth: C.MAXWIDTH,
    marginLeft: "auto",
    marginRight: "auto",
  }
});


class List extends React.Component {


  searchMatch(canopy, searchText) {
    // console.log('search: ' + searchText);
    // no or short searchtext, all match
    if (!searchText || searchText.length < 3) {
      return true;
    }
    // match on name
    let searchTextClean = searchText.toLowerCase().replace(/[ ,\-()]/g, '');
    if (canopy.search.indexOf(searchTextClean) !== -1) {
      return true;
    }
    // if everything fails, no match...
    return false;
  }


  getHeader(text) {
    return (
      <li key={text}>
        <table>
          <tbody>
          <tr>
            <td>
              <Typography variant="h6">{text}</Typography>
            </td>
          </tr>
          </tbody>
        </table>
      </li>
    );
  }


  render() {
    const {classes, language} = this.props;


    let canopyList = [];

    let orderedCanopies;

    // console.log(this.props.sorting);
    switch (this.props.sorting) {
      case C.SORTING_MANUFACTURER:
        //console.log("sorting: manufacturer");
        orderedCanopies = kompasroosData.canopiesByManufacturer;
        break;
      case C.SORTING_CATEGORY:
        //console.log("sorting: category");
        orderedCanopies = kompasroosData.canopiesByCategory;
        break;
      case C.SORTING_NAME:
      default:
        //console.log("sorting: name");
        orderedCanopies = kompasroosData.canopiesByName;
        break;
    }

    let lastGroup = null;
    let searchedCanopyHidden = false;

    for (let f = 0; f < orderedCanopies.length; f++) {
      let canopy = kompasroosData.canopies[orderedCanopies[f]];

      let showCanopy = true;

      // check filter op common
      if (this.props.filter === C.FILTER_COMMON) {
        // console.log('filter common ');
        if (!canopy.commontype) {
          showCanopy = false;
        }
      }

      // check filter op around
      if (this.props.filter === C.FILTER_AROUND) {
        // console.log('filter around');
        let minCat = this.props.category - 1;
        let maxCat = this.props.category + 1;
        let canopyCat = canopy.calculationcategory;
        if (canopyCat < minCat || canopyCat > maxCat) {
          showCanopy = false;
        }
      }

      // check filter op searchText
      if (this.props.searchText) {
        if (!this.searchMatch(canopy, this.props.searchText)) {
          showCanopy = false;
        } else {
          if (!showCanopy) {
            searchedCanopyHidden = true;
          }
        }
      }

      if (!showCanopy) {
        continue;
      }


      //console.log(canopy.name);
      canopy.key = canopy.id;
      switch (this.props.sorting) {
        case C.SORTING_MANUFACTURER:
          if (lastGroup !== canopy.manufacturername) { // create (sub)header
            canopyList.push(this.getHeader(canopy.manufacturername));
          }
          lastGroup = canopy.manufacturername;

          canopyList.push(
            <Listelement
              language={language}
              canopy={canopy}
              category={this.props.category}
              exitWeight={this.props.exitWeight}
              sorting={this.props.sorting}
            />
          );
          break;
        case C.SORTING_CATEGORY:
          if (lastGroup !== canopy.calculationcategory) { // create (sub)header
            canopyList.push(this.getHeader(T[language].SORTING_CATEGORY + ' ' + canopy.calculationcategory));
          }
          lastGroup = canopy.calculationcategory;
          canopyList.push(
            <Listelement
              canopy={canopy}
              category={this.props.category}
              exitWeight={this.props.exitWeight}
              sorting={this.props.sorting}
            />
          );
          break;
        case C.SORTING_NAME:
        default:
          canopyList.push(
            <Listelement
              key={canopy.id}
              canopy={canopy}
              category={this.props.category}
              exitWeight={this.props.exitWeight}
              sorting={this.props.sorting}
            />
          );
          break;
      }
    }

    let searchWarning = null;
    if (this.props.searchText && searchedCanopyHidden) {
      searchWarning = this.getHeader(T[language].SEARCH_FILTERWARNING);
    }

    let summary = null;
    let title = null;
    if (!this.props.searchText) {
      title = <Typography variant="h6">{T[language].SUMMARY_TITLE}</Typography>;
      if (this.props.isMobile) {
        summary = <Summary
          language={language}
          category={this.props.category}
          exitWeight={this.props.exitWeight}
        />;
      }
    }

    return (
      <div>
        {title}
        {summary}
        <ul className={classes.list}>
          {canopyList}
          {searchWarning}
        </ul>
      </div>
    )

  }
}

export default withStyles(styles)(List);

