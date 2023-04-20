import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_TOKEN,
  },
});

transporter.verify().then( () => {
  console.log("Ready to send emails");
})

async function sendEmail(body){

  let html = "";
  Object.entries(body).forEach( ([key,value]) => {
    html += `<p> <b style="text-transform: capitalize">${key.replace('_', ' ')}:</b> &nbsp; ${value.replace('_', ' ')} </p>`
  })

  try {

    console.log(body?.option);

    if(body?.option == "press"){

      await transporter.sendMail({
        from: `"New Message from ${body?.name}" <${process.env.NODEMAILER_USER}>`, // sender address
        to: "press@sparrowitalia.com", // list of receivers
        subject: "New Message", // Subject line
        html: html, // html body
      });

    }

    if(body?.option == "general_inquiry" || body?.option == "reservations"){
      const to =
        body?.location === 'Mayfair, London'
          ? 'infoUK@sparrowitalia.com'
          : 'infoLA@sparrowitalia.com';

      await transporter.sendMail({
        from: `"New Message from ${body?.name}" <${process.env.NODEMAILER_USER}>`, // sender address
        to, // list of receivers
        subject: "New Message", // Subject line
        html: html, // html body
      });

    }
    
    if(body?.option == "events"){
      await transporter.sendMail({
        from: `"New Message from ${body?.name}" <${process.env.NODEMAILER_USER}>`, // sender address
        to: "events@sparrowitalia.com", // list of receivers
        subject: "New Message", // Subject line
        html: html, // html body
      });
    }

    return {
      "status" : "successful",
      "message": "The email has been sended"
    }

  } catch (error) {

    console.log(error);
    return {
      "status" : "failed",
      "message": "The email cannot be sended"
    }  

  }

}

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', "");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }
  
  const {
    query: {type},
    method,
    body
  } = req;

  let currentType = type ?? "send_email";

  switch (currentType) {

    case 'send_email':

      if(method === "POST"){
        
        // const {email, variant_id} = body;
        const respose = await sendEmail(body);
        res.status(200).json(respose)
    
      }else{
        res.status(405).json({status: "failed", message: "Invalid method"});
      }

      break;

  default:
    res.status(404).json({status: "failed", message: "Invalid request"});
    break;

  }
  
}