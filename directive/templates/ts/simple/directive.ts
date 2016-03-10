/// <reference path="../../../../typings/browser.d.ts" />
module app.<%= _.capitalize(_.camelize(name)) %> {
    'use strict';

    class DirectiveConfig implements angular.IDirective {
        restrict: string = 'E';

        constructor() {
        }

        public static Factory() : angular.IDirectiveFactory
        {
            var directive = () => {
                return new DirectiveConfig();
            };

            directive['$inject'] = [];
            return directive;
        }
    }

    export class <%= _.capitalize(_.camelize(name)) %>  {

        public static $inject = [];
        /* @ngInject */
        constructor() {
            var vm = this;
        }
    }

    angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', DirectiveConfig.Factory());

}
