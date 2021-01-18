const express = require('express');
const routeController = require('./controller/routes');

const app = express();

//set up template engine
app.set('view engine', 'ejs');

//serving static files
app.use('/assets', express.static('assets'));

//send the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

//fire controllers
routeController(app);

app.listen(3000, () =>{
    console.log('Server Started on port:3000');
})
