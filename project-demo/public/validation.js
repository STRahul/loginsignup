    function validate(){

        let age = document.getElementById("age").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
        let sletter = /[a-z]/;
        let cletter = /[A-Z]/;
        let number = /[0-9]/;
        let symb = /[!,@,#,$,%,&,*]/;
        if(!number.test(age)){
            alert('age must be number!');
            return false;
        }
        else if(email.length<=0){
            alert('email can not empty!');
            return false;
        }
        else if(!reg.test(email)){
            alert('email format is invalid!');
            return false;
        }
        else if(password.length<8){
            alert('password must contain atleast 8 character');
            return false;
        }
        else if(!sletter.test(password)){
            alert("Password must contain atleast one lowercase");
            return false;
        }
        else if(!cletter.test(password)){
            alert("Password must contain atleast one uppercase");
            return false;
        }
        else if(!number.test(password)){
            alert("Password must contain atleast one numeric value");
            return false;
        }
        else if(!symb.test(password)){
            alert("Password must contain atleast one special character");
            return false;
        }
        else 
        return true;

    }
