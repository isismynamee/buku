const {transaction, user} = require('../../models')

exports.posttransaction = async (req, res)=>{
    try {        

        const {datatransaction} = req.body

        let addtransaction = await transaction.create(
            // where={
            //     id: req.params.id
            // },
            {
            ...datatransaction,
            image: req.file.filename,
            idUser: req.body.idUser,
            remainingactive: req.body.remainingactive,
            userstatus: req.body.userstatus,
            paymentstatus: req.body.paymentstatus,
            // include: [{
            //     model: user,
            //     as: 'user',
            //     attributes: {
            //         exclude: ['createdAt', 'updatedAt', 'password', 'image', 'role', 'address', 'gender', 'phone']
            //     }
            // }]
        })

        addtransaction = JSON.parse(JSON.stringify(addtransaction))

        addtransaction = {
            ...addtransaction,
            image: process.env.FILE_PATH + addtransaction.image
        }
        console.log(datatransaction)
        res.send({
            status: 'Success',
            data: addtransaction
        })
    } catch (error) {
        console.log(error.message);
        res.send({
            status: 'Error',
            message: (error.message)
        });
        
    }
}
exports.transactions = async (req, res)=>{
    try {
        const transactions = await transaction.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            },
            include: [{
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password', 'image', 'role', 'address', 'gender', 'phone']
                }
            }]
        })

        res.status(200).send({
            status: 'Success',
            data:{
                transactions
            }
        })
    } catch (error) {
        res.send({
            status: "Error",
            message: (error.message)
        })
    }
}
exports.transaction = async (req, res)=>{
    try {
        const {id} = req.params;

        const transactiondetail = await transaction.findOne({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            },
            include: [{
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id', 'password', 'image', 'role', 'address', 'gender', 'phone']
                }
            }]
        })

        res.send({
            status: 'Success',
            data: {
                transactiondetail
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.updatetransaction = async (req, res)=>{
    try {
        const {id} = req.params;

        await transaction.update(req.body,{
            where: {
                id
            },
        })
        const updatedtransaction = await transaction.findOne({ 
            where:{
                id
            },
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'Success',
            data: {
                updatedtransaction
            },
            message: "Update transaction Success"
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: console.log(error.message)
        })
    }
}
exports.deletetransaction = async (req, res)=>{
    try {
        const {id} = req.params;

        const deletetransaction = await transaction.destroy({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'Success',
            data: `Delete transaction id ${id} Success`
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}