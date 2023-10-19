const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`Port ${port} is running fine.`);
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mdarifulislam1077:anMk1M6h2l8Po6VG@cluster0.g3o7kaw.mongodb.net/?retryWrites=true&w=majority";

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
    await client.connect();
    const database = client.db("StyleJunction");
    const brandsCollection = database.collection("brandsCollection");


    app.get('/brands', async (req, res) => {
        const brands = brandsCollection.find();
        const result = await brands.toArray();
        // console.log(result);
        res.send(result)
    })

    app.get('/products/:name', async (req, res) => {
        const name = req.params.name;
        console.log(name);
        if(name === 'Gucci') {
           const gucciCollection = database.collection('gucciCollection');
           const products = gucciCollection.find();
           const productsArr = await products.toArray();
           console.log(productsArr);
           res.send(productsArr)
        }
        else if(name === 'Addidas') {
            const addidasCollection = database.collection('addidasCollection');
           const products = addidasCollection.find();
           const productsArr = await products.toArray();
        //    console.log(productsArr);
           res.send(productsArr)
        }
        else if(name === 'Zara') {
            const zaraCollection = database.collection('zaraCollection');
           const products = zaraCollection.find();
           const productsArr = await products.toArray();
           console.log(productsArr);
           res.send(productsArr)
        }
        else if(name === 'H&M') {
            const hAndCollection = database.collection('h&mCollection');
           const products = hAndCollection.find();
           const productsArr = await products.toArray();
           console.log(productsArr);
           res.send(productsArr)
        }
        else if(name === 'Nike') {
            const nikeCollection = database.collection('nikeCollection');
           const products = nikeCollection.find();
           const productsArr = await products.toArray();
           console.log(productsArr);
           res.send(productsArr)
        }
        else if(name === "Levi's") {
            const levisCollection = database.collection("levi'sCollection");
           const products = levisCollection.find();
           const productsArr = await products.toArray();
           console.log(productsArr);
           res.send(productsArr)
        }
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