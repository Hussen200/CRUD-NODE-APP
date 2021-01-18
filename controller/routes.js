const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/sales';

//connect to the database
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true })
.then((result) => console.log('connection to DataBase was succesful...'))
.catch((err) => console.log(err));

//Schema
const salesSchema = new mongoose.Schema({
    item: String
});

//model
const Sales = mongoose.model('Sales', salesSchema);


const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

module.exports = function (app) {

    app.get('/products', (req, res) => {
        //get data from mongodb and pass it to the view
        Sales.find({}, (err, data) =>{
            if(err) throw err;

            res.render('products', {
                products: data
            });
        });
    });

    app.post('/products', urlencodedParser, (req, res) => {

        //get data from the view and add it to mongodb
        const newSales = Sales(req.body).save((err, data) =>{
            if(err) throw err;

            res.json(data);
        })
    });

    app.delete('/products/:item', (req, res) => {

        //delete the requested item from mongodb
        Sales.find({item: req.params.item.replace(/\-/g, " ")}).deleteMany((err, data) =>{
            if (err) throw err;
            res.json(data);
        })
    })

    app.put('/products/:id', urlencodedParser, async (req, res) => {
        try {
            const product = await Sales.findById(req.params.id);
                  product.item = req.body.item;
            const saveIt = await product.save();
            res.json(saveIt);
        } catch (err) {
            res.send('Error');
        }
    
    })

}