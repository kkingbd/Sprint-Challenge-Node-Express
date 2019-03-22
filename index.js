// play this: https://www.youtube.com/watch?v=d-diB65scQU

const server = require('./api/server.js');
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`\n*** Server is running on http://localhost:${port} ***\n`);
});