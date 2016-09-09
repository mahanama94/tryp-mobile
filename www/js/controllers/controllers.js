/**
 * ===================================================================
 * 
 *  Module : STARTER CONTROLLERS
 * 
 * Contains the basic controllers for the mobile application 
 * 
 * Controllers : 
 *    AuthController - Authentication 
 *    TripController - TripManagement
 *    ProfileController - Managing profiles and functions  
 * ===================================================================
 *    
 */
var controllers = angular.module('controllers', ['services']);

/**
 * ===================================================================
 *    AUTH CONTROLLER
 *  
 * Manages functions relating to the Authentication of the user
 * 
 * Uses : 
 * 
 * ===================================================================
 * 
 */
controllers.controller('AuthController', function($scope,$rootScope, $state, $ionicHistory, userService){

  $scope.refresh = function(){
    $scope.loggedIn = $rootScope.loggedIn;
    $scope.user = $rootScope.user;
    $state.reload;
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
  }

  /**
   * Authenticating a registered user 
   */
  $scope.login = function(){
    userService.getUser('mahanama94').
    then(function(response){
      $rootScope.loggedIn = true;
      $rootScope.user = response.data;
      alert("logging In");
      $state.go('app.home');
      $scope.refresh();
    }
    ,
     function(){
      alert('unable to connect');
    })
  }

  /**
   * Loogs out an authenticated user
   */
  $scope.logout = function(){
    alert("logging out");
    $rootScope.loggedIn = false;
    $scope.refresh();
    $state.go('app.login');
  }

  /**
   * Signups a user and automatically loging the user 
   */
  $scope.signup = function(){
    alert('Signing up the user');
    $scope.login();
  }

});

controllers.controller('HomeController', function($scope, $ionicHistory, $state){

  $state.reload();
  $ionicHistory.nextViewOptions({
    disableBack: true
  });


});

/**
 * ===================================================================
 *    TRIP CONTROLLER 
 * 
 *  Manages functions relating to creating, retrieving trips 
 * 
 *  Uses : 
 *    TripService - for communication with the server
 *  
 * ===================================================================
 */
controllers.controller('TripController', function($scope, $http, locationService){
  
  $scope.intialize = function(){
    
    $scope.orgin = '';
    $scope.destination = '';

    $scope.originLocations = [];
    $scope.destinationLocations = [];
  }

  $scope.search = function(){
    alert("Searching");
  }

  $scope.predictLocation = function(itemName){
    
    if(itemName == 'origin'){
      input = $scope.origin;
    }
    else{
      input= $scope.destination;
    }

    $scope.originLocations = [];
    $scope.destinationLocations = [];


    if(input.length > 1){
      locationService.predict(input)
      .then(function(response){

        var predictions = response.data.predictions;

        for(i=0 ; i<= predictions.length; i++){
          if(itemName == 'origin'){
            $scope.originLocations.push(predictions[i]);
          }
          else{
            $scope.destinationLocations.push(predictions[i]);
          } 
        }

      }, 
      function(response){
        console.log(response)
        alert("error occured");
      })
    }
  }

  $scope.setLocation = function(itemName , location){
    
    if(itemName == 'origin'){
      $scope.origin = location.description;
      $scope.originLocations = [];
    }
    else{
      $scope.destination = location.description;
      $scope.destinationLocations = [];
    }
  }

});

/**
 * ===================================================================
 *    PROFILE CONTROLLER 
 * 
 *  Manages functions relating to viewing, updating user prfiles 
 * 
 *  Uses : 
 *    
 *  
 * ===================================================================
 */
controllers.controller('ProfileController', function($scope, $rootScope){
    $scope.user = $rootScope.user;
});

controllers.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/auth/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});

controllers.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
});

controllers.controller('PlaylistCtrl', function($scope, $stateParams) {
});