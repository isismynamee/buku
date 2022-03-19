const cron = require('node-cron');
const {transaction, user} = require('../../models');

exports.posttransaction = async (req, res)=>{
    try {
        const {datatransaction} = req.body

        let addtransaction = await transaction.create(
            {
            ...datatransaction,
            image: req.file.filename,
            idUser: req.body.idUser,
            remainingactive: req.body.remainingactive,
            userstatus: req.body.userstatus,
            paymentstatus: req.body.paymentstatus,
        })
        
        addtransaction = JSON.parse(JSON.stringify(addtransaction))
        
        addtransaction = {
            ...addtransaction,
            image: process.env.FILE_PATH + addtransaction.image
        }
        
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
                    exclude: ['createdAt', 'updatedAt', 'id', 'password', 'image', 'role', 'address', 'gender', 'phone']
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

        if(req.body.paymentstatus == 'Approve'){

        await transaction.update({
                userstatus: 'Active',
                remainingactive: 30,
                paymentstatus: req.body.paymentstatus
             },
             {
                where: {
                     id
                }
             })
        }else{

            await transaction.update({
                    userstatus: 'Active',
                    paymentstatus: req.body.paymentstatus
                 },
                 {
                    where: {
                         id
                    }
                 })
        }

        if(req.body.paymentstatus == 'Cancel'){

            await transaction.update({
                    userstatus: 'Not Active',
                    remainingactive: 0,
                    paymentstatus: req.body.paymentstatus
                 },
                 {
                    where: {
                         id
                    }
                 })
        }

        const updatedtransaction = await transaction.findOne({ 
            where:{
                id
            },
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            },
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'role', 'id', 'password', 'email', 'address', 'phone', 'image', 'status', 'gender']
                }
            }
        })

        res.send({
            status: 'Success',
            data: {
                updatedtransaction,
                // paymentstatus: calendar
            },
            message: "Update transaction Success"
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error)
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