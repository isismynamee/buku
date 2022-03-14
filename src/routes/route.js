const express = require('express')
const router = express.Router()

// const {auth} = require('../middlewares/auth')
const {uploadFile} = require('../middlewares/uploadFile')

const { users, getuser, updateU, deleteuser } = require('../controller/user')
const {login, register} = require('../controller/landing')
const { books, book, updatebook, deletebook, postbook } = require('../controller/book')
const { posttransaction, transactions, transaction, updatetransaction, deletetransaction } = require('../controller/transaction')

router.post('/register', register)
router.post('/login', login)

//user
router.get('/users', users)
router.get('/user/:id', getuser)
router.patch('/user/:id', updateU)
router.delete('/user/:id', deleteuser)

//book
router.post('/book', uploadFile('image'), postbook)
router.get('/books', books)
router.get('/book/:id', book)
router.patch('/book/:id', updatebook)
router.delete('/book/:id', deletebook)

//transaction
router.post('/transaction', uploadFile('image'), posttransaction)
router.get('/transactions', transactions)
router.get('/transaction/:id', transaction)
router.patch('/transaction/:id', updatetransaction)
router.delete('/transaction/:id', deletetransaction)

module.exports = router