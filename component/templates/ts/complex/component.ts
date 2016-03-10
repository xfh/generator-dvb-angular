/// <reference path="../../../../typings/browser.d.ts" />
module app.<%= _.capitalize(_.camelize(name)) %> {
    'use strict';

    class ComponentConfig implements angular.IComponentOptions {
        transclude: boolean;
        bindings: any;
        templateUrl: string | Function;
        controller: any;
        controllerAs: string;

        constructor() {
            this.transclude = false;
            this.bindings = {};
            this.templateUrl = '<%= htmlPath %>';
            this.controller = <%= _.capitalize(_.camelize(name)) %>;
            this.controllerAs = 'vm';
        }
    }


    class <%= _.capitalize(_.camelize(name)) %>  {

        static $inject = [];
        /* @ngInject */
        constructor() {
            var vm = this;
        }
    }

    angular.module('<%= appname %>').component('<%= _.camelize(name) %>', new ComponentConfig());

}
