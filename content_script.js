window.onload = setTimeout(updateUrl(),500);
var passwords = getPwdInputs(); 
var pwField = passwords[0];

if(pwField){
    pwField.addEventListener('input', function (callback){

        console.log("input content: " + pwField.value.length);
        chrome.runtime.sendMessage({pwValue: pwField.value.length+1}, function(respons){
            console.log("Respons pw changed: " + respons);
        });
        
    });
}

function getPwdInputs() {
      var ary = [];
        var inputs = document.getElementsByTagName("input");
        for (var i=0; i<inputs.length; i++) {
            if (inputs[i].type.toLowerCase() === "password") {
                      ary.push(inputs[i]);
            }
        }
          return ary;
}

function updateUrl(){
    chrome.runtime.sendMessage({newUrl: window.location.hostname},function(respons){
        console.log("URL changed to: "+ window.location.hostname);
    });
}
