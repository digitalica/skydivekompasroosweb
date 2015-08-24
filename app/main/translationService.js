'use strict';

/* Services */

var translationServices = angular.module('translationServices', []);

//console.log("start loading service");
translationServices.service('translationService', function () {
    this.getTranslation = function ($scope, language) {
        var nl = {};
        var en = {};

        nl.LOADING = 'Parachute gegevens laden...';
        en.LOADING = 'Loading canopy data...';

        nl.INTRO = 'Stel uw skydive ervaring en exitgewicht in, en zie welke parachutes geschikt zijn';
        en.INTRO = 'Set your skydiving experience and exit weight and see what parachutes are accepable according to Dutch regulations';

        nl.CLOSE = 'Sluit';
        en.CLOSE = 'Close';

        // menu options
        nl.ABOUT = 'Over';
        en.ABOUT = 'About';
        nl.FILTER = 'Filter';
        en.FILTER = 'Filter';
        nl.FILTER_ALL = 'Alles';
        en.FILTER_ALL = 'All';
        nl.FILTER_COMMON = 'Gangbaar';
        en.FILTER_COMMON = 'Common';
        nl.FILTER_CAT = 'Rond categorie';
        en.FILTER_CAT = 'Around category';
        nl.SORT = 'Sortering';
        en.SORT = 'Sort';
        nl.SORT_NAME = 'Naam';
        en.SORT_NAME = 'Name';
        nl.SORT_MANUFACTURER = 'Fabrikant';
        en.SORT_MANUFACTURER = 'Manufacturer';
        nl.SORT_CAT = 'Categorie';
        en.SORT_CAT = 'Category';

        // experience box
        nl.EXPERIENCE = 'Ervaring';
        en.EXPERIENCE = 'Experience';
        nl.SLIDER_JUMPSTOTAL_L = 'Aantal sprongen totaal';
        en.SLIDER_JUMPSTOTAL_L = 'Total number of jumps';
        nl.SLIDER_JUMPSTOTAL_S = 'Totaal';
        en.SLIDER_JUMPSTOTAL_S = 'Totaal';
        nl.SLIDER_JUMPSLAST12MONTHS_L = 'Aantal sprongen laatste jaar';
        en.SLIDER_JUMPSLAST12MONTHS_L = 'Number of jumps last year';
        nl.SLIDER_JUMPSLAST12MONTHS_S = 'Laatste jaar';
        en.SLIDER_JUMPSLAST12MONTHS_S = 'Last year';
        nl.SLIDER_WEIGHT = 'Exitgewicht';
        en.SLIDER_WEIGHT = 'Exit weight';
        nl.WINGLOAD_TABLE = 'Wingload in lbs/sqft';
        en.WINGLOAD_TABLE = 'Wingload in lbs/sqft';

        nl.RESULT_CAT = 'Je valt in categorie';
        en.RESULT_CAT = 'Your category is';
        nl.RESULT_ALLOWED_L = 'Toegestane parachutes';
        en.RESULT_ALLOWED_L = 'Allowed canopies';
        nl.RESULT_ALLOWED_S = 'Toegestaan';
        en.RESULT_ALLOWED_S = 'Allowed';
        nl.RESULT_MAXCAT = 'Maximaal categorie';
        en.RESULT_MAXCAT = 'At most category';
        nl.RESULT_MINAREA_L = 'Minimale oppervlakte';
        en.RESULT_MINAREA_L = 'Minimum area';
        nl.RESULT_MINAREA_S = 'Minimaal';
        en.RESULT_MINAREA_S = 'Minimum';
        nl.RESULT_MAXWINGLOAD_L = 'Maximale wingload';
        en.RESULT_MAXWINGLOAD_L = 'Maximum wingload';
        nl.RESULT_MAXWINGLOAD_S = 'Maximaal';
        en.RESULT_MAXWINGLOAD_S = 'Maximum';

        nl.RESULT_BEGINNER = 'Beginner';
        en.RESULT_BEGINNER = 'Beginner';
        nl.RESULT_INTERMEDIATE = 'Ervaren';
        en.RESULT_INTERMEDIATE = 'Experienced';
        nl.RESULT_SKYGOD = 'Sky god';
        en.RESULT_SKYGOD = 'Sky god';

        // canopy list
        nl.LIST_NAME = 'Naam'; // voor search
        en.LIST_NAME = 'Name'; // voor search
        nl.LIST_CATEGORY = 'Categorie'; // voor search
        en.LIST_CATEGORY = 'Category'; // voor search
        nl.LIST_MANUFACTURER = 'Fabrikant';
        en.LIST_MANUFACTURER = 'Manufacturer';
        nl.LIST_EXPERIENCENEEDED_L = 'Ervaring nodig';
        en.LIST_EXPERIENCENEEDED_L = 'Experience needed';
        nl.LIST_EXPERIENCENEEDED_S = 'Nodig';
        en.LIST_EXPERIENCENEEDED_S = 'Needed';
        nl.LIST_CELLS = 'Cellen';
        en.LIST_CELLS = 'Cells';
        nl.LIST_FIRSTYEAR_L = 'Eerste jaar productie';
        en.LIST_FIRSTYEAR_L = 'First year of production';
        nl.LIST_FIRSTYEAR_S = 'Eerste jaar';
        en.LIST_FIRSTYEAR_S = 'First year';
        nl.LIST_LASTYEAR_L = 'Laatste jaar productie';
        en.LIST_LASTYEAR_L = 'Last year of production';
        nl.LIST_LASTYEAR_S = 'Laatste jaar';
        en.LIST_LASTYEAR_S = 'Last year';
        nl.LIST_MAXSIZE_L = 'Grootste maat';
        en.LIST_MAXSIZE_L = 'Maximal size';
        nl.LIST_MAXSIZE_S = 'Grootste';
        en.LIST_MAXSIZE_S = 'Maximal';
        nl.LIST_MINSIZE_L = 'Kleinste maat';
        en.LIST_MINSIZE_L = 'Minimal size';
        nl.LIST_MINSIZE_S = 'Kleinste';
        en.LIST_MINSIZE_S = 'Minimal';
        nl.LIST_REMARKS = 'Opmerkingen';
        en.LIST_REMARKS = 'Remarks';


        // categorieen
        nl.JUMPERCATEGORIES = [
            "Unknown",
            "Minder dan 25 sprongen of minder dan 10 sprongen in laatste 12 maanden",
            "25 tot 100 sprongen; minstens 10 sprongen in de afgelopen 12 maanden",
            "100 tot 400 sprongen; minstens 25 sprongen in de afgelopen 12 maanden",
            "400 tot 700 sprongen; minstens 50 sprongen in de afgelopen 12 maanden",
            "700 tot 1000 sprongen; minstens 100 sprongen in de afgelopen 12 maanden",
            "meer dan 1000 sprongen"
        ];
        en.JUMPERCATEGORIES = [
            "Unknown",
            "Less then 25 jumps, or less then 10 jumps in the last 12 months",
            "25 to 100 jumps; at least 10 jumps in the last 12 months",
            "100 to 400 jumps; at least 25 jumps in the last 12 months",
            "400 to 700 jumps; at least 50 jumps in the last 12 months",
            "700 to 1000 jumps; at least 100 jumps in the last 12 months",
            "over 1000 jumps"
        ];

        nl.NEEDEDEXPERIENCE = [
            "Unknown",
            "Geen",
            "Minimaal 25 sprongen, waarvan minimaal 10 in de de laatste 12 maanden",
            "Minimaal 100 sprongen, waarvan minimaal 25 in de afgelopen 12 maanden",
            "Minimaal 400 sprongen, waarvan minimaal 50 in de afgelopen 12 maanden",
            "Minimaal 700 sprongen, waarvan minimaal 100 in de afgelopen 12 maanden",
            "Minimaal 1000 sprongen"
        ];
        en.NEEDEDEXPERIENCE = [
            "Unknown",
            "None",
            "At least 25 jumps, of which at least 10 in the last 12 months",
            "At least 100 jumps, of which at least 25 in the last 12 months",
            "At least 400 jumps, of which at least 50 in the last 12 months",
            "At least 700 jumps, of which at least 100 in the last 12 months",
            "At least 1000 jumps"
        ];


        // search
        nl.SEARCHHEADER = 'Zoek';
        en.SEARCHHEADER = 'Search';

        switch (language) {
            case 'nl':
                $scope.translation = nl;
                //console.log('setlang nl');
                break;
            default:
                $scope.translation = en;
                //console.log('setlang en');
                break;
        }

        return;
    };
});

