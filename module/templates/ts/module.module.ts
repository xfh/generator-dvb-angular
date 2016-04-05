/// <reference path="../../typings/browser.d.ts" />
module <%= _.capitalize(_.camelize(name)) %> {
    'use strict';

    angular.module('<%= _.camelize(name) %>', []);
}
