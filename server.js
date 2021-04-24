const jsonServer = require('json-server')
const database = require('./server.json')

const { PORT = 8081 } = process.env // eslint-disable-line no-magic-numbers
const server = jsonServer.create()
const router = jsonServer.router('server.json')
const middleware = jsonServer.defaults()

server.use(middleware)
server.use(router)

server.listen(PORT, () => {
  console.log(`    JSON-Server is running at port ${PORT}\n`)
  console.log('    Available endpoints:')

  Object.keys(database).forEach((endpoint) => {
    console.log(`        http://localhost:${PORT}/${endpoint}`)
  })
})
