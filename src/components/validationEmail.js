import React from "react";

function ValidateEmail(email){
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if(result===true){
        this.setState({
            emailError:false,
            email:email
        })
    } else{
        this.setState({
            emailError:true
        })
    }
}

export default ValidateEmail;