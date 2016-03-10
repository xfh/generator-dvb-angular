/// <reference path="../../../../typings/browser.d.ts" />
describe('<%= _.camelize(name) %>', function () {

    beforeEach(angular.mock.module('<%= appname %>', '<%= htmlPath %>'));

    var $compile: angular.ICompileService;
    var $rootScope : angular.IScope;

    beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should ...', function () {

        /*
         To test your directive, you need to create some html that would use your directive,
         send that through compile() then compare the results.

         var element = $compile('<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>')($rootScope);
         $rootScope.$digest();

         expect(element.text()).toBe('hello, world');
         */

    });
});
