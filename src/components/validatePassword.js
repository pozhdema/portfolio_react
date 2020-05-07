import React from "react";

function ValidatePassword(password){
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%\^&\*]))(?=.{8,20})/;
    const result = pattern.test(password);
    if(result===true){
        this.setState({
            passwordError:false,
            password:password
        })
    } else{
        this.setState({
            passwordError:true
        })
    }
}

export default ValidatePassword;