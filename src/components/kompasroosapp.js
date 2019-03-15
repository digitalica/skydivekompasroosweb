import React, {Component} from 'react';
import {withCookies} from 'react-cookie';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {indigo, pink, red, green, yellow} from '@material-ui/core/colors';

import {Route, BrowserRouter as Router} from 'react-router-dom'

import Header from './header'
import Footer from './footer'
import Main from './main'
import About from './about'
import Settings from './settings'
import SetJumps from './setjumps'
import SetWeight from './setweight'
import Canopy from './canopy'
import Manufacturer from './manufacturer'

import C from "./kompasroosconstants";

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

    this.state = {
      filter: cookies.get(C.COOKIE_FILTER) || C.FILTER_ALL,
      sorting: cookies.get(C.COOKIE_SORTING) || C.SORTING_NAME,
      language: cookies.get(C.COOKIE_LANGUAGE) || C.LANGUAGE_EN,
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
      <Router>
        <MuiThemeProvider theme={theme}>
          <div>
            <Header
              language={this.state.language}
              searchText={this.state.searchText}
              onSearchChange={this.updateSearchText}
              showWelcome={this.state.showWelcome}
            />
            <Route exact path="/" render={(props) => <Main
              {...props}
              category={this.state.category}
              exitWeight={this.state.exitWeight}
              filter={this.state.filter}
              language={this.state.language}
              sorting={this.state.sorting}
              searchText={this.state.searchText}
              jumpsLast12Months={this.state.jumpsLast12Months}
              totalJumps={this.state.totalJumps}
              updateJumps={this.updateJumps}
              xbracedJumps={this.state.xbracedJumps}
              showWelcome={this.state.showWelcome}
              welcomeDone={this.welcomeDone}
            />}
            />
            <Route path="/about" render={(props) => <About
              language={this.state.language}
            />}
            />
            <Route path="/settings" render={(props) => <Settings
              {...props}
              category={this.state.category}
              filter={this.state.filter}
              language={this.state.language}
              sorting={this.state.sorting}
              updateSorting={this.updateSorting}
              updateFilter={this.updateFilter}
              updateLanguage={this.updateLanguage}
            />}
            />
            <Route path="/setjumps" render={(props) => <SetJumps
              category={this.state.category}
              jumpsLast12Months={this.state.jumpsLast12Months}
              language={this.state.language}
              totalJumps={this.state.totalJumps}
              updateJumps={this.updateJumps}
              xbracedJumps={this.state.xbracedJumps}
              showWelcome={this.state.showWelcome}
              welcomeDone={this.welcomeDone}
            />}
            />
            <Route path="/setweight" render={(props) => <SetWeight
              category={this.state.category}
              exitWeight={this.state.exitWeight}
              language={this.state.language}
              updateExitWeight={this.updateExitWeight}
            />}
            />
            <Route path="/canopy/:canopySlug" render={(props) => <Canopy
              category={this.state.category}
              exitWeight={this.state.exitWeight}
              slug={props.match.params['canopySlug']}
              language={this.state.language}
            />}
            />
            <Route path="/manufacturer/:manufacturerSlug" render={(props) => <Manufacturer
              slug={props.match.params.manufacturerSlug}
              language={this.state.language}
              category={this.state.category}
              exitWeight={this.state.exitWeight}
            />}
            />
            <Footer
              language={this.state.language}
              exitWeight={this.state.exitWeight}
              totalJumps={this.state.totalJumps}
              jumpsLast12Months={this.state.jumpsLast12Months}
              xbracedJumps={this.state.xbracedJumps}
              showWelcome={this.state.showWelcome}
            />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default withCookies(KompasroosApp);
