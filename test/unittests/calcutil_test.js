'use strict';

describe('Calc Service', function () {

    var calcUtil;

    var MINAREACAT1 = 170;
    var MINAREACAT2 = 170;
    var MINAREACAT3 = 150;
    var MINAREACAT4 = 135;
    var MINAREACAT5 = 120;
    var MINAREAUNLIMITED = 0;

    var MAXWINGLOADCAT1 = 1.1;
    var MAXWINGLOADCAT2 = 1.1;
    var MAXWINGLOADCAT3 = 1.3;
    var MAXWINGLOADCAT4 = 1.5;
    var MAXWINGLOADCAT5 = 1.7;
    var MAXWINGLOADUNLIMITED = 9999;

    beforeEach(function () {
        module('myApp.main');
        inject(function (_calcUtil_) {
            calcUtil = _calcUtil_;
        });
    });

    it('to work', function () {
        var a = 12;
        var b = a;
        expect(a).toBe(b);
        expect(a).not.toBe(null);
    });

    it('convert kg to lbs correctly', function () {
        expect(calcUtil.kgToLbs).toBeDefined();
        expect(calcUtil.kgToLbs(0)).toBe(0);
        expect(calcUtil.kgToLbs(2)).toBe(4);
        expect(calcUtil.kgToLbs(99)).toBe(218);
        expect(calcUtil.kgToLbs(100)).toBe(220);
        expect(calcUtil.kgToLbs(101)).toBe(223);
        expect(calcUtil.kgToLbs(200)).toBe(441);
        expect(calcUtil.kgToLbs(201)).toBe(443);
    });

    it('returns correct jumper category', function () {
        expect(calcUtil.jumperCategory).toBeDefined();
        expect(calcUtil.jumperCategory(0, 0)).toBe(1); // absolute beginner
        expect(calcUtil.jumperCategory(24, 0)).toBe(1); // absolute beginner
        expect(calcUtil.jumperCategory(24, 24)).toBe(1); // absolute beginner
        expect(calcUtil.jumperCategory(25, 9)).toBe(1); // absolute beginner
        expect(calcUtil.jumperCategory(999, 9)).toBe(1); // long jump vacation...

        expect(calcUtil.jumperCategory(25, 10)).toBe(2);
        expect(calcUtil.jumperCategory(100, 24)).toBe(2);
        expect(calcUtil.jumperCategory(99, 25)).toBe(2);
        expect(calcUtil.jumperCategory(999, 24)).toBe(2);

        expect(calcUtil.jumperCategory(100, 25)).toBe(3);
        expect(calcUtil.jumperCategory(400, 49)).toBe(3);
        expect(calcUtil.jumperCategory(399, 50)).toBe(3);
        expect(calcUtil.jumperCategory(399, 100)).toBe(3);
        expect(calcUtil.jumperCategory(399, 99)).toBe(3);
        expect(calcUtil.jumperCategory(999, 49)).toBe(3);

        expect(calcUtil.jumperCategory(400, 50)).toBe(4);
        expect(calcUtil.jumperCategory(699, 100)).toBe(4);
        expect(calcUtil.jumperCategory(700, 99)).toBe(4);
        expect(calcUtil.jumperCategory(999, 99)).toBe(4);

        expect(calcUtil.jumperCategory(700, 100)).toBe(5);
        expect(calcUtil.jumperCategory(999, 100)).toBe(5);
        expect(calcUtil.jumperCategory(999, 200)).toBe(5);

        expect(calcUtil.jumperCategory(1000, 0)).toBe(6);
        expect(calcUtil.jumperCategory(1000, 10)).toBe(6);
        expect(calcUtil.jumperCategory(1000, 100)).toBe(6);
        expect(calcUtil.jumperCategory(1000, 1000)).toBe(6);

        expect(calcUtil.jumperCategory(2000, 1000)).toBe(6); // sky god
        expect(calcUtil.jumperCategory(2000, 0)).toBe(6); // jump vacation

        expect(calcUtil.jumperCategory(999, 0)).toBe(1); // jump vacation
    });

    it('returns correct min area based on category', function () {
        expect(calcUtil.minAreaBasedOnCategory).toBeDefined();
        expect(calcUtil.minAreaBasedOnCategory(1)).toBe(MINAREACAT1);
        expect(calcUtil.minAreaBasedOnCategory(2)).toBe(MINAREACAT2);
        expect(calcUtil.minAreaBasedOnCategory(3)).toBe(MINAREACAT3);
        expect(calcUtil.minAreaBasedOnCategory(4)).toBe(MINAREACAT4);
        expect(calcUtil.minAreaBasedOnCategory(5)).toBe(MINAREACAT5);
        expect(calcUtil.minAreaBasedOnCategory(6)).toBe(MINAREAUNLIMITED); // unlimited
    });

    it('returns correct max wingload based on category', function () {
        expect(calcUtil.maxWingLoadBasedOnCategory).toBeDefined();
        expect(calcUtil.maxWingLoadBasedOnCategory(1)).toBe(MAXWINGLOADCAT1);
        expect(calcUtil.maxWingLoadBasedOnCategory(2)).toBe(MAXWINGLOADCAT2);
        expect(calcUtil.maxWingLoadBasedOnCategory(3)).toBe(MAXWINGLOADCAT3);
        expect(calcUtil.maxWingLoadBasedOnCategory(4)).toBe(MAXWINGLOADCAT4);
        expect(calcUtil.maxWingLoadBasedOnCategory(5)).toBe(MAXWINGLOADCAT5);
        expect(calcUtil.maxWingLoadBasedOnCategory(6)).toBe(MAXWINGLOADUNLIMITED); // unlimited
    });

});