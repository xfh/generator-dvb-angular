/// <reference path="../../../../typings/browser.d.ts" />
describe('<%= _.camelize(name) %>', function () {

    beforeEach(angular.mock.module('<%= appname %>'));

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

         var element = compile('<div mydirective name="name">hi</div>')(scope);
         expect(element.text()).toBe('hello, world');
         */

    });
});
