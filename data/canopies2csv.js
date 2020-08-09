/**
 * Created by robbert on 28-3-16.
 */




var canopies = require('./canopies.json').canopies;
var manufacturers = require('./manufacturers.json').manufacturers;

function csvfield(text) {
    if (text !== null && text !== '') {
        if (typeof text === 'string') {
            var needsQuotes = false;
            if (text.indexOf('\n') != -1) {
                needsQuotes = true;
            }
            if (text.indexOf('"') != -1) {
                needsQuotes = true;
            }
            if (text.indexOf(',') != -1) {
                needsQuotes = true;
            }
            if (needsQuotes) {
                text = text.replace('"', '""');
                text = "\"" + text + "\"";
            }
        }
        if (typeof text === 'boolean') {
            text = text ? 'Y' : 'N';
        }
        if (typeof text === 'undefined') {
            text = '';
        }
    }
    if (text === null) {
        text = '';
    }
    return text + ',';
}


var manufacturersById = {};
for (var mId = 0; mId < manufacturers.length; mId++) {
    var manufacturer = manufacturers[mId];
    manufacturersById[manufacturer.id] = manufacturer;
}


var line = '';
line += 'mCountry,';
line += 'mUrl,';
line += 'mShortname,';
line += 'mName,';

line += 'cCategory,';
line += 'cName,';
line += 'cCells,';
line += 'cFirstyearofproduction,';
line += 'cLastyearofproduction,';
line += 'cMinsize,';
line += 'cMaxsize,';
line += 'cCells,';
line += 'cXbraced,';
line += 'cCommontype,';
line += 'cDropzoneid,';
line += 'cUrl,';

line += csvfield('mRemarks-en');
line += csvfield('mRemarks-nl');
line += csvfield('cRemarks-en');
line += csvfield('cRemarks-nl');

console.log(line);

for (var cId = 0; cId < canopies.length; cId++) {
    var canopy = canopies[cId];
    var manufacturer = manufacturersById[canopy.manufacturerid];

    line = '';
    line += csvfield(manufacturer.countrycode);
    line += csvfield(manufacturer.url);
    line += csvfield(manufacturer.shortname);
    line += csvfield(manufacturer.name);

    line += csvfield(canopy.category);
    line += csvfield(canopy.name);
    line += csvfield(canopy.cells);
    line += csvfield(canopy.firstyearofproduction);
    line += csvfield(canopy.lastyearofproduction);
    line += csvfield(canopy.minsize);
    line += csvfield(canopy.maxsize);
    line += csvfield(canopy.cells);
    line += csvfield(canopy.xbraced);
    line += csvfield(canopy.commontype);
    line += csvfield(canopy.dropzoneid);
    line += csvfield(canopy.url);


    if (manufacturer.remarks) {
        line += csvfield(manufacturer.remarks.en);
        line += csvfield(manufacturer.remarks.nl);
    } else {
        line += csvfield('');
        line += csvfield('');
    }
    if (canopy.remarks) {
        line += csvfield(canopy.remarks.en);
        line += csvfield(canopy.remarks.nl);
    } else {
        line += csvfield('');
        line += csvfield('');
    }

    console.log(line);
}
