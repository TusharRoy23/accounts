import * as Yup from 'yup';

const LoginValidator = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required()
});

const RegisterValidator = Yup.object().shape({
    regUsername: Yup.string().min(3).required(), 
    regEmail: Yup.string().email().required(),
    regPassword: Yup.string().min(6).required()
});

export default (req, res, next) => {
    const { email, password } = req.body;
    if (email && password) {
        LoginValidator.validate({ email, password })
        .then(() => next())
        .catch(error => res.status(422).json({
            [error.path]: error.message
        }));
    }

    const { regEmail, regPassword, regUsername } = req.body;
    if (regEmail && regPassword && regUsername) {
        
        RegisterValidator.validate({ regEmail, regPassword, regUsername })
        .then(() => next())
        .catch(error => res.status(422).json({
            [error.path]: error.message
        }));
    }
};
