const {user} = require('../../models')


exports.users = async (req, res)=>{
    try {
        const users = await user.findAll({
            where: {
                role: "user"
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        res.status(200).send({
            status: 'Success',
            data:{
                users
            }
        })
    } catch (error) {
        res.send({
            status: "Error",
            message: (error.message)
        })
    }
}
exports.getuser = async (req, res)=>{
    try {
        const {id} = req.params;

        const profile = await user.findOne({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'role']
            }
        })

        res.send({
            status: 'Success',
            data: {
                profile
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.updateU = async (req, res)=>{
    try {
        const {id} = req.params;

        await user.update(req.body,{
            where: {
                id
            },
        })
        const updateduser = await user.findOne({ 
            where:{
                id
            },
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt', 'password']
            }
        })

        res.send({
            status: 'Success',
            data: {
                profile: updateduser
            },
            message: "Update Book Success"
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: console.log(error.message)
        })
    }
}
exports.deleteuser = async (req, res)=>{
    try {
        const {id} = req.params;

        const deleteUser = await user.destroy({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'Success',
            data: `Delete User id ${id} Success`
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}