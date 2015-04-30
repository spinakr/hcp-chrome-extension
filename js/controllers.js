angular.module('human-computable-pws.controllers', [])
.controller("MainController", function($timeout, $scope, chromeStorage){
    //initial values
    $scope.user = "";
    $scope.pw=0;
    $scope.selectedSite=null;
   
    //function adding new site to the user
    $scope.newSite = function(){
        var newSite = new Site($scope.url);
        $scope.user.sites.push(newSite);
        $scope.selectedSite = newSite;
        chromeStorage.set("user", $scope.user);
        $scope.newSiteButton = false;
    }
   
    //try to load the user object from storage, if no user is present, create new.
    try{
        chromeStorage.getOrElse("user", function(){
            var newUser = {
                name: "user",
                sites: [
                    new Site("accounts.google.com"),
                    ]
            };
            chromeStorage.set("user", newUser);
            return newUser;
        }).then(function(keyValue){
            $scope.user = keyValue;
        });
    }
    catch(err){
        console.log("Not run as extension")
    }

    //receive messages sent from the content script if url or password length changes
    var tmp;
    function handleMessage(){
        if(tmp.pwValue){
            $scope.pw = tmp.pwValue-1;
            console.log("pw: %o", $scope.pw);
            console.log("ombjects:   %o", $scope.user)
        }
        if(tmp.newUrl){
            $scope.url = tmp.newUrl;
            var site = searchList($scope.url, $scope.user.sites);
            if(!site){
                console.log("URL: " + $scope.url + "  sites:  %o ", $scope.user.sites);
                $scope.newSiteButton=true;
                $scope.selectedSite = null ; 
            }else{
                $scope.newSiteButton=false;
                $scope.selectedSite = site;
            }
        }
    }
    //add eventhandler listening for messages from content script
    try{
        chrome.runtime.onMessage.addListener(function(message,sender){
            tmp = message;
            $timeout(handleMessage);
        });            
    }
    catch(err){
        console.log("not extension")
    }
});


