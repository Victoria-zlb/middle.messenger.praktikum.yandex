const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.static('./'));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 
app.use(express.static('./static'));
app.use(express.static('./src/pages/authorization/'));
app.use(express.static('./src/pages/registration/'));