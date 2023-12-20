function register(){

    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if(firstname == '' && lastname == '' && email == '' && password == '' && confirmPassword == ''){

        document.getElementById('firstname').style.borderColor = '#dc3545';
        document.getElementById('firstname').style.boxShadow = '0 0 0 0.25rem rgba(255, 0, 0, 0.2)';
        document.getElementById('firstNameValidation').innerHTML = 'First Name is required';

        document.getElementById('lastname').style.borderColor = '#dc3545';
        document.getElementById('lastname').style.boxShadow = '0 0 0 0.25rem rgba(255, 0, 0, 0.2)';
        document.getElementById('lastNameValidation').innerHTML = 'Last Name is required';

        document.getElementById('email').style.borderColor = '#dc3545';
        document.getElementById('email').style.boxShadow = '0 0 0 0.25rem rgba(255, 0, 0, 0.2)';
        document.getElementById('emailValidation').innerHTML = 'Email is required';

        document.getElementById('password').style.borderColor = '#dc3545';
        document.getElementById('password').style.boxShadow = '0 0 0 0.25rem rgba(255, 0, 0, 0.2)';
        document.getElementById('passwordValidation').innerHTML = 'Password is required';
        document.getElementById('passwordValidation').style.color = '#dc3545';

        document.getElementById('confirmPassword').style.borderColor = '#dc3545';
        document.getElementById('confirmPassword').style.boxShadow = '0 0 0 0.25rem rgba(255, 0, 0, 0.2)';
        document.getElementById('passwordConfirmationValidation').innerHTML = 'Password confirmation is required';

    } else if (confirmPassword != password){

        document.getElementById('password').style.borderColor = '#dc3545';
        document.getElementById('password').style.boxShadow = '0 0 0 0.25rem rgba(255, 0, 0, 0.2)';
        document.getElementById('confirmPassword').style.borderColor = '#dc3545';
        document.getElementById('confirmPassword').style.boxShadow = '0 0 0 0.25rem rgba(255, 0, 0, 0.2)';
        document.getElementById('passwordConfirmationValidation').innerHTML = 'The password does not match';

    } else {

        if(firstname == 'Test' && lastname == '123' && email == 'test@domain.com' && password == 'Test_123' && confirmPassword == 'Test_123'){

            alert('Account succesfully created');
            window.location = "login.html";
        }

    }

}