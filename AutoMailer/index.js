const express=require('express')
const bodyParser=require('body-parser')
var nodemailer = require('nodemailer');
const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())


app.use(express.static('public'))

app.post('/sendMail',async(req,res)=>
{
    console.log(req.body)
    await sendMailApi(req.body.email)
})

async function sendMailApi(Data)
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'saiabhinay35@gmail.com',
            pass: 'ixjhidafkfjeppyr'
        }
    });

    var mailOptions = {
        from: 'saiabhinay35@gmail.com',
        to: `${Data}`,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.listen(3000)