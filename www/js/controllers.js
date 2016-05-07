(function(){

var app = angular.module('starter.controllers', ['ionic']);
var historias = [];    
    
angular.module('ionic.example', ['ionic'])

app.directive('fakeStatusbar', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="fake-statusbar"><div class="pull-left">Carrier</div><div class="time">3:30 PM</div><div class="pull-right">50%</div></div>'
  }
})
app.directive('headerShrink', function($document) {
  var fadeAmt;

  var shrink = function(header, content, amt, max) {
    amt = Math.min(44, amt);
    fadeAmt = 1 - amt / 44;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var starty = $scope.$eval($attr.headerShrink) || 0;
      var shrinkAmt;
      
      var header = $document[0].body.querySelector('.bar-header');
      var headerHeight = header.offsetHeight;
      
      $element.bind('scroll', function(e) {
        var scrollTop = null;
        if(e.detail){
          scrollTop = e.detail.scrollTop;
        }else if(e.target){
          scrollTop = e.target.scrollTop;
        }
        if(scrollTop > starty){
          // Start shrinking
          shrinkAmt = headerHeight - Math.max(0, (starty + headerHeight) - scrollTop);
          shrink(header, $element[0], shrinkAmt, headerHeight);
        } else {
          shrink(header, $element[0], 0, headerHeight);
        }
      });
    }
  }
})
app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
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

app.controller('readJson' ,function($http,$scope){
    
    $scope.stories = [];
    
    loadStories = function(params , callback){
        
        $http.get('https://www.reddit.com/r/Android/new/.json', {params: params})
        .success(function(response){
        var stories = [];
        angular.forEach(response.data.children,function(child){
            stories.push(child.data);
            historias.push(child.data);
        });
          callback(stories); 
            historias = $scope.stories;
    });
        
    };
    
    $scope.loadOlderStories = function (){
        var params = {};
        if($scope.stories.length > 0){
            params['after'] = $scope.stories[$scope.stories.length - 1].name;
        }
        loadStories(params , function(olderStories){
                    $scope.stories = $scope.stories.concat(olderStories);
                    historias = $scope.stories;
            $scope.$broadcast('scroll.infiniteScrollComplete');
                    });   
    };
    
    $scope.loadNewerStories = function(){
        var params = {'before': $scope.stories[0].name};
        loadStories(params , function(newerStories){
           $scope.stories = newerStories.concat($scope.stories); 
            historias = $scope.stories;
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    
});

app.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1, price:'30,00' ,timeLeft:'00d 23m 15s',src:'http://lorempixel.com/120/120/people/' },
    { title: 'Chill', id: 2, price:'30,00' ,timeLeft:'00d 23m 15s',src:'http://lorempixel.com/120/120/people/' },
    { title: 'Dubstep', id: 3, price:'30,00' ,timeLeft:'00d 23m 15s',src:'http://lorempixel.com/120/120/people/' },
    { title: 'Indie', id: 4, price:'30,00' ,timeLeft:'00d 23m 15s',src:'http://lorempixel.com/120/120/people/' },
    { title: 'Rap', id: 5, price:'30,00' ,timeLeft:'00d 23m 15s',src:'http://lorempixel.com/120/120/people/' },
    { title: 'Cowbell', id: 6, price:'30,00' ,timeLeft:'00d 23m 15s',src:'http://lorempixel.com/120/120/people/' }
  ];
});

app.controller('PlaylistCtrl', function($scope, $stateParams) {
});
    

app.controller('PlaylistsCtrl2', function($scope) {
    $scope.stories2 =[];
    $scope.stories2 = historias;
});
    
app.controller('PlaylistCtrl2', function($scope, $stateParams) {
});

}());