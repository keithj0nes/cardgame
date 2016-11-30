angular.module("gameApp").directive("clickDisable", function(){

  return {
    restrict: "AE",
    link: function(scope, elem, attr){

      var count = 0;
      $(elem).click(function(){
        count++
        if(count >=5){
          $(elem).attr("disabled", true)
        }
      })
    }
  }



})
