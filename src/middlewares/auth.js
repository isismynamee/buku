const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).send({
            message: (error.message) + 'Access Denied'
        })
    }

    try {
              
        const verif = jwt.verify(token, process.env.SECRET_KEY)
        // const done=()=>{
        //     if(!verif({
        //         where:{
        //             role: "admin"
        //         }})
        //     );
        // }

        req.user = verif
        next()
    } catch (error) {
        res.status(404).send({
            message: console.log(error.message)
        })
    }
}