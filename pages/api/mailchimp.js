import client from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us5",
});

const run = async (email) => {

  let response_status;
  try {

    const response = await client.lists.getListMember(
      "67070361e5",
      md5(email)
    );

    response_status = response.status

  } catch (error) {
    response_status = error.status;
  }

  

  if(response_status == "subscribed" ){
    return {status: "successful", message: "Email has already been added"};
  }
  
  try {

     await client.lists.addListMember("67070361e5", {
      email_address: email,
      status: "subscribed",
    });

  } catch (error) {
    console.log(error);
  }

  return {status: "successful", message: "Email has been sent"}
  
};

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
        
        const {email} = body;
        const respose = await run(email);
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