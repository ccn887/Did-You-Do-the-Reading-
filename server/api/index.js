const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use('/text', require('./text'))
router.use('/keywordText', require('./keywordText'))
router.use('/plotText', require('./plotText'))

router.use('/quoteText', require('./quoteText'))
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
