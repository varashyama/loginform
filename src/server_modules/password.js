const argon2 = require('argon2');

const hashPassword = (password) => {
    return argon2.hash(password)
};

const verifyPassword = (password, hashpassword) => {
        
    return argon2.verify(hashpassword,password)
};


module.exports = {
    hash : hashPassword,
    verify : verifyPassword
};