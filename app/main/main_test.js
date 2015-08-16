'use strict';

describe('myApp.main module', function() {

  beforeEach(module('myApp.main'));

  describe('main controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});