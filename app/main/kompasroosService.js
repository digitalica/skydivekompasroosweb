/**
 * Created by robbert on 9-8-15.
 */



'use strict';

/* Services */

var kompasroosServices = angular.module('kompasroosServices', ['ngResource']);

//console.log("start loading service");
kompasroosServices.factory('KompasroosData', ['$resource', function ($resource) {
    var api = {};

    api.get = function (cbfunction) {
        //console.log('api get start');
        var kompasroosdata = {};
        //console.log($resource);
        var manufacturersResource = $resource('json/manufacturers.json').get(
            function () {
                //console.log('manuf loaded');
                kompasroosdata.manufacturers = manufacturersResource.manufacturers;
                kompasroosdata.manufacturersById = [];
                for (var mid in kompasroosdata.manufacturers) {
                    var manufacturer = kompasroosdata.manufacturers[mid];
                    kompasroosdata.manufacturersById[manufacturer.id] = manufacturer;
                }
                var canopiesResource = $resource('json/canopies.json').get(
                    function () {
                        //console.log('canopies loaded');
                        kompasroosdata.canopiesFromFile = canopiesResource.canopies;
                        kompasroosdata.canopies = [];
                        kompasroosdata.canopiesById = [];
                        kompasroosdata.searchNames = [];
                        kompasroosdata.canopiesBySearchname = [];
                        for (var cid in kompasroosdata.canopiesFromFile) {
                            var org = kompasroosdata.canopiesFromFile[cid];
                            var links = org.links;
                            if (org.links) {
                                for (var li = 0; li < links.length; li++) {
                                    var url = links[li].url;
                                    var icon =  "glyphicon-globe";
                                    switch (links[li].type) {
                                        case 'youtube':
                                            url = "http://www.youtube.com/watch?v=" + links[li].id;
                                            icon =  "glyphicon-play";
                                            break;
                                        case 'vimeo':
                                            url = "https://vimeo.com/" + links[li].id;
                                            icon =  "glyphicon-play";
                                            break;
                                        case 'skydivemag':
                                            url = "http://www.skydivemag.com/article/" + links[li].id;
                                            icon =  "glyphicon-book";
                                            break;
                                        case 'pdf':
                                            url = links[li].id;
                                            icon =  "glyphicon-book";
                                            break;
                                    }
                                    links[li].url = url;
                                    links[li].icon = icon;
                                }
                            }
                            var canopy = {
                                'id': org.id,
                                'name': org.name,
                                'category': parseInt(org.category), // we need to compare as nr
                                'displaycategory': org.category ? parseInt(org.category) : '?',
                                calculationcategory: org.category ? parseInt(org.category) : (org.xbraced ? 7 : 6),
                                'cells': org.cells,
                                'commontype': org.commontype,
                                'dropzoneid': org.dropzoneid,
                                'firstyearofproduction': org.firstyearofproduction,
                                'lastyearofproduction': org.lastyearofproduction,
                                'manufacturerid': org.manufacturerid,
                                'maxsize': org.maxsize,
                                'minsize': org.minsize,
                                'links': links,
                                'url': org.url,
                                'remarks': org.remarks
                            };
                            canopy.manufacturer = kompasroosdata.manufacturersById[canopy.manufacturerid];
                            kompasroosdata.canopies.push(canopy);
                            kompasroosdata.canopiesById[canopy.id] = canopy;
                            var searchName = canopy.name + " (" + canopy.manufacturer.shortname + ")";
                            kompasroosdata.searchNames.push(searchName);
                            kompasroosdata.canopiesBySearchname[searchName] = canopy;
                        }


                        cbfunction(kompasroosdata);
                    },
                    function () {
                        //console.log('get manufacturers error');
                    }
                );
            },
            function () {
                //console.log('get canopies error');
            }
        );

    };
    //console.log('api defined');
    return api;
}]);
//console.log('end loading services');
