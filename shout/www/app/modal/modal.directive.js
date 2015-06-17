angular
  .module('shout')
  .directive('photoModal', photoModal);

photoModal.$inject = ['$ionicModal'];

function photoModal($ionicModal) {
  var directive = {
    link: link,
    restrict: 'E',
    replace: true,
    template: '<div></div>',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      photo: "="
    }
  };
  return directive;

  function link($scope, element, attrs) {
    $ionicModal.fromTemplateUrl('app/modal/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.photo.openModal = function() {
      console.log('asfasdfasdfas');
      // $scope.modal.show();
    };

    $scope.photo.closeModal = function() {
      $scope.modal.hide();
    };
  }
}
