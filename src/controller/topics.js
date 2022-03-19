const {topic} = require('../../models')

exports.posttopic = async (req, res)=>{
    try {        

        const {id} = req.params
        const b = req.body

        const topices = await topic.create(b, {
            where: {
                id
            }
        })

        res.send({
            status: 'Success',
            data: {
                Topic: topices.topic
            }
        })
    } catch (error) {
        console.log(error.message);
        res.send({
            status: 'Error',
            message: (error.message)
        });
        
    }
}
exports.topics = async (req, res)=>{
    try {
        const topics = await topic.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            }
        })

        res.status(200).send({
            status: 'Success',
            data:{
                topics
            }
        })
    } catch (error) {
        res.send({
            status: "Error",
            message: (error.message)
        })
    }
}
exports.topic = async (req, res)=>{
    try {
        const {id} = req.params;

        const topicdetail = await topic.findOne({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            }
        })

        res.send({
            status: 'Success',
            data: {
                topicdetail
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.updatetopic = async (req, res)=>{
    try {
        const {id} = req.params;

        await topic.update(req.body,{
            where: {
                id,
            },
        })

        res.send({
            status: 'Success',
            data: {
                updatedtopic: req.body
            },
            message: "Update topic Success"
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: console.log(error.message)
        })
    }
}
exports.deletetopic = async (req, res)=>{
    try {
        const {id} = req.params;

        const deletetopic = await topic.destroy({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'Success',
            data: `Delete topic id ${id} Success`
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: console.log(error.message)
        })
    }
}