import User from "@model/User";

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ userEmail:email });
    if (user) {
        if (user.comparePasswords(password)) {
            const token = user.generateToken();
            req.session.token = token;
            req.session.userId = user._id;

            return res.status(201).json({
                user, 
                token,
                status: true 
            });
        }
        else{
            return res.status(201).json({
                msg: 'Username/Password is incorrect !',
                status: false
            });
        }
    }
    else{
        return res.status(201).json({
            msg: 'Username/Password is incorrect !',
            status: false
        });
    }
};

const getUserInfo = async (req, res) => {
    if (req.session.userId) {
        const user = await User.findOne({_id:req.session.userId});
        if (user) {
            return res.json({
                user
            });
        }
    }
    return res.status(400).json({
        msg: 'User not found !'
    });
};

const getUserDetails = async (req, res) => {
    const parse = JSON.parse(req.body.auth);
    try {
        if (parse) {
            if (parse.token === req.session.token) {
                const user = await User.findOne({ _id:req.session.userId });
                if (user) {
                    return res.json({
                        user
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
    
    
    return res.status(400).json({
        msg: 'User Not Logged In'
    });
};

const register = async (req, res) => {
    const { regEmail, regPassword, regUsername } = req.body;

    const user = await User.create({
        userName: regUsername,
        userEmail: regEmail,
        userPassword: regPassword
    });

    if (user) {
        const token = user.generateToken();
        return res.status(201).json({user, token, status: true});
    }
    else{
        return res.status(201).json({
            status: false
        });
    }
};

const logout = async (req, res) => {
    if (req.body.log_exp == '3227') {
        
        if (req.session.userId) {
            req.session.userId = null;
            req.session.token = null;

            return res.status(200);
        }
        return res.status(201);
    }
};

export default {
    getUserInfo,
    login,
    getUserDetails,
    register,
    logout
};