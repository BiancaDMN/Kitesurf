function login(){

    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(username == '' && password == '') {

        document.getElementById("email").style.borderColor = '#dc3545';
        document.getElementById("email").style.boxShadow = '0 0 0 0.25rem rgba(255, 0, 0, 0.2)';
        document.getElementById('emailValidation').innerHTML = 'Email is required';

        document.getElementById('password').style.borderColor = 'red';
        document.getElementById('password').style.boxShadow = '0 0 0 0.25rem rgba(255, 0, 0, 0.2)';
        document.getElementById('passwordValidation').innerHTML = 'Password is required';

    } else if(username != 'test@domain.com'  && password != 'Test_123') {

        document.getElementById("email").style.borderColor = '#dc3545';
        document.getElementById("email").style.boxShadow = '0 0 0 0.25rem rgba(255, 0, 0, 0.2)'; 
        document.getElementById('emailValidation').innerHTML = 'Enter a valid email address';
        document.getElementById('emailValidation').style.color = 'green';

        document.getElementById('password').style.borderColor = 'red';
        document.getElementById('password').style.boxShadow = '0 0 0 0.25rem rgba(255, 0, 0, 0.2)';
        document.getElementById('passwordValidation').innerHTML = 'Enter a valid password';
        document.getElementById('passwordValidation').style.color = '#dc3545';

    } else {
        
        if(username == "test@domain.com" && password == "Test_123"){

            window.location = "index.html";

        } 

    }    
        

}