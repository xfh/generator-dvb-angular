/// <reference path="../../../typings/browser.d.ts" />
module app.<%= _.capitalize(_.camelize(name)) %> {
    'use strict';

    export class <%= _.capitalize(_.camelize(name)) %> {
        static $inject = [];
        /* @ngInject */
        constructor() {
            var vm = this;
        }
    }

    angular.module('<%= appname %>').factory('<%= _.camelize(name) %>', <%= _.capitalize(_.camelize(name)) %>);

}
