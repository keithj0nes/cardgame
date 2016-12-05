angular.module("gameApp", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state("home",{
        url: "/",
        templateUrl: "views/main.html",
        controller: "mainController"
      })
      .state("stats",{
        url: "/stats",
        templateUrl: "views/stats.html",
        controller: "statsController"
      })


      $urlRouterProvider
    .otherwise("/");




  })
