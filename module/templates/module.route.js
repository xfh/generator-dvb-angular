(function () {
    'use strict';

    angular
        .module('<%= _.camelize(name) %>').run(<%= _.camelize(_.replaceAll(name, '.', '')) + 'Run' %>);

    /* @ngInject */
    function <%= _.camelize(_.replaceAll(name, '.', '')) + 'Run' %>(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            /* Add New States Above */
        ];
    }
})();
