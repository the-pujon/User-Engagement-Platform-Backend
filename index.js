const app = require("./app");
//const config = require("./src/config/config");
const port =  500;

app.listen(port, async (req, res) => {
  console.log(`Your server is running in http://localhost:${port}`)
});
