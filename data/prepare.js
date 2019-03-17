//
// Create data component from the two base files
//


const fs = require('fs');
const path = require('path');

const canopiesFileName = path.resolve(__dirname, 'canopies.json');
const manufacturersFileName = path.resolve(__dirname, 'manufacturers.json');

const canopiesJson = fs.readFileSync(canopiesFileName);
const manufacurersJson = fs.readFileSync(manufacturersFileName);


const canopiesArray = JSON.parse(canopiesJson).canopies;
const manufacturersArray = JSON.parse(manufacurersJson).manufacturers;


let manufacturers = {};
let canopies = {};

let canopiesByName = [];
let canopiesByManufacturer = [];
let canopiesByCategory = [];


let guidsSeen = {};
let slugsSeen = {};

// helper function compareName
function compareName(c1, c2) {
  let n1 = canopies[c1].name;
  let n2 = canopies[c2].name;
  return n1.localeCompare(n2);
}

// helper function compareName
function compareCategory(c1, c2) {
  let n1 = canopies[c1].calculationcategory.toString();
  let n2 = canopies[c2].calculationcategory.toString();
  return n1.localeCompare(n2);
}

// helper function compareName
function compareManufacturer(c1, c2) {
  let m1 = manufacturers[canopies[c1].manufacturerid].name;
  let m2 = manufacturers[canopies[c2].manufacturerid].name;
  return m1.localeCompare(m2);
}

// create a slug
function slugify(text) {
  let slug = text.toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '');
  return slug;
}

function cleanForSearch(text) {
  let search = text.trim().toLowerCase();
  search = search.replace(/[ ,\-()]+/g, '');
  return search;
}


// create manufacturers Object
for (let m in manufacturersArray) {
  let mObject = manufacturersArray[m];
  let id = mObject.id;
  if (guidsSeen[id]) {
    console.log('ERROR: Duplicate manufacturer id: ' + id);
  }
  guidsSeen[id] = 1;
  mObject.slug = slugify(mObject.name);
  if (slugsSeen[mObject.slug]) {
    console.log('ERROR: Duplicate slug: ' + mObject.slug);
  }
  slugsSeen[mObject.slug] = mObject.id;
  manufacturers[id] = mObject;
}


// create canopies Object
let currentCategory = 0;
for (let c in canopiesArray) {
  let cObject = canopiesArray[c];
  let id = cObject.id;
  if (guidsSeen[id]) {
    console.log('ERROR: Duplicate canopy id: ' + id);
  }
  guidsSeen[id] = 1;

  // complete URLS in the links array
  let links = [];
  if (cObject.links) {
    for (var li = 0; li < cObject.links.length; li++) {
      let link = {};
      let url;
      link.type = cObject.links[li].type;
      switch (link.type) {
        case 'youtube':
          url = "http://www.youtube.com/watch?v=" + cObject.links[li].id;
          break;
        case 'vimeo':
          url = "https://vimeo.com/" + cObject.links[li].id;
          break;
        case 'skydivemag':
          url = "http://www.skydivemag.com/article/" + cObject.links[li].id;
          break;
        case 'pdf':
          url = cObject.links[li].id;
          break;
        default:
          throw new Error("Unknown link type: " + link.type);
      }
      link.url = url;
      links.push(link);
    }
  }
  cObject.links = links;
  cObject.commontype = parseInt(cObject.commontype);
  cObject.category = parseInt(cObject.category); // make sure we have int
  cObject.displaycategory = cObject.category ? cObject.category : '?';
  cObject.calculationcategory = cObject.category ? cObject.category : cObject.xbraced ? 7 : 6;
  cObject.manufacturername = manufacturers[cObject.manufacturerid].name;
  cObject.manufacturerslug = manufacturers[cObject.manufacturerid].slug;
  cObject.search = cleanForSearch(cObject.name) + "|" + cleanForSearch(cObject.manufacturername);
  cObject.slug = slugify(cObject.manufacturername) + "-" + slugify(cObject.name);
  if (slugsSeen[cObject.slug]) {
    console.log('ERROR: Duplicate slug: ' + cObject.slug);
  }
  slugsSeen[cObject.slug] = cObject.id;

  canopies[id] = cObject;
  canopiesByName.push(id);
  canopiesByManufacturer.push(id);
  canopiesByCategory.push(id);
  if (cObject.category < currentCategory) {
    console.log('category out of order for: ' + cObject.name + ' by ' + cObject.manufacturername);
  }
  if (cObject.calculationcategory > currentCategory) {
    currentCategory = cObject.calculationcategory;
  }
}


// sort by name (and then manufacturer)
canopiesByName.sort((a, b) => {
  let nc = compareName(a, b);
  return nc !== 0 ? nc : compareManufacturer(a, b)
});

// sort by manufacturer (and then name)
canopiesByManufacturer.sort((a, b) => {
  let mc = compareManufacturer(a, b);
  return mc !== 0 ? mc : compareName(a, b);
});


// sort by category (and then name, and then manufacturer)
canopiesByCategory.sort((a, b) => {
  let cc = compareCategory(a, b);
  if (cc !== 0) {
    return cc;
  }
  let nc = compareName(a, b);
  return nc !== 0 ? nc : compareManufacturer(a, b)
});

const data = {
  manufacturers: manufacturers,
  canopies: canopies,
  canopiesByName: canopiesByName,
  canopiesByManufacturer: canopiesByManufacturer,
  canopiesByCategory: canopiesByCategory,
  slugs: slugsSeen
};

const dataModuleText = "// Kompasroos Data, generated by prepare.js\n\n"
  + "let kompasroosData = "
  + JSON.stringify(data, null, 2) + ";"
  + "\n\nmodule.exports = kompasroosData;";

const dataModuleName = path.resolve(__dirname, '../src/components/kompasroosdata.js');
fs.writeFileSync(dataModuleName, dataModuleText);

