/// <reference path="../../../typings/browser.d.ts" />
describe('<%= _.camelize(name) %>', function () {

    var <%= _.camelize(name) %> : any;

    beforeEach(angular.mock.module('<%= appname %>'));

    beforeEach(angular.mock.inject(function (_<%= _.camelize(name) %>_) {
        <%= _.camelize(name) %> = _<%= _.camelize(name) %>_;
    }));

    describe('Public API', function () {

    });

    describe('API Usage', function () {

    });
});
