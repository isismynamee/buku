const {genrebook, user} = require('../../models');

exports.postgenrebook = async (req, res)=>{
    try {
        const datagenrebook = req.body
        
        const genre = await genrebook.create(datagenrebook)
        
        res.send({
            status: 'Success',
            data: {
                idBook: genre.idBook,
                idTopics: genre.idTopics
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
exports.genrebooks = async (req, res)=>{
    try {
        const genrebooks = await genrebook.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            }
        })

        res.status(200).send({
            status: 'Success',
            data:{
                genrebooks
            }
        })
    } catch (error) {
        res.send({
            status: "Error",
            message: (error.message)
        })
    }
}
exports.genrebook = async (req, res)=>{
    try {
        const {id} = req.params;

        const genrebookdetail = await genrebook.findOne({
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
                genrebookdetail
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.updategenrebook = async (req, res)=>{
    try {
        const {id} = req.params;

        await genrebook.update(req.body,{
            where: {
                id,
            },
        })

        res.send({
            status: 'Success',
            data: {
                idTopics: req.body.idTopics,
                idBook: req.body.idBook
            },
            message: "Update genrebook Success"
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.deletegenrebook = async (req, res)=>{
    try {
        const {id} = req.params;

        await genrebook.destroy({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'Success',
            data: `Delete genrebook id ${id} Success`
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}