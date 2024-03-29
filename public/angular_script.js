
var app = angular
  .module("demo", ["ui.bootstrap", "ngRoute"])
  .config(function ($routeProvider, $locationProvider) {
    console.log("hiiiiiiiii")
    $routeProvider
      .when('/', {
        templateUrl: "frontpage",
        controller: 'indexController'
      })
      .when('/tableboard',{
        templateUrl: "tableboard",
        controller: 'ngtableCtrl'
      })
      .when('/create_account',{
        templateUrl: 'create_account',
        controller:"pushcontroller"
      })
      .when('/update_account',{
        templateUrl: 'update_account',
        controller:"updatecontroller"
      })
      .when('/delete_account',{
        templateUrl: 'delete_account',
        controller:"deletecontroller"
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })

  .controller('indexController', function ($scope, $location,$rootScope,$http) {
    $scope.validationFun = function (path, username, password) {
      $rootScope.username=username
      $http({
        method: 'GET',
        url: 'http://localhost:4000/data/'+$rootScope.username+"/"+password,
  
      }).then(function sappuccess(response) {
        console.log(response.data)
        if(response.data=="data_present"){
          $location.path(path);
          $scope.warn=""
        }
        else{
          $scope.warn="UserName Or Password Not Correc!"
        }
      }, function error(response) {
        console.log("error")
      })    
        

    }
  })

  .controller("ngtableCtrl", function ($scope, $http,$rootScope) {
    $http({
      method: 'GET',
      url: 'http://localhost:4000/username/'+$rootScope.username,

    }).then(function sappuccess(response) {
      console.log(response.data)
      $scope.itemsDetails = response.data

    }, function error(response) {
      console.log("error")
    })
  })

  .controller('pushcontroller',function($scope,$http){
    console.log("---------------------------------------------------------------------")
    $scope.pushfun=function(value){
            console.log("pushfun calllllllllllllllllllllllllllllllllllllll")
            $scope.data = {
            'UserNameNew' : '',
            'PasswordNew' : ''
            }
            $scope.data=value   
            var c=$scope.data
            console.log(c.UserNameNew)
            console.log(c.PasswordNew)
            
            if( c.UserNameNew!=undefined & c.PasswordNew!=undefined){
                    var res = $http.post('http://localhost:4000/push', c)
            }
    }

})

.controller('updatecontroller',function($scope,$http){
  console.log("---------------------000000000000000------------------------------------------------")
  $scope.updatefun=function(value){
          console.log(value)
          $scope.dataupdate = {
          'UserNameNew' : '',
          'UserNameOld' : ''
          }
          $scope.dataupdate=value   
          var c=$scope.dataupdate
         
          
          if( c.UserNameNew!=undefined & c.UserNameOld!=undefined){
                  var res = $http.post('http://localhost:4000/update', c)
          }
  }

})

.controller('deletecontroller',function($scope,$http){
 
  $scope.deletefun=function(value){
    console.log("---------------------000000000000000------------------------------------------------")
          console.log(value)
          $scope.datadelete = {
          'UserNameNew' : '',
          }
          $scope.datadelete=value   
          var c=$scope.datadelete
         console.log("----------")
          
          if( c.UserNameNew!=undefined ){
                  var res = $http.post('http://localhost:4000/delete', c)
          }
  }

})