const jsonServer = require('json-server');

const database = require('./server.json');

- const { PORT = 8081 } = process.env;
+ const PORT = parseInt(process.env.PORT ?? '8081', 10);
const server = jsonServer.create();
const router = jsonServer.router('server.json');
const middleware = jsonServer.defaults();

server.use(middleware);
server.use(router);

server.listen(PORT, () => {
  console.info(`    JSON-Server is running at port ${PORT}\n`);
  console.info('    Available endpoints:');

  Object.keys(database).forEach((endpoint) => {
    console.info(`        http://localhost:${PORT}/${endpoint}`);
  });
});
