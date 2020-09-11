const validate = values => {
    const errors ={};

    if (!values.username) {
        errors.username ='form.error.required'
    }else if (values.username.length > 15){
        errors.username = 'form.error.username'
    }
    if (!values.email) {
        errors.email = 'form.error.required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'form.error.email'
    }
    if (!values.password) {
        errors.password = 'form.error.required'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%\^&\*]))(?=.{8,20})/i.test(values.password)) {
        errors.password = 'form.error.password'
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'form.error.required'
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'form.error.password'
    }
    return errors
};

export default validate;