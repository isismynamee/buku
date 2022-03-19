const {user} = require('../../models')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res)=>{
    const schemajoi = Joi.object({
        fullname: Joi.string().min(2).required(),
        email: Joi.string().email().min(4).required(),
        password: Joi.string().min(6).required()
    })

    const {error} =  schemajoi.validate(req.body)

    if(error)
    return res.status(404).send({
        error:{
            message: console.log(error.message)
        }
    })
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUserR = await user.create({
            fullname: req.body.fullname,
            email: req.body.email,
            role: "user",
            password: hashedPass
        })

        const token = jwt.sign({ id: newUserR.id }, process.env.SECRET_KEY)

        res.status(200).send({
            status: 'Success',
            data: {
                user: {
                    email: req.body.email,
                    token
                }
            }
        })
    } catch (error) {
        res.send({
            status: 'Failed, Cant Register',
            message: (error.message)
        })
    }
}
exports.login = async (req, res) => {
    const schemajoi = Joi.object({
      email: Joi.string().email().min(4).required(),
      password: Joi.string().min(6).required(),
    });
  
    const { error } = schemajoi.validate(req.body);
  
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
  
    try {
      const newUserL = await user.findOne({
        where: {
          email: req.body.email,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      
      const valid = await bcrypt.compare(req.body.password, newUserL.password);
  
      if (!valid) {
        return res.status(400).send({
          status: "failed",
          message: (error.message)
        });
      }
  
      const token = jwt.sign({ id: newUserL.id }, process.env.SECRET_KEY);
  
      res.status(200).send({
        status: "success...",
        data: {
          fullname: newUserL.fullname,
          email: newUserL.email,
          token
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Server Error",
      });
    }
  };
  exports.checkAuth = async (req, res) => {
      try {
        const id = req.user.id;
    
        const dataUser = await user.findOne({
          where: {
            id, role: "admin"
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });
    
        if (!dataUser) {
          return res.status(404).send({
            status: "failed",
          });
        }
    
        res.send({
          status: "success...",
          data: {
            user: {
              id: dataUser.id,
              fullname: dataUser.fullname,
              email: dataUser.email,
              role: dataUser.role,
            },
          },
        });
      } catch (error) {
        console.log(error);
        res.status({
          status: "failed",
          message: "Server Error",
        });
      }
    };