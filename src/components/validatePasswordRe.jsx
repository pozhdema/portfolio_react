import React from "react";

function validatePasswordConfirm(password, confirmPassword) {
    const resultC = confirmPassword;
    const result = password;
    if (result === resultC) {
        this.setState({
            passwordConfirmError: false,
            confirmPassword: confirmPassword
        })
    } else {
        this.setState({
            passwordConfirmError: true
        })
    }
};

export default validatePasswordConfirm;