import * as express from 'express'
const router = express.Router()

/**
 * If needed, add some route here, for instance:
 * router.get('/api/content', (req, res) => { ... });
 * see Express API endpoints for more information
 */

router.get('/hello', (req, res) => {
  res.send('Hello World !')
})

export const apiRouter = router
