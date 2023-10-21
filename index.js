const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();
app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`Port ${port} is running fine.`);
})


const { MongoClient, ServerApiVersion,  ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g3o7kaw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db("StyleJunction");
    const brandsCollection = database.collection("brandsCollection");
    const brandProducts = database.collection('brandProductsCollection');
    const myCartCollection = database.collection('myCart');


    app.get('/brands', async (req, res) => {
        const brands = brandsCollection.find();
        const result = await brands.toArray();
        res.send(result)
    })

    app.get('/brands/:name', async (req, res) => {
        const brandName = req.params.name;
        const query = { name : brandName};
        const result = await brandsCollection.findOne(query);
        res.send(result);
        // console.log(result);
    })

    app.get('/brandProducts/:name', async (req, res) => {
        const brandName = req.params.name;
        const query = { brand : brandName};
        const products = brandProducts.find(query);
        const result = await products.toArray();
        res.send(result);
    })

    app.get('/brandProducts', async (req, res) => {
        const cursor = brandProducts.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/brandProductss/:id', async (req, res) => {
        console.log('hello');
        const id = req.params.id;
        const query = { _id : new ObjectId(id)};
        const result = await brandProducts.findOne(query);
        res.send(result);
        console.log(id);
    })

    app.get('/cart/:email', async (req, res) => {
        const findEmail = req.params.email;
        const query = { email : findEmail };
        const cursor = myCartCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    })


    app.post('/addProduct', async (req, res) => {
        const product = req.body;
        const result = await brandProducts.insertOne(product)
        res.send(result);
    })

    app.post('/cart', async (req, res) => {
        const data = req.body;
        const result = await myCartCollection.insertOne(data);
        res.send(result)
        console.log(result);
    })

    app.put('/update/:id', async (req, res) => {
        const id = req.params.id;
        const data = req.body;

        const filter = { _id : new ObjectId(id)};
        const updateProduct = {
            $set : {
                name : data.name,
                brand : data.brand,
                type : data.type,
                price : data.price,
                rating : data.rating,
                details : data.description,
                img : data.img
                }
            }
            const result = await brandProducts.updateOne(filter, updateProduct);
            res.send(result);
    })

    app.delete('/delete/:id' , async (req, res) => {
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await myCartCollection.deleteOne(query);
        res.send(result);
     })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello from server side port 5000.')
})