/// <reference path="../../../../typings/browser.d.ts" />
describe('<%= ctrlname %>', function () {

    beforeEach(angular.mock.module('<%= appname %>'));

    var scope : angular.IScope;
    var ctrl: any;

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('<%= ctrlname %>', {$scope: scope});
    }));

    it('should ...', angular.mock.inject(function () {

        expect(1).toEqual(1);

    }));

});
