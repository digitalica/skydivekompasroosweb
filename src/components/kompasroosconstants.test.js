import C from './kompasroosconstants';

it('converst kg to lbs', () => {
  var testCanopy = {
    category: '2',
    maxsize: 280
  };
  expect(C.acceptability(testCanopy, 7, 90)).toEqual(C.ACC_ACCEPTABLE);
});


it('converst kg to lbs', () => {
  expect(C.kgToLbs(0)).toEqual(0);
  expect(C.kgToLbs(2)).toEqual(4);
  expect(C.kgToLbs(99)).toEqual(218);
  expect(C.kgToLbs(100)).toEqual(220);
  expect(C.kgToLbs(101)).toEqual(223);
  expect(C.kgToLbs(200)).toEqual(441);
  expect(C.kgToLbs(201)).toEqual(443);
});


it('calculates wingload', () => {
  expect(C.getWingloadFor(0, C.kgToLbs(115))).toEqual(""); // not very realistic ;-)
  expect(C.getWingloadFor(190, C.kgToLbs(115))).toEqual("1.34");
  expect(C.getWingloadFor(1, 0)).toEqual('0.00');
  expect(C.getWingloadFor(10, 0)).toEqual('0.00');
  expect(C.getWingloadFor(999, 0)).toEqual('0.00');
  expect(C.getWingloadFor(100, 10)).toEqual('0.10');
  expect(C.getWingloadFor(100, 25)).toEqual('0.25');
  expect(C.getWingloadFor(100, 50)).toEqual('0.50');
  expect(C.getWingloadFor(90, 30)).toEqual('0.33');
  expect(C.getWingloadFor(100, 150)).toEqual('1.50');
});


it('calculates jumper category', () => {
  expect(C.jumperCategory(0, 0, 0)).toEqual(1); // absolute beginner
  expect(C.jumperCategory(0, 0, undefined)).toEqual(1); // absolute beginner
  expect(C.jumperCategory(0, 0, null)).toEqual(1); // absolute beginner
  expect(C.jumperCategory(24, 0, 0)).toEqual(1); // absolute beginner
  expect(C.jumperCategory(24, 24, 0)).toEqual(1); // absolute beginner
  expect(C.jumperCategory(25, 9, 0)).toEqual(1); // absolute beginner
  expect(C.jumperCategory(999, 9, 0)).toEqual(1); // long jump vacation...
  expect(C.jumperCategory(999, 0, 0)).toEqual(1); // long jump vacation...
  expect(C.jumperCategory(999, 9, 300)).toEqual(1); // long jump vacation...
  expect(C.jumperCategory(999, 0, 300)).toEqual(1); // long jump vacation...

  expect(C.jumperCategory(25, 10, 0)).toEqual(2);
  expect(C.jumperCategory(100, 24, 0)).toEqual(2);
  expect(C.jumperCategory(99, 25, 0)).toEqual(2);
  expect(C.jumperCategory(999, 24, 0)).toEqual(2);
  expect(C.jumperCategory(999, 24, 333)).toEqual(2);

  expect(C.jumperCategory(100, 25, 0)).toEqual(3);
  expect(C.jumperCategory(100, 25, undefined)).toEqual(3);
  expect(C.jumperCategory(100, 25, null)).toEqual(3);
  expect(C.jumperCategory(400, 49, 0)).toEqual(3);
  expect(C.jumperCategory(399, 50, 0)).toEqual(3);
  expect(C.jumperCategory(399, 100, 0)).toEqual(3);
  expect(C.jumperCategory(399, 99, 0)).toEqual(3);
  expect(C.jumperCategory(999, 49, 0)).toEqual(3);
  expect(C.jumperCategory(999, 49, 666)).toEqual(3);

  expect(C.jumperCategory(400, 50, 0)).toEqual(4);
  expect(C.jumperCategory(699, 100, 0)).toEqual(4);
  expect(C.jumperCategory(700, 74, 0)).toEqual(4);
  expect(C.jumperCategory(700, 75, 0)).toEqual(5);
  expect(C.jumperCategory(700, 99, 0)).toEqual(5);
  expect(C.jumperCategory(999, 99, 0)).toEqual(5);
  expect(C.jumperCategory(999, 99, 333)).toEqual(5);

  expect(C.jumperCategory(700, 100, 0)).toEqual(5);
  expect(C.jumperCategory(999, 100, 0)).toEqual(5);
  expect(C.jumperCategory(999, 200, 0)).toEqual(5);
  expect(C.jumperCategory(999, 200, 666)).toEqual(5);

  expect(C.jumperCategory(1000, 0, 0)).toEqual(1);
  expect(C.jumperCategory(1000, 10, 0)).toEqual(2);
  expect(C.jumperCategory(1000, 74, 0)).toEqual(4);
  expect(C.jumperCategory(1000, 80, 0)).toEqual(5);
  expect(C.jumperCategory(1000, 100, 0)).toEqual(6);
  expect(C.jumperCategory(1000, 1000, 0)).toEqual(6);
  expect(C.jumperCategory(1199, 1000, 500)).toEqual(7);
  expect(C.jumperCategory(1200, 1000, 199)).toEqual(6);

  expect(C.jumperCategory(1091, 100, 0)).toEqual(6);

  expect(C.jumperCategory(1250, 125, 250)).toEqual(7);
  expect(C.jumperCategory(1250, 199, 250)).toEqual(7);
  expect(C.jumperCategory(1250, 200, 250)).toEqual(7);

  expect(C.jumperCategory(2000, 1000, 0)).toEqual(6);
  expect(C.jumperCategory(2000, 0, 0)).toEqual(1); // jump vacation
  expect(C.jumperCategory(2000, 1000, 199)).toEqual(6);

  expect(C.jumperCategory(2000, 300, 200)).toEqual(7);
  expect(C.jumperCategory(2000, 0, 200)).toEqual(1); // jump vacation
  expect(C.jumperCategory(3000, 10, 2000)).toEqual(2); // jump vacation
});

