/// <reference path="../../../../typings/browser.d.ts" />
module app.<%= _.capitalize(_.camelize(name)) %> {
    'use strict';

    export class ComponentConfig implements angular.IComponentOptions {
        bindings: any;
        controller: any;
        controllerAs: string;

        constructor() {
            this.bindings = {};
            this.controller = <%= _.capitalize(_.camelize(name)) %>;
            this.controllerAs = 'vm';
        }
    }


    export class <%= _.capitalize(_.camelize(name)) %>  {

        static $inject = [];
        /* @ngInject */
        constructor() {
            var vm = this;
        }
    }

    angular.module('<%= appname %>').component('<%= _.capitalize(_.camelize(name)) %>', new ComponentConfig());

}
