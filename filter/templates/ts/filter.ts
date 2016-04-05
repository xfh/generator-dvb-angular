/// <reference path="../../../typings/browser.d.ts" />
module app.<%= _.capitalize(_.camelize(name)) %> {
    'use strict';

    angular.module('<%= appname %>').filter('<%= _.camelize(name) %>', <%= _.camelize(name) %>);

    <%= _.camelize(name) %>.$inject = [];

    export function <%= _.camelize(name) %>() {
        return function (input, arg) {
            return 'output';
        }
    }


}
