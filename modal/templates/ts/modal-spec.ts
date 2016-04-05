/// <reference path="../../../../typings/browser.d.ts" />
describe('<%= _.camelize(name) %>', function() {

    beforeEach(angular.mock.module('<%= appname %>'));

    var scope : angular.IScope;
    var ctrl: any;

    beforeEach(angular.mock.inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('<%= _.camelize(name) %>', {$scope: scope});
    }));

    it('should ...', angular.mock.inject(function() {

        expect(1).toEqual(1);

    }));

});
