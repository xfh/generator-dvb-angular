/// <reference path="../../../typings/browser.d.ts" />
module app.<%= _.capitalize(_.camelize(name)) %> {
    'use strict';

    export interface I<%= _.capitalize(_.camelize(name)) %> {

    }

    export class <%= _.capitalize(_.camelize(name)) %> implements I<%= _.capitalize(_.camelize(name)) %> {
        static $inject = [];
        /* @ngInject */
        constructor() {
            var vm = this;
        }

        static instance () : I<%= _.capitalize(_.camelize(name)) %> {
            return new <%= _.capitalize(_.camelize(name)) %>();
        }
    }

    angular.module('<%= appname %>').factory('<%= _.camelize(name) %>', <%= _.capitalize(_.camelize(name)) %>.instance);

}