it('calculates acceptability', () => {
  expect(C.acceptability({category: 1}, 2, 85)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability({category: 2}, 2, 85)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability({category: 3}, 2, 85)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability({category: 4}, 2, 85)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability({category: 5}, 2, 85)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability({category: 6}, 2, 85)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability({category: 7}, 2, 85)).toEqual(C.ACC_CATEGORYTOOHIGH);

  expect(C.acceptability({category: 2, minsize: 100, maxsize: 300}, 2, 115)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability({category: 2, minsize: 100, maxsize: 120}, 2, 115)).toEqual(C.ACC_NEEDEDSIZENOTAVAILABLE);

  expect(C.acceptability({category: 1}, 4, 85)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability({category: 2}, 4, 85)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability({category: 3}, 4, 85)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability({category: 4}, 4, 85)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability({category: 5}, 4, 85)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability({category: 6}, 4, 85)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability({category: 7}, 4, 85)).toEqual(C.ACC_CATEGORYTOOHIGH);
});


it('returns the correct availability for a CAT 2 canopy', function () {
  var testCanopy = {
    category: '2',
    maxsize: 280
  };
  expect(C.acceptability(testCanopy, 1, 50)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 1, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 1, 120)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 2, 90)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability(testCanopy, 3, 90)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability(testCanopy, 4, 90)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability(testCanopy, 5, 90)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability(testCanopy, 6, 90)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability(testCanopy, 7, 90)).toEqual(C.ACC_ACCEPTABLE);
});

it('returns the correct availability for a CAT 4 canopy', function () {
  var testCanopy = {
    category: '4',
    maxsize: 280
  };
  expect(C.acceptability(testCanopy, 1, 50)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 1, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 1, 120)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 2, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 3, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 4, 90)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability(testCanopy, 5, 90)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability(testCanopy, 6, 90)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability(testCanopy, 7, 90)).toEqual(C.ACC_ACCEPTABLE);
});

it('returns the correct availability for a CAT 6 canopy', function () {
  var testCanopy = {
    category: '6',
    maxsize: 170
  };
  expect(C.acceptability(testCanopy, 1, 50)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 1, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 1, 120)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 2, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 3, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 4, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 5, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 6, 90)).toEqual(C.ACC_ACCEPTABLE);
  expect(C.acceptability(testCanopy, 7, 90)).toEqual(C.ACC_ACCEPTABLE);
});

it('returns the correct availability for a CAT 7 canopy', function () {
  var testCanopy = {
    category: '7',
    maxsize: 120
  };
  expect(C.acceptability(testCanopy, 1, 50)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 1, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 1, 120)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 2, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 3, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 4, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 5, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 6, 90)).toEqual(C.ACC_CATEGORYTOOHIGH);
  expect(C.acceptability(testCanopy, 7, 90)).toEqual(C.ACC_ACCEPTABLE);
});


it('checks correctly if a cookie is set', function () {
  expect(C.cookieSet("")).toEqual(false);
  expect(C.cookieSet(undefined)).toEqual(false);
  expect(C.cookieSet(null)).toEqual(false);

  expect(C.cookieSet(1)).toEqual(true);
  expect(C.cookieSet(78)).toEqual(true);
  expect(C.cookieSet("0")).toEqual(true);
  expect(C.cookieSet("1")).toEqual(true);
  expect(C.cookieSet("78")).toEqual(true);

});


it('returns a filename from a path', function () {
  expect(C.filenameFromPath("")).toEqual("");
  expect(C.filenameFromPath("http://test.html")).toEqual("test.html");
  expect(C.filenameFromPath("http://server.com/test.html")).toEqual("test.html");
  expect(C.filenameFromPath("http://server.com/subdir/test.html")).toEqual("test.html");
});

