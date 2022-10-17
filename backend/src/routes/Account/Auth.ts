import Express from 'express';

const Auth: Express.Handler = (req, res) => {
    res.success(req.user);
}

export default Auth;