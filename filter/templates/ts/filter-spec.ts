/// <reference path="../../../typings/browser.d.ts" />
describe('<%= _.camelize(name) %>', function () {

    beforeEach(angular.mock.module('<%= appname %>'));

    describe('<%= _.camelize(name) %>', function () {
        var filter;

        beforeEach(angular.mock.inject(function (_$filter_) {
            filter = _$filter_('<%= _.camelize(name) %>');
        }));
    });
});
