describe('Login Controller', function(){
    var scope, state;

    // load the controller's module
    beforeEach(module('shout.login'));

    beforeEach(inject(function( $scope, $state, $controller ) {
        scope = $scope;
        state = $state; 
        $controller('LoginCtrl', {
            $scope: scope,
            $state: state
        });
    }));

    // tests start here
    it('should have a function called login', function(){
        expect(scope.login).toBe('function');
    });
});
