(function () {
    'usse strict';

    angular.module('<%= appname %>').controller('<%= ctrlname %>', <%= ctrlname %>);

    <%= ctrlname %>.$inject = ['$scope'];

    function <%= ctrlname %>($scope) {
        var vm = this;

    }
})();
