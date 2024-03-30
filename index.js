const app = require("./app");
//const config = require("./src/config/config");
const port =  5000;

app.listen(port, async (req, res) => {
  console.log(`Your server is running in ${process.env.FRONTEND_URL} or http://localhost:${port}`)
});
