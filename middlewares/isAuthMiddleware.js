
const isAuth = (req, res, next) => {

    if(req.session.isAuth)
        {
            next();
        }
    else
    {
        res.send({
            status : 400,
            message:"session expired, please login..." 
        })
    }
}

module.exports = isAuth;