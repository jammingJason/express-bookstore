/** Server for bookstore. */

const app = require('./app');
const portNum = 3000;
app.listen(portNum, () => {
  console.log(`Server starting on port ${portNum}.  Enjoy!!!!!!!`);
});
