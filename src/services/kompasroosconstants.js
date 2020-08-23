export default {

  COOKIEMAXAGE: 365 * 24 * 60 * 60 * 1000,

  MAXWIDTH: "800px",

  WEIGHT_FACTOR_KG_TO_LBS: 2.20462262185,

  FILTER_ALL: "all",
  FILTER_COMMON: "common",
  FILTER_AROUND: "around",

  SORTING_NAME: "name",
  SORTING_MANUFACTURER: "manufacturer",
  SORTING_CATEGORY: "category",

  LANGUAGE_NL: "nl",
  LANGUAGE_EN: "en",
  LANGUAGE_DE: "de",
  LANGUAGE_FR: "fr",

  MINIMUMTOTALJUMPS: [0, 0, 25, 100, 400, 700, 1000, 1200],
  MINIMUMJUMPSLAST12MONTHS: [0, 0, 10, 25, 50, 75, 100, 200],

  MINAREA: [0, 170, 170, 150, 135, 120, 0, 0],
  MAXWINGLOAD: [0, 1.1, 1.1, 1.3, 1.5, 1.7, 0, 0],

  EXITWEIGHT_MIN: 50,
  EXITWEIGHT_MAX: 140,
  EXITWEIGHT_DEFAULT: 85,

  TOTALJUMPS_MIN: 1,
  TOTALJUMPS_MAX: 1250,
  TOTALJUMPS_DEFAULT: 100,

  JUMPSLAST12MONTHS_MIN: 0,
  JUMPSLAST12MONTHS_MAX: 125,
  JUMPSLAST12MONTHS_DEFAULT: 25,

  JUMPSXBRACED_MIN: 0,
  JUMPSXBRACED_MAX: 250,
  JUMPSXBRACED_DEFAULT: 0,

  BGCOLORSHADE: 200,
  BGICONCOLORSHADE: 500,

  ACC_CATEGORYTOOHIGH: 'categorytoohigh',
  ACC_NEEDEDSIZENOTAVAILABLE: 'neededsizenotavailable',
  ACC_ACCEPTABLE: 'acceptable',

  COOKIE_FILTER: 'filter',
  COOKIE_SORTING: 'sorting',
  COOKIE_LANGUAGE: 'language',
  COOKIE_EXITWEIGHT: 'exitweight',
  COOKIE_TOTALJUMPS: 'totaljumps',
  COOKIE_JUMPSLAST12MONTHS: 'jumpslast12months',
  COOKIE_XBRACEDJUMPS: 'xbracedjumps',


  GITHUB_URL: "https://github.com/digitalica/skydivekompasroosweb",
  REGLEMENTEN_URL: "https://www.parachute.nl/bevoegdhedenregl.html",
  KOMPASROOS_URL: "https://www.parachute.nl/fileadmin/knvvlpa_upload/pdf/kompasroos_2016.pdf",
  BVR_URL: "https://www.parachute.nl/fileadmin/knvvlpa_upload/pdf/BVR_2018_inclusief_wijzigingen.pdf",
  BVR_BIJLAGE_A_URL: "https://www.parachute.nl/fileadmin/knvvlpa_upload/pdf/BVR_bijlage_A_2018.pdf",
  BVR_BIJLAGE_B_URL: "https://www.parachute.nl/fileadmin/knvvlpa_upload/pdf/BVR_bijlage_B_versie_20200622.pdf",


  cookieOptions() {
    return {
      path: '/',
      expires: new Date(Date.now() + this.COOKIEMAXAGE),
      sameSite: 'Lax'
    }
  },

  kgToLbsRounded(kg) {
    return Math.round(this.kgToLbsExact(kg));
  },

  kgToLbsExact(kg) {
    return kg * this.WEIGHT_FACTOR_KG_TO_LBS;
  },

  getWingloadFor(area, weightInLbs) {
    if (!area) {
      return ''; // illegal value
    }
    let wingload = weightInLbs / area;
    return wingload.toFixed(2);
  },

  cookieSet(cookie) {
    return !!(cookie || cookie === "0");
  },

  isCrossBracedRelevant(totalJumps, jumpsLast12Months) {
    return totalJumps >= 900 && jumpsLast12Months >= 90;
  },

  filenameFromPath(path) {
    return path.replace(/.*\//, '');
  },

  minAreaBasedOnCategoryForDisplay(jumperCategory, nolimittext) {
    var minArea = this.MINAREA[jumperCategory];
    if (!minArea) {
      minArea = nolimittext;
    } else {
      minArea = minArea.toString() + " sqft";
    }
    return minArea;
  },

  maxWingLoadBasedOnCategoryForDisplay(jumperCategory, nolimittext) {
    var maxWingLoad = this.MAXWINGLOAD[jumperCategory];
    if (!maxWingLoad) {
      maxWingLoad = nolimittext;
    } else {
      maxWingLoad = maxWingLoad.toString() + " lbs/sqft";
    }
    return maxWingLoad;
  },

  effectiveMinAreaBasedOnCategoryAndExitWeight(jumperCategory, exitWeightInKg) {
    let minArea = this.MINAREA[jumperCategory];
    let maxWingLoad = this.MAXWINGLOAD[jumperCategory];
    if (!minArea || !maxWingLoad) {
      return null;
    }
    let effectiveMinArea = Math.round(Math.max(minArea, this.kgToLbsExact(exitWeightInKg) / maxWingLoad));
    if (effectiveMinArea - minArea < 3) {
      return null;
    }
    return effectiveMinArea;
  },

  jumperCategory(totalJumps, jumpsLast12Months, xbracedjumps) {
    // TODO: below can be done in a simple loop
    let categoryBasedOnTotalJumps = 0;
    if (totalJumps < this.MINIMUMTOTALJUMPS[2]) {
      categoryBasedOnTotalJumps = 1;
    } else if (totalJumps < this.MINIMUMTOTALJUMPS[3]) {
      categoryBasedOnTotalJumps = 2;
    } else if (totalJumps < this.MINIMUMTOTALJUMPS[4]) {
      categoryBasedOnTotalJumps = 3;
    } else if (totalJumps < this.MINIMUMTOTALJUMPS[5]) {
      categoryBasedOnTotalJumps = 4;
    } else if (totalJumps < this.MINIMUMTOTALJUMPS[6]) {
      categoryBasedOnTotalJumps = 5;
    } else {
      categoryBasedOnTotalJumps = 6;
    }

    let categoryBasedOnJumpsLast12Months = 0;
    if (jumpsLast12Months < this.MINIMUMJUMPSLAST12MONTHS[2]) {
      categoryBasedOnJumpsLast12Months = 1;
    } else if (jumpsLast12Months < this.MINIMUMJUMPSLAST12MONTHS[3]) {
      categoryBasedOnJumpsLast12Months = 2;
    } else if (jumpsLast12Months < this.MINIMUMJUMPSLAST12MONTHS[4]) {
      categoryBasedOnJumpsLast12Months = 3;
    } else if (jumpsLast12Months < this.MINIMUMJUMPSLAST12MONTHS[5]) {
      categoryBasedOnJumpsLast12Months = 4;
    } else if (jumpsLast12Months < this.MINIMUMJUMPSLAST12MONTHS[6]) {
      categoryBasedOnJumpsLast12Months = 5;
    } else {
      categoryBasedOnJumpsLast12Months = 6;
    }

    // console.log('cat calc: ' + totalJumps + ' ' + jumpsLast12Months + ' ' + xbracedjumps + ' ' + categoryBasedOnTotalJumps + ' ' + categoryBasedOnJumpsLast12Months);
    let jumperCategory = Math.min(categoryBasedOnTotalJumps, categoryBasedOnJumpsLast12Months);

    // Ok. onderstaande is beetje tricky: de 100 sprongen in laatste 12 maanden moeten aan xbraced zijn, dat checken we niet...
    if (jumperCategory === 6 && xbracedjumps >= 200) {
      jumperCategory = 7;
    }

    return jumperCategory;
  },

  acceptability(canopy, jumperCategory, exitWeightInKg) {
    // console.log('acceptability: ' + jumperCategory + ' ' + exitWeightInKg + ' ' + canopy.name);
    let canopyCategory = canopy.calculationcategory;
    if (jumperCategory < canopyCategory) {
      return this.ACC_CATEGORYTOOHIGH; // not acceptable
    }
    if (canopy.maxsize !== "" && canopy.maxsize != null) {
      let maxLoad = this.MAXWINGLOAD[jumperCategory];
      if (maxLoad) {
        let weightInLbs = this.kgToLbsExact(exitWeightInKg);
        let wingLoad = this.getWingloadFor(canopy.maxsize, weightInLbs);
        if (wingLoad > maxLoad) {
          // console.log('acceptablity ' + canopy.maxsize + ' ' + wingLoad + ' ' + maxLoad);
          return this.ACC_NEEDEDSIZENOTAVAILABLE;
        }
      }
    }
    return this.ACC_ACCEPTABLE;
  },

  withoutClasses(propsObject) {
    const {classes, ...otherkeys} = propsObject
    return otherkeys
  },

  isValidLanguage(language) {
    return /^(en|de|fr|nl)$/.test(language)
  },

  isJustLanguagePath(path) {
    return /^\/\w\w\/?$/.test(path)
  }

};
