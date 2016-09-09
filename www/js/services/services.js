var services = angular.module('services', [])
var mode = "mobile";

if(mode === "web"){
    var baseUrl = "http://localhost:8000";
}
else{
    var baseUrl="http://10.0.2.2:8000";
}

services.service('locationService', function($http){
    
    var key = "AIzaSyCT-ihs1AcQioKs_74BqCeW6d2WqtEaNgc";

    var base = "https://maps.googleapis.com/maps/api/place/autocomplete/json?key="+key; 

    this.predict = function(keyWord){
        console.log(keyWord);
        return $http.get(base+'&input='+keyWord);
    }
});

services.service('userService', function($http){

    this.getUser = function(username){
        console.log(username);
        return $http.get(baseUrl+'/api/users/'+username);
    }
})