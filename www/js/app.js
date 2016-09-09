// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'controllers', 'services']);

var auth = {
      checkParam: ['$state','$rootScope', function($state, $rootScope){
          if(!$rootScope.loggedIn){
            $state.go('app.login');
          }
        }]
      }

var guest = {
    checkParam: ['$state', '$rootScope', function($state, $rootScope){
      if($rootScope.loggedIn){
        $state.go('app.home');
      }
    }]
}

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.run(function($rootScope){
  $rootScope.loggedIn = false;
  console.log($rootScope.loggedIn);
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.signup', {
    resolve: guest,
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/auth/signup.html'
      }
    }
  })

  .state('app.login', {
      resolve: guest,
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/auth/login.html'
        }
      }
    })

    .state('app.user', {
      resolve: auth,
      url: '/user',
      views: {
        'menuContent': {
          templateUrl: 'templates/user/index.html',
        }
      }
    })
    .state('app.home', {
      resolve: auth,
      url :'/home', 
      views: {
        'menuContent':{
          templateUrl: 'templates/home.html', 
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
