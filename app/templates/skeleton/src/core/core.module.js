(function () {
    'use strict';

    angular
        .module('<%= appname %>.core', [
            /* Angular modules */
            'ngAnimate',
            'ngSanitize',
            'ngCookies',
            /* shared DVBern modules */
            'dvbAngular.router',
            /* 3rd-party modules */
            'ui.bootstrap',
            'angularMoment'
        ]);
})();
