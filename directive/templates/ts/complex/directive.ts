/// <reference path="../../../../typings/browser.d.ts" />
module app.<%= _.capitalize(_.camelize(name)) %> {
    'use strict';

    class DirectiveConfig implements angular.IDirective {
        restrict: string = 'E';
        replace: boolean = true;
        scope: any = {};
        templateUrl: string = '<%= htmlPath %>';
        controller: any = <%= _.capitalize(_.camelize(name)) %>;
        controllerAs: string = 'vm';
        bindToController: boolean = true;
        link = (projectScope: angular.IScope, element: angular.IAugmentedJQuery,
                     attrs: angular.IAttributes, ctrl: {}) => { }

        constructor() { }

        public static Factory() : angular.IDirectiveFactory
        {
            var directive = () => {
                return new DirectiveConfig();
            };

            directive['$inject'] = [];
            return directive;
        }
    }

    class <%= _.capitalize(_.camelize(name)) %>  {

        public static $inject = [];
        /* @ngInject */
        constructor() {
            var vm = this;
        }
    }

    angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', DirectiveConfig.Factory());

}
