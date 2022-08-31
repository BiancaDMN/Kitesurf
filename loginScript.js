var attempt = 3; 

function login(){

    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if ( username == "test@domain.com" && password == "Test_123"){

        alert ("Login successfully");

        window.location = "dashboardIndex.html";

        return false;

    }else{

        attempt --;

        alert("You have left "+attempt+" attempt;");

        if( attempt == 0){

            document.getElementById("email").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;

            return false;
        }
    }
}