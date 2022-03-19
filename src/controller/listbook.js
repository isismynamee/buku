const {listbook, user, genrebook} = require('../../models');

exports.postlistbook = async (req, res)=>{
    try {
        const {id} =  req.params
        const datalistbook = req.body
        
        const mylist = await listbook.create(datalistbook, {
            where: {
                id
            },
            include:[
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password", 'role', 'image', 'phone', 'address', 'id', 'gender'],
                    },
                },
                {
                    model: genrebook,
                    as: "genre",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ]
        })
        
        res.send({
            status: 'Success',
            data: mylist
        })
    } catch (error) {
        console.log(error.message);
        res.send({
            status: 'Error',
            message: (error.message)
        });
        
    }
}
exports.listbooks = async (req, res)=>{
    try {
        const listbooks = await listbook.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            },
            include:[
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password", 'role', 'image', 'phone', 'address', 'id', 'gender'],
                    },
                },
                {
                    model: genrebook,
                    as: "genre",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ]
        })

        res.status(200).send({
            status: 'Success',
            data:{
                listbooks
            }
        })
    } catch (error) {
        res.send({
            status: "Error",
            message: (error.message)
        })
    }
}
exports.listbook = async (req, res)=>{
    try {
        const {id} = req.params;

        const listbookdetail = await listbook.findOne({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            },
            include:[
                {
                    model: genrebook,
                    as: "genre",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password", 'role', 'image', 'phone', 'address', 'id', 'gender'],
                    },
                },
            ]
        })

        res.send({
            status: 'Success',
            data: {
                listbookdetail
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}
exports.deletelistbook = async (req, res)=>{
    try {
        const {id} = req.params;

        await listbook.destroy({
            where:{
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'Success',
            data: `Delete listbook id ${id} Success`
        })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    }
}