const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



// Middleware
app.use(cors());
app.use(express.json());






const uri = "mongodb+srv://todoapp:yEGc186emUHaCWc0@cluster0.secdjxe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){

  try{

    const todoAppDataCollection = client.db('todoApp').collection('messages');
    const todoAppSectorCollection = client.db('todoApp').collection('sectors');


    

    app.get('/sectors', async (req, res) => {
      let query = {};
      const cursor = todoAppSectorCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });



    
    app.post('/message', async (req, res) => {
      const message = req.body;
      const result = await todoAppDataCollection.insertOne(message);
      res.send(result);
    });

    
    app.get('/message', async (req, res) => {
      let query = {};
      const cursor = todoAppDataCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.delete('/message/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await todoAppDataCollection.deleteOne(query);
      res.send(result);
    })


  }

  finally{

  }

}

run().catch(err=> console.error(err));



app.get('/',(req, res) =>{
  res.send('Hello !!!  Todo Aplication Server is Running.......');
});


app.listen(port, () =>{
  console.log(`The Server is running on ${port} port`);
});