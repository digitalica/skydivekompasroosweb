import React, {Component} from 'react';

import {withCookies} from 'react-cookie';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {indigo, pink, red, green, yellow} from '@material-ui/core/colors';

import Media from 'react-media';

import C from "./services/kompasroosconstants";
import KompasroosMobile from "./kompasroosmobile";
import KompasroosDesktop from "./kompasroosdesktop";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    good: green,
    bad: red,
    warn: yellow,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: true
  }
});


class KompasroosApp extends Component {

  constructor(props) {
    super(props);
    const {cookies} = this.props;

    const exitWeght = parseInt(cookies.get(C.COOKIE_EXITWEIGHT)) || C.EXITWEIGHT_DEFAULT;

    const cookieTotalJumps = cookies.get(C.COOKIE_TOTALJUMPS);
    const cookieJumpsLast12Months = cookies.get(C.COOKIE_JUMPSLAST12MONTHS);
    const cookieXbracedJumps = cookies.get(C.COOKIE_XBRACEDJUMPS);

    const totalJumps = parseInt(cookieTotalJumps) || C.TOTALJUMPS_DEFAULT;
    const jumpsLast12Months = parseInt(cookieJumpsLast12Months) || C.JUMPSLAST12MONTHS_DEFAULT;
    const xbracedJumps = parseInt(cookieXbracedJumps) || C.JUMPSXBRACED_DEFAULT;

    const showList = C.cookieSet(cookieTotalJumps) && C.cookieSet(cookieJumpsLast12Months) && C.cookieSet(cookieXbracedJumps);

    const browserLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
    let defaultLanguage = C.LANGUAGE_EN;
    switch (browserLanguage.toLowerCase().substring(0,2)) {
      case "nl":
        defaultLanguage = C.LANGUAGE_NL;
        break;
      case "fr":
        defaultLanguage = C.LANGUAGE_FR;
        break;
      case "de":
        defaultLanguage = C.LANGUAGE_DE;
        break;
    }
    console.log('langs ' + browserLanguage +  "  " + defaultLanguage + " " + navigator.languages + " |  " + navigator.language +  " |  "+ navigator.userLanguage);

    this.state = {
      filter: cookies.get(C.COOKIE_FILTER) || C.FILTER_ALL,
      sorting: cookies.get(C.COOKIE_SORTING) || C.SORTING_NAME,
      language: cookies.get(C.COOKIE_LANGUAGE) || defaultLanguage ,
      showWelcome: !showList,
      searchText: '',
      exitWeight: exitWeght,
      totalJumps: totalJumps,
      jumpsLast12Months: jumpsLast12Months,
      xbracedJumps: xbracedJumps,
      category: C.jumperCategory(totalJumps, jumpsLast12Months, xbracedJumps)
    };
  }


  updateLanguage = (event) => {
    const {cookies} = this.props;
    let language = event.target.value;
    cookies.set(C.COOKIE_LANGUAGE, language, C.cookieOptions());
    this.setState({language: language});
  };

  updateSorting = (event) => {
    //console.log('update sorting ' + event.target.value);
    const {cookies} = this.props;
    let sorting = event.target.value;
    cookies.set(C.COOKIE_SORTING, sorting, C.cookieOptions());
    this.setState({sorting: sorting});
  };

  updateFilter = (event) => {
    const {cookies} = this.props;
    let filter = event.target.value;
    cookies.set(C.COOKIE_FILTER, filter, C.cookieOptions());
    this.setState({filter: filter});
  };

  updateExitWeight = (event, exitweight) => {
    const {cookies} = this.props;
    cookies.set(C.COOKIE_EXITWEIGHT, exitweight, C.cookieOptions());
    this.setState({exitWeight: exitweight});
  };

  updateSearchText = (event) => {
    // console.log('update searchtext ' + event.target.value);
    this.setState({searchText: event.target.value})
  };

  updateJumps = (jumps) => {
    // console.log('update jumps: ' + JSON.stringify(jumps));
    const {cookies} = this.props;
    let totalJumps = jumps.totalJumps !== undefined ? jumps.totalJumps : this.state.totalJumps;
    let jumpsLast12Months = jumps.jumpsLast12Months !== undefined ? jumps.jumpsLast12Months : this.state.jumpsLast12Months;
    let xbracedJumps = jumps.xbracedJumps !== undefined ? jumps.xbracedJumps : this.state.xbracedJumps;
    let category = C.jumperCategory(totalJumps, jumpsLast12Months, xbracedJumps);
    let newState = jumps;
    newState.category = category;

    cookies.set(C.COOKIE_TOTALJUMPS, totalJumps, C.cookieOptions());
    cookies.set(C.COOKIE_JUMPSLAST12MONTHS, jumpsLast12Months, C.cookieOptions());
    cookies.set(C.COOKIE_XBRACEDJUMPS, xbracedJumps, C.cookieOptions());

    this.setState(newState);
  };

  welcomeDone = () => {
    this.setState({showWelcome: false})
  };


  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Media query="(max-width: 1280px)">
          {matches =>
            matches ? (
              <KompasroosMobile
                theme={theme}

                isMobile={true}

                showWelcome={this.state.showWelcome}
                welcomeDone={this.welcomeDone}

                language={this.state.language}
                filter={this.state.filter}
                sorting={this.state.sorting}

                updateLanguage={this.updateLanguage}
                updateFilter={this.updateFilter}
                updateSorting={this.updateSorting}

                searchText={this.state.searchText}
                onSearchChange={this.updateSearchText}

                totalJumps={this.state.totalJumps}
                jumpsLast12Months={this.state.jumpsLast12Months}
                xbracedJumps={this.state.xbracedJumps}
                updateJumps={this.updateJumps}
                category={this.state.category}
                exitWeight={this.state.exitWeight}
                updateExitWeight={this.updateExitWeight}
              />
            ) : (
              <KompasroosDesktop
                theme={theme}

                isMobile={false}

                showWelcome={this.state.showWelcome}
                welcomeDone={this.welcomeDone}

                language={this.state.language}
                filter={this.state.filter}
                sorting={this.state.sorting}

                updateLanguage={this.updateLanguage}
                updateFilter={this.updateFilter}
                updateSorting={this.updateSorting}

                searchText={this.state.searchText}
                onSearchChange={this.updateSearchText}

                totalJumps={this.state.totalJumps}
                jumpsLast12Months={this.state.jumpsLast12Months}
                xbracedJumps={this.state.xbracedJumps}
                updateJumps={this.updateJumps}
                category={this.state.category}
                exitWeight={this.state.exitWeight}
                updateExitWeight={this.updateExitWeight}
              />
            )}
        </Media>
      </MuiThemeProvider>
    );
  }
}

export default withCookies(KompasroosApp);
