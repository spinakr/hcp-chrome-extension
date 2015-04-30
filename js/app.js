var hcp = angular.module('human-computable-pws', [
        'human-computable-pws.controllers',
        'ngAnimate', 
        'chromeStorage',
        'ngCookies',
        'ngRoute',
        'ngResource'
        ]);

hcp.config( ['$compileProvider', function( $compileProvider  ) {
        var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
        var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1) 
            + '|chrome-extension:' +currentImgSrcSanitizationWhitelist.toString().slice(-1);

        console.log("Changing imgSrcSanitizationWhiteList from "+currentImgSrcSanitizationWhitelist+" to "+newImgSrcSanitizationWhiteList);
        $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);
    }
]);

hcp.config(['$routeProvider', function($routeProvider){
        $routeProvider.
            when('/',{
                templateUrl: 'partials/content.html',
                controller: 'MainController'
            }).
            otherwise({
                redirectTo: '/'
            });
}]);

function searchList(site, sites){                                                                                                                                                                           
    if(sites == undefined) return false;
    for(var i = 0; i<sites.length; i++){
        if(sites[i].name == site){
            return sites[i];
        }
    }
    return false;
}



function Site(name){
    this.name = name;
    this.challenges = [];

    for(var j=0; j<14; j++){
        this.challenges.push(randomChallenge()); 
    }
}

function randomChallenge(){
    var letters = "abcdefghijklmnopqrstuvwxyz";
    var ch = [];

    for(var z=0; z<14; z++){
        ch.push(letters.charAt(Math.floor(Math.random()* 26)));
    }
    return ch;
}

