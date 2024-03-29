const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//libraryDB
//AfgQFd1hyQ72edSS

const uri = "mongodb+srv://libraryDB:AfgQFd1hyQ72edSS@cluster0.g0venlj.mongodb.net/?retryWrites=true&w=majority";
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g0venlj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db('libraryDB').collection('library');

    //data send server to client 
    // app.get('/product', async (req, res) => {
    //   const cursor = productCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result);
    // })
  

    //data send client to server 
    app.post('/product', async (req, res) => {
      const newProduct  = req.body;
      console.log(newProduct );

      const result = await productCollection.insertOne(newProduct )
      res.send(result)
    })

//     app.put('/product/:id', async(req, res) => {
//       const id = req.params.id;
//       const filter = {_id: new ObjectId(id)}
//       const options = { upsert: true };
//       const updatedProduct = req.body;
// 
//       const product = {
//           $set: {
//             photo: updatedProduct.photo, 
//             product_name: updatedProduct.product_name, 
//             brand_name: updatedProduct.brand_name, 
//             type: updatedProduct.type, 
//             price: updatedProduct.price, 
//             description: updatedProduct.description, 
//             rating: updatedProduct.rating
//           }
//       }
//       const result = await productCollection.updateOne(filter, product, options);
//       res.send(result);
//   })

//   app.delete('/product/:id', async (req, res) => {
//     const id = req.params.id;
//     const query = { _id: new ObjectId(id) }
//     const result = await productCollection.deleteOne(query);
//     res.send(result);
// })
  
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
  res.send('Brand Shopping server is running')
})

app.listen(port, () => {
  console.log(`Brand Shopping Server is running on port ${port}`)
})