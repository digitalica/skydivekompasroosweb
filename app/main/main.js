'use strict';

angular.module('myApp.main', ['ngRoute'])



    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: '/main/main.html',
            controller: 'MainCtrl'
        }).when('/main2', {
            templateUrl: '/main/main2.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$scope', '$cookies', '$modal', 'KompasroosData', 'translationService', function ($scope, $cookies, $modal, KompasroosData, translationService) {

        $scope.busyIndicator = true;
        translationService.getTranslation($scope, 'nl');

        $scope.saveSettings = function () {
            // Find next years
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 365);
            $cookies.putObject('skydivekompasroossettings', $scope.settings, {'expires': expireDate});
        };

        $scope.accExperienceOpen = true;
        $scope.accExperienceDisabled = false;

        $scope.canopyList = Array();

        // fake enum for acceptability
        $scope.ACC_ACCEPTABLE = 1;
        $scope.ACC_NEEDEDSIZENOTAVAILABLE = 2;
        $scope.ACC_CATEGORYTOOHIGH = 3;

        // constants
        $scope.WEIGHT_DEFAULT = 100;

        $scope.oneAtATime = true; // for the canopylist accordion

        $scope.sliderOptions = {};

        $scope.sliders = {};

        $scope.wingLoads = {
            'wl120': 0,
            'wl120a': false,
            'wl120l': false,
            'wl135': 0,
            'wl135a': false,
            'wl135l': false,
            'wl150': 0,
            'wl150a': false,
            'wl150l': false,
            'wl170': 0,
            'wl170a': false,
            'wl170l': false,
            'wl190': 0,
            'wl190a': false,
            'wl190l': false,
            'wl210': 0,
            'wl210a': false,
            'wl210l': false,
            'wl230': 0,
            'wl230a': false,
            'wl230l': false
        };

        $scope.settings = {
            'filter': 'filt_common',
            'sorting': 'sort_name',
            'jumpsLastYear': 25,
            'jumpsTotal': 100,
            'weight': 85,
            'category': 3,
            'minArea': null,
            'maxWingLoad': null,
            'language': 'nl'
        };

        $scope.setLanguage = function (lang) {
            // ignore unknown language choice, to be save (for example, from cookie)
            if (lang == 'en' || lang == 'nl') {
                //console.log('setting language' + lang);
                translationService.getTranslation($scope, lang);
                $scope.settings.language = lang;
                $scope.saveSettings();
            } else {
                console.log('error lang: ' + lang);
            }
        };

        if ($cookies.get('skydivekompasroossettings')) {
            $scope.settings = $cookies.getObject('skydivekompasroossettings');
            $scope.sliders.totalValue = $scope.settings.jumpsTotal;
            $scope.sliders.last12MonthsValue = $scope.settings.jumpsLastYear;
            $scope.sliders.weightValue = $scope.settings.weight;
            $scope.setLanguage($scope.settings.language);
        } else {
            $scope.sliders.totalValue = 100;
            $scope.sliders.last12MonthsValue = 25;
            $scope.sliders.weightValue = 85;
        }

        $scope.api = KompasroosData;
        $scope.api.get(function (data) {
            $scope.data = data;
            //console.log('data received '
            //    + Object.keys(data).length + ' '
            //    + Object.keys(data.canopies).length);
            $scope.updateWingLoads();
            $scope.updateCanopyList();
        });

        $scope.setBeginner = function () {
            $scope.sliders.totalValue = 5;
            $scope.sliders.last12MonthsValue = 5;
            $scope.updateTotal();
            $scope.updateLast12Months();
            $scope.updateCanopyList();
        };

        $scope.setIntermediate = function () {
            $scope.sliders.totalValue = 100;
            $scope.sliders.last12MonthsValue = 25;
            $scope.updateTotal();
            $scope.updateLast12Months();
            $scope.updateCanopyList();
        };

        $scope.setSkyGod = function () {
            $scope.sliders.totalValue = 1100;
            $scope.sliders.last12MonthsValue = 200;
            $scope.updateTotal();
            $scope.updateLast12Months();
            $scope.updateCanopyList();
        };


        $scope.updateTotal = function () {
            $scope.settings.jumpsTotal = $scope.sliders.totalValue;
            $scope.settings.category = $scope.jumperCategory($scope.settings.jumpsTotal, $scope.settings.jumpsLastYear);
            $scope.settings.minArea = $scope.minAreaBasedOnCategoryForDisplay($scope.settings.category);
            $scope.settings.maxWingLoad = $scope.maxWingLoadBasedOnCategoryForDisplay($scope.settings.category);
            if ($scope.settings.jumpsTotal < $scope.settings.jumpsLastYear) {
                $scope.settings.jumpsLastYear = $scope.settings.jumpsTotal;
                $scope.sliders.last12MonthsValue = $scope.settings.jumpsLastYear;
            }
            $scope.updateWingLoads();
            $scope.updateCanopyList();
            $scope.saveSettings();
        };

        $scope.updateLast12Months = function () {
            $scope.settings.jumpsLastYear = $scope.sliders.last12MonthsValue;
            $scope.settings.category = $scope.jumperCategory($scope.settings.jumpsTotal, $scope.settings.jumpsLastYear);
            $scope.settings.minArea = $scope.minAreaBasedOnCategoryForDisplay($scope.settings.category);
            $scope.settings.maxWingLoad = $scope.maxWingLoadBasedOnCategoryForDisplay($scope.settings.category);
            if ($scope.settings.jumpsTotal < $scope.settings.jumpsLastYear) {
                $scope.settings.jumpsTotal = $scope.settings.jumpsLastYear;
                $scope.sliders.totalValue = $scope.settings.jumpsTotal;
            }
            $scope.updateWingLoads();
            $scope.updateCanopyList();
            $scope.saveSettings();
        };

        $scope.updateWeight = function () {
            $scope.settings.weight = $scope.sliders.weightValue;
            $scope.updateWingLoads();
            $scope.updateCanopyList();
            $scope.saveSettings();
        };


        $scope.updateWingLoads = function () {
            var minArea = $scope.minAreaBasedOnCategory($scope.settings.category);
            var maxLoad = $scope.maxWingLoadBasedOnCategory($scope.settings.category);
            var weightInLbs = $scope.kgToLbs($scope.settings.weight);
            //console.log("updatewl " + minArea.toString() + typeof minArea + " " + maxLoad.toString()+ typeof maxLoad);
            $scope.wingLoads.wl120 = $scope.getWingloadFor(120, weightInLbs);
            $scope.wingLoads.wl120a = 120 >= minArea;
            $scope.wingLoads.wl120l = maxLoad >= $scope.wingLoads.wl120;
            $scope.wingLoads.wl120ca = $scope.wlClassA($scope.wingLoads.wl120a, $scope.wingLoads.wl120l);
            $scope.wingLoads.wl120cl = $scope.wlClassL($scope.wingLoads.wl120a, $scope.wingLoads.wl120l);
            //console.log("120: " + $scope.wingLoads.wl120a + " "+ $scope.wingLoads.wl120l);

            $scope.wingLoads.wl135 = $scope.getWingloadFor(135, weightInLbs);
            $scope.wingLoads.wl135a = 135 >= minArea;
            $scope.wingLoads.wl135l = maxLoad >= $scope.wingLoads.wl135;
            $scope.wingLoads.wl135ca = $scope.wlClassA($scope.wingLoads.wl135a, $scope.wingLoads.wl135l);
            $scope.wingLoads.wl135cl = $scope.wlClassL($scope.wingLoads.wl135a, $scope.wingLoads.wl135l);
            //console.log("135: " + $scope.wingLoads.wl135a + " "+ $scope.wingLoads.wl135l);

            $scope.wingLoads.wl150 = $scope.getWingloadFor(150, weightInLbs);
            $scope.wingLoads.wl150a = 150 >= minArea;
            $scope.wingLoads.wl150l = maxLoad >= $scope.wingLoads.wl150;
            $scope.wingLoads.wl150ca = $scope.wlClassA($scope.wingLoads.wl150a, $scope.wingLoads.wl150l);
            $scope.wingLoads.wl150cl = $scope.wlClassL($scope.wingLoads.wl150a, $scope.wingLoads.wl150l);
            //console.log("150: " + $scope.wingLoads.wl150a + " "+ $scope.wingLoads.wl150l);

            $scope.wingLoads.wl170 = $scope.getWingloadFor(170, weightInLbs);
            $scope.wingLoads.wl170a = 170 >= minArea;
            $scope.wingLoads.wl170l = maxLoad >= $scope.wingLoads.wl170;
            $scope.wingLoads.wl170ca = $scope.wlClassA($scope.wingLoads.wl170a, $scope.wingLoads.wl170l);
            $scope.wingLoads.wl170cl = $scope.wlClassL($scope.wingLoads.wl170a, $scope.wingLoads.wl170l);
            //console.log("170: " + $scope.wingLoads.wl170a + " "+ $scope.wingLoads.wl170l);

            $scope.wingLoads.wl190 = $scope.getWingloadFor(190, weightInLbs);
            $scope.wingLoads.wl190a = 190 >= minArea;
            $scope.wingLoads.wl190l = maxLoad >= $scope.wingLoads.wl190;
            $scope.wingLoads.wl190ca = $scope.wlClassA($scope.wingLoads.wl190a, $scope.wingLoads.wl190l);
            $scope.wingLoads.wl190cl = $scope.wlClassL($scope.wingLoads.wl190a, $scope.wingLoads.wl190l);
            //console.log("190: " + $scope.wingLoads.wl190a + " "+ $scope.wingLoads.wl190l);

            $scope.wingLoads.wl210 = $scope.getWingloadFor(210, weightInLbs);
            $scope.wingLoads.wl210a = 210 >= minArea;
            $scope.wingLoads.wl210l = maxLoad >= $scope.wingLoads.wl210;
            $scope.wingLoads.wl210ca = $scope.wlClassA($scope.wingLoads.wl210a, $scope.wingLoads.wl210l);
            $scope.wingLoads.wl210cl = $scope.wlClassL($scope.wingLoads.wl210a, $scope.wingLoads.wl210l);
            //console.log("210: " + $scope.wingLoads.wl210a + " "+ $scope.wingLoads.wl210l);

            $scope.wingLoads.wl230 = $scope.getWingloadFor(230, weightInLbs);
            $scope.wingLoads.wl230a = 230 >= minArea;
            $scope.wingLoads.wl230l = maxLoad >= $scope.wingLoads.wl230;
            $scope.wingLoads.wl230ca = $scope.wlClassA($scope.wingLoads.wl230a, $scope.wingLoads.wl230l);
            $scope.wingLoads.wl230cl = $scope.wlClassL($scope.wingLoads.wl230a, $scope.wingLoads.wl230l);
            //console.log("230: " + $scope.wingLoads.wl230a + " "+ $scope.wingLoads.wl230l);

        };

        $scope.wlClassA = function (blnA, blnL) {
            if (!blnA) {
                return "bg-danger";
            } else if (blnL) {
                return "bg-success"
            } else {
                return "bg-warning"
            }
        };

        $scope.wlClassL = function (blnA, blnL) {
            if (!blnL) {
                return "bg-danger";
            } else if (blnA) {
                return "bg-success"
            } else {
                return "bg-warning"
            }
        };

        $scope.getWingloadFor = function (area, weightInLbs) {
            var wingload = weightInLbs / area;
            return wingload.toFixed(2);
        };

        $scope.currentCategory = 0;

        $scope.sliderOptions.totalMin = 1;
        $scope.sliderOptions.totalMax = 1100;
        $scope.sliderOptions.totalStep = 1;

        $scope.sliderOptions.last12MonthsMin = 0;
        $scope.sliderOptions.last12MonthsMax = 125;
        $scope.sliderOptions.last12MonthsStep = 1;

        $scope.sliderOptions.weightMin = 50;
        $scope.sliderOptions.weightMax = 140;
        $scope.sliderOptions.weighttep = 1;


        $scope.showalert = function (text) {
            alert(text);
        };

        $scope.incTotal = function (amount) {
            var newTotalValue = $scope.sliders.totalValue + amount;
            if (newTotalValue < $scope.sliderOptions.totalMin) {
                newTotalValue = $scope.sliderOptions.totalMin;
            }
            if (newTotalValue > $scope.sliderOptions.totalMax) {
                newTotalValue = $scope.sliderOptions.totalMax;
            }
            $scope.sliders.totalValue = newTotalValue;
            $scope.updateTotal();
        };

        $scope.incLast12Months = function (amount) {
            var newLast12MonthsValue = $scope.sliders.last12MonthsValue + amount;
            if (newLast12MonthsValue < $scope.sliderOptions.last12MonthsMin) {
                newLast12MonthsValue = $scope.sliderOptions.last12MonthsMin;
            }
            if (newLast12MonthsValue > $scope.sliderOptions.last12MonthsMax) {
                newLast12MonthsValue = $scope.sliderOptions.last12MonthsMax;
            }
            $scope.sliders.last12MonthsValue = newLast12MonthsValue;
            $scope.updateLast12Months();
        };

        $scope.incWeight = function (amount) {
            var newWeightValue = $scope.sliders.weightValue + amount;
            if (newWeightValue < $scope.sliderOptions.weightMin) {
                newWeightValue = $scope.sliderOptions.weightMin;
            }
            if (newWeightValue > $scope.sliderOptions.weightMax) {
                newWeightValue = $scope.sliderOptions.weightMax;
            }
            $scope.sliders.weightValue = newWeightValue;
            $scope.updateWeight();
        };

        $scope.openAbout = function (size) {
            var lang = $scope.settings.language;

            // to be sure
            if (lang != 'nl' && lang != 'en') {
                lang = 'nl';
            }

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'aboutContent_' + lang + '.html',
                controller: 'AboutCtrl',
                size: size
            });

            modalInstance.result.then(function () {
                //console.log('closed');
            }, function () {
                //console.log('closed2');
            });

        };


        // actual tested calculations

        $scope.WEIGHT_FACTOR_KG_TO_LBS = 2.20462262185;
        $scope.MINIMUMTOTALJUMPS = [0, 0, 25, 100, 400, 700, 1000];
        $scope.MINIMUMJUMPSLAST12MONTHS = [0, 0, 10, 25, 50, 100, 0];

        $scope.kgToLbs = function (kg) {
            var lbs = Math.round(kg * $scope.WEIGHT_FACTOR_KG_TO_LBS);
            return lbs;
        };

        $scope.wingLoad = function (area, weightInKg) {
            var weightInLbs = $scope.kgToLbs($weightInKg);
            var wingload = weightInLbs / area;
            return wingload;
        };

        $scope.jumperCategory = function (totalJumps, jumpsLast12Months) {
            // TODO: below can be done in a simple loop
            var categoryBasedOnTotalJumps = 0;
            if (totalJumps < $scope.MINIMUMTOTALJUMPS[2]) {
                categoryBasedOnTotalJumps = 1;
            } else if (totalJumps < $scope.MINIMUMTOTALJUMPS[3]) {
                categoryBasedOnTotalJumps = 2;
            } else if (totalJumps < $scope.MINIMUMTOTALJUMPS[4]) {
                categoryBasedOnTotalJumps = 3;
            } else if (totalJumps < $scope.MINIMUMTOTALJUMPS[5]) {
                categoryBasedOnTotalJumps = 4;
            } else if (totalJumps < $scope.MINIMUMTOTALJUMPS[6]) {
                categoryBasedOnTotalJumps = 5;
            } else {
                categoryBasedOnTotalJumps = 6;
            }

            var categoryBasedOnJumpsLast12Months = 0;
            if (jumpsLast12Months < $scope.MINIMUMJUMPSLAST12MONTHS[2]) {
                categoryBasedOnJumpsLast12Months = 1;
            } else if (jumpsLast12Months < $scope.MINIMUMJUMPSLAST12MONTHS[3]) {
                categoryBasedOnJumpsLast12Months = 2;
            } else if (jumpsLast12Months < $scope.MINIMUMJUMPSLAST12MONTHS[4]) {
                categoryBasedOnJumpsLast12Months = 3;
            } else if (jumpsLast12Months < $scope.MINIMUMJUMPSLAST12MONTHS[5]) {
                categoryBasedOnJumpsLast12Months = 4;
            } else if (jumpsLast12Months < $scope.MINIMUMJUMPSLAST12MONTHS[6]) {
                categoryBasedOnJumpsLast12Months = 5;
            } else {
                categoryBasedOnJumpsLast12Months = 6;
            }

            var jumperCategory;
            if (categoryBasedOnTotalJumps == 6)
                jumperCategory = 6; // if 1000 jumps, no recent exp needed.
            else
                jumperCategory = Math.min(categoryBasedOnTotalJumps,
                    categoryBasedOnJumpsLast12Months);
            return jumperCategory;
        };

        $scope.minAreaBasedOnCategory = function (jumperCategory) {
            var minAreaBasedOnCategory = 999; // SHOULD NEVER BE RETURNED

            switch (jumperCategory) {
                case 1:
                    minAreaBasedOnCategory = 170;
                    break;
                case 2:
                    minAreaBasedOnCategory = 170;
                    break;
                case 3:
                    minAreaBasedOnCategory = 150;
                    break;
                case 4:
                    minAreaBasedOnCategory = 135;
                    break;
                case 5:
                    minAreaBasedOnCategory = 120;
                    break;
                case 6:
                    minAreaBasedOnCategory = 0; // NO LIMIT
                    break;
            }
            return minAreaBasedOnCategory;
        };

        $scope.minAreaBasedOnCategoryForDisplay = function (jumperCategory) {
            var minArea = $scope.minAreaBasedOnCategory(jumperCategory);
            if (minArea == 0) {
                minArea = "geen limiet";
            } else {
                minArea = minArea.toString() + " sqft";
            }
            return minArea;
        }

        $scope.maxWingLoadBasedOnCategory = function (jumperCategory) {
            var maxWingload = 9999;

            switch (jumperCategory) {
                case 1:
                    maxWingload = 1.1;
                    break;
                case 2:
                    maxWingload = 1.1;
                    break;
                case 3:
                    maxWingload = 1.3;
                    break;
                case 4:
                    maxWingload = 1.5;
                    break;
                case 5:
                    maxWingload = 1.7;
                    break;
                case 6:
                    // no limits
                    break;
            }
            return maxWingload;
        };


        $scope.maxWingLoadBasedOnCategoryForDisplay = function (jumperCategory) {
            var maxWingLoad = $scope.maxWingLoadBasedOnCategory(jumperCategory);
            if (maxWingLoad == 9999) {
                maxWingLoad = "geen limiet";
            } else {
                maxWingLoad = maxWingLoad.toString() + " lbs/sqft";
            }
            return maxWingLoad;
        };

        $scope.minArea = function (jumperCategory, exitWeightInKg) {
            var maxWingload = $scope.maxWingLoadBasedOnCategory(jumperCategory);
            var minAreaBasedOnCategory = $scope.minAreaBasedOnCategory(jumperCategory);
            if (minAreaBasedOnCategory == 0) { // means there is NO LIMIT
                return minAreaBasedOnCategory;
            }
            var minAreaBasedOnExitWeight = Math.round($scope.kgToLbs(exitWeightInKg) / maxWingload);
            var minArea = Math.max(minAreaBasedOnCategory, minAreaBasedOnExitWeight);
            return minArea;
        };


        $scope.acceptability = function (canopy, jumperCategory, exitWeightInKg) {
            var canopyCategory = canopy.category;
            if (!canopyCategory) {
                canopyCategory = 6; // unknown cat, works as 6.
            }
            if (jumperCategory < canopyCategory)
                return $scope.ACC_CATEGORYTOOHIGH; // not acceptable
            if (canopy.maxsize != "" && canopy.maxsize != null)
                if (parseInt(canopy.maxsize) < $scope.minArea(
                        jumperCategory, exitWeightInKg))
                    return $scope.ACC_NEEDEDSIZENOTAVAILABLE;
            return $scope.ACC_ACCEPTABLE;
        };

        $scope.updateCanopyList = function () {
            if (!$scope.data) {
                return;
            }
            var newCanopyList = new Array();
            for (var i = 0; i < $scope.data.canopies.length; i++) {
                var canopy = $scope.data.canopies[i];

                // filter
                var showThisCanopy = true;
                switch ($scope.settings.filter) {
                    case 'filter_all': // ok
                        break;
                    case 'filter_common':
                        showThisCanopy = canopy.commontype == "1";
                        break;
                    case 'filter_category':
                        showThisCanopy = canopy.commontype &&
                            canopy.category >= $scope.settings.category - 1 &&
                            canopy.category <= $scope.settings.category + 1;
                        break;
                }
                if (!showThisCanopy) {
                    continue;
                }

                //set the sortkey
                switch ($scope.settings.sorting) {
                    case 'sort_name':
                        canopy.sortKey = canopy.name;
                        break;
                    case 'sort_category':
                        canopy.sortKey = String(canopy.category) + canopy.manufacturer.name + canopy.name;
                        break;
                    case 'sort_manufacturer':
                        canopy.sortKey = canopy.manufacturer.name + canopy.name;
                        break;
                }

                var acceptability = $scope.acceptability(canopy, $scope.settings.category, $scope.settings.weight);
                switch (acceptability) {
                    case $scope.ACC_ACCEPTABLE:
                        canopy.class = "canopylistcanopy bg-success";
                        break;
                    case $scope.ACC_NEEDEDSIZENOTAVAILABLE:
                        canopy.class = "canopylistcanopy bg-warning";
                        break;
                    case $scope.ACC_CATEGORYTOOHIGH:
                        canopy.class = "canopylistcanopy bg-danger";
                        break;

                }


                canopy.listLine1 = canopy.name;
                canopy.listLine2 = canopy.manufacturer.name;
                newCanopyList.push(canopy);
            }

            // now sort the new canopy list
            newCanopyList.sort(function compare(a, b) {
                if (a.sortKey < b.sortKey)
                    return -1;
                if (a.sortKey > b.sortKey)
                    return 1;
                return 0;
            });
            // then add headers if needed.
            var newCanopyListWithHeaders = new Array();
            var lastkey = null;
            for (var i = 0; i < newCanopyList.length; i++) {
                canopy = newCanopyList[i];
                switch ($scope.settings.sorting) {
                    case 'sort_name': // no headers needed
                        break;
                    case 'sort_category':
                        if (canopy.category != lastkey) {
                            lastkey = canopy.category;
                            newCanopyListWithHeaders.push($scope.createCanopyListHeader("Categorie: " + canopy.category));
                        }
                        canopy.sortKey = String(canopy.category) + canopy.manufacturer.name + canopy.name;
                        break;
                    case 'sort_manufacturer':
                        if (canopy.manufacturer.id != lastkey) {
                            lastkey = canopy.manufacturer.id;
                            newCanopyListWithHeaders.push($scope.createCanopyListHeader(canopy.manufacturer.name));
                        }
                        break;
                }
                newCanopyListWithHeaders.push(canopy);
            }

            $scope.canopyList = newCanopyListWithHeaders;
            $scope.busyIndicator = false;
        };

        $scope.createCanopyListHeader = function (headerText) {
            var headerObject = {};
            headerObject.class = "canopylistheader";
            headerObject.listHeader = headerText;
            headerObject.accIsOpen = false;
            headerObject.accIsDisabled = true;
            return headerObject;
        };

        $scope.setFilterAll = function () {
            $scope.settings.filter = 'filter_all';
            $scope.updateCanopyList();
        };

        $scope.setFilterCommon = function () {
            $scope.settings.filter = 'filter_common';
            $scope.updateCanopyList();
        };

        $scope.setFilterCategory = function () {
            $scope.settings.filter = 'filter_category';
            $scope.updateCanopyList();
        };

        $scope.setSortName = function () {
            $scope.settings.sorting = 'sort_name';
            $scope.updateCanopyList();
        };

        $scope.setSortManufacturer = function () {
            $scope.settings.sorting = 'sort_manufacturer';
            $scope.updateCanopyList();
        };

        $scope.setSortCategory = function () {
            $scope.settings.sorting = 'sort_category';
            $scope.updateCanopyList();
        };

    }]);


angular.module('myApp.main').controller('AboutCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

    $scope.closeAbout = function () {
        $modalInstance.close();
    };


}]);