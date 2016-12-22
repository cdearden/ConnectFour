const express = require('express');
const app = express();

const paths = {
  public: __dirname + '/../client'
};

console.log(paths.public);
app.use(express.static(paths.public));

app.listen(process.env.PORT || 8080, () => {
  console.log("Server listening on port", port);
})
