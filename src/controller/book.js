const {book} = require('../../models')

exports.postbook = async (req, res)=>{
    try {        

        const d = new Date()
        const {data} = req.body;

        let addbook = await book.create({
            ...data,
            image: req.file.filename,
            author: req.body.author,
            title: req.body.title,
            describe: req.body.describe,
            bookfile: req.body.bookfile,
            publicationdate: d,
            language: req.body.language,
            isbn: req.body.isbn
        })

        addbook = JSON.parse(JSON.stringify(addbook))

        addbook = {
            ...addbook,
            image: process.env.FILE_PATH + addbook.image
        }

        res.send({
            status: 'Success',
            data: addbook
        })
    } catch (error) {
        console.log(error.message);
        res.send({
            status: 'Error',
            message: (error.message)
        });
        
    }
}
exports.books = async (req, res)=>{
    try {
        const books = await book.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            }
        })

        res.status(200).send({
            status: 'Success',
            data:{
                books
            }
        })
    } catch (error) {
        res.send({
            status: "Error",
            message: (error.message)
        })
    }
}
exports.book = async (req, res)=>{
    try {
        const {id} = req.params;

        const bookdetail = await book.findOne({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt',]
            }
        })

        res.send({
            status: 'Success',
            data: {
                bookdetail
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.updatebook = async (req, res)=>{
    try {
        const {id} = req.params;

        await book.update(req.body,{
            where: {
                id,
            },
        })
        const updatedbook = await book.findOne({ 
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
                updatedbook
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
exports.deletebook = async (req, res)=>{
    try {
        const {id} = req.params;

        const deletebook = await book.destroy({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'Success',
            data: `Delete book id ${id} Success`
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}