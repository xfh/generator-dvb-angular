(function () {
    'use strict';

    angular.module('<%= appname %>').controller('<%= ctrlname %>', <%= ctrlname %>);

    <%= ctrlname %>.$inject = [];

    function <%= ctrlname %>() {
        var vm = this;

    }
})();
