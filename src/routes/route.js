const express = require('express')
const router = express.Router()

const {auth} = require('../middlewares/auth')
const {uploadFile} = require('../middlewares/uploadFile')

const { users, getuser, updateU, deleteuser,} = require('../controller/user')
const {login, register, checkAuth} = require('../controller/landing')
const { books, book, updatebook, deletebook, postbook } = require('../controller/book')
const { posttransaction, transactions, transaction, updatetransaction, deletetransaction } = require('../controller/transaction')
const { posttopic, topics, topic, updatetopic, deletetopic } = require('../controller/topics')
const { postgenrebook, genrebooks, genrebook, updategenrebook, deletegenrebook } = require('../controller/genre')
const { postlistbook, listbooks, listbook, deletelistbook } = require('../controller/listbook')

router.post('/register', register)
router.post('/login', login)
router.get('/checkin', auth, checkAuth)

//user
router.get('/users', users)
router.get('/user/:id', getuser)
router.patch('/user/:id', auth, updateU)
router.delete('/user/:id', auth, deleteuser)

//book
router.post('/book', uploadFile('image'), auth, postbook)
router.get('/books', books)
router.get('/book/:id', book)
router.patch('/book/:id', auth, updatebook)
router.delete('/book/:id', auth, deletebook)

//topic
router.post('/topic', auth, posttopic)
router.get('/topics', topics)
router.get('/topic/:id', topic)
router.patch('/topic/:id', auth, updatetopic)
router.delete('/topic/:id', auth, deletetopic)

//genre
router.post('/genre', auth, postgenrebook)
router.get('/genres', genrebooks)
router.get('/genre/:id', genrebook)
router.patch('/genre/:id', auth, updategenrebook)
router.delete('/genre/:id', auth, deletegenrebook)

//listbook
router.post('/listbook', auth, postlistbook)
router.get('/listbooks', listbooks)
router.get('/listbook/:id', listbook)
router.delete('/listbook/:id', auth, deletelistbook)

//transaction
router.post('/transaction', uploadFile('image'), auth, posttransaction)
router.get('/transactions', transactions)
router.get('/transaction/:id', transaction)
router.patch('/transaction/:id', auth, updatetransaction)
router.delete('/transaction/:id', auth, deletetransaction)

module.exports = router