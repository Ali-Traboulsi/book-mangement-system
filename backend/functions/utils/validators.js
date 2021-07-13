const isEmpty = (string) => {
    return string.trim() === '';
}

// validate Email Foramtting
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email.match(emailRegEx);
}


const validateLoginData = (data) => {
    const errors = {};
    if (isEmpty(data.email)) errors.email = "Email must not be empty";
    if (isEmpty(data.password)) errors.password = "Password must not be empty";

    return {
        errors,
        valid: Object.keys(errors).length === 0,
    }
}


const validateSignUpData = (data) => {
    const errors = {};

    if (Object.keys({ data }).length === 0) {
        errors.email = errors.password = errors.username = "Must not be empty";
    }

    if (!isEmail(data.email)) return errors.email = "Must be a valid email address";

    return {
        errors,
        valid: Object.keys(errors).length === 0,

    }
}

module.exports =
    {
        validateLoginData,
        validateSignUpData
    }