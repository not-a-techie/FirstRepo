const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const {MongoClient}=require('mongodb')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
const uri ="mongodb://localhost:27017"
const client=new MongoClient(uri)
app.use(express.static('public'))


app.post('/addDetails',async(req,res)=>
{
    console.log(req.body)
    const result=await addTheUser(client,req.body)
})

app.post('/validateDetails', async (req, res) => {
    // console.log(req.body)
    const result = await validateTheUser(client, req.body)
})

app.get('/',(req,res)=>
{
    
})

async function addTheUser(client,data)
{
    await client.connect()
    const status=await client.db("college").collection('students').insertOne(data)
    console.log(status)
}

async function validateTheUser(client,data)
{
    await client.connect()
    const status = await client.db("college").collection('students').findOne({"username":`${data.username}`})
    if(data.password===status.password)
    {
        console.log("Valid user")
    }
    else{console.log("Invalid User")}
}







app.listen(3000)