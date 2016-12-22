const express = require('express');
const app = express();

const paths = {
  public: __dirname + '/../client'
};

console.log(paths.public);
app.use(express.static(paths.public));


let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server listening on port", port);
})
