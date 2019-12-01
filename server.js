const app           = require('express')();
const bodyParser    = require("body-parser");
const dotenv        = require('dotenv');
const bot           = require('./bot');

dotenv.config();

app.use(bodyParser.urlencoded({extended: true}))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type');
  next();
});


app.post('/contact/', (req, res) => {
  const data = req.body;
  bot.telegram.sendMessage(process.env.PRIVATE_GROUP, `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`);
  res.status(200).send({});
})

app.get('/session-check/', (req, res) => {
  console.log("Session check is successful!");
  res.status(200).send({});
})

app.listen(process.env.PORT || 8000, () => {
  bot.launch()
  console.log('Server is running...');
});