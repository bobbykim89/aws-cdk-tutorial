import express from 'express'
import serverlessExpress from '@codegenie/serverless-express'
import { type Handler } from 'aws-lambda'

const STAGE = process.env.STAGE
const NODE_ENV = process.env.NODE_ENV

const apiRoutes = () => {
  const routes = express.Router()

  routes.get('/hello', (req: any, res: any) => {
    return res.status(200).json({ message: 'hello from pollito pio!' })
  })
  routes.get('/goodbye', (req: any, res: any) => {
    return res.status(200).json({ message: 'goodbye from pollito pio!' })
  })
  return routes
}

const app = express()
  .use(express.json())
  .get('/', (req: any, res: any) => {
    return res.status(200).json({
      message: 'Hello from Pollito!',
      stage: STAGE,
      node_env: NODE_ENV,
    })
  })
  .use(apiRoutes())

if (NODE_ENV !== 'production') {
  app.listen(3000, () => console.log('API running on http://localhost:3000'))
}

export const handler: Handler = serverlessExpress({ app: app })
