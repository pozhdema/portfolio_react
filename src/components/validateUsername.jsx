import React from "react";

function ValidateUsername(username){
    const pattern = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    const result = pattern.test(username);
    if(result===true){
        this.setState({
            usernameError:false,
            username:username
        })
    } else{
        this.setState({
            usernameError:true
        })
    }
}

export default ValidateUsername;