/// <reference path="../../typings/browser.d.ts" />
module app.<%= _.capitalize(_.camelize(name)) %> {
    'use strict';


    export class <%= _.capitalize(_.camelize(name)) %> {
        static $inject = [];
        /* @ngInject */
        constructor() {
        }

        public getStates(): Array<angular.ui.IState> {
            return [
                /* Add New States Above */
            ];
        }

        public static instance() : <%= _.capitalize(_.camelize(name)) %> {
            return new <%= _.capitalize(_.camelize(name)) %>();
        }

    }

    angular.module('<%= _.camelize(name) %>').run(<%= _.capitalize(_.camelize(name)) %>.instance);


}
