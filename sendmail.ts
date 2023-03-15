import nodemailer from 'nodemailer'

let mailTransporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'API_VERIFY@outlook.com',
    pass: 'AQ8@hRCS',
  },
})



export const SendEmail=(description:string)=>{
let mailDetails = {
  from: 'API_VERIFY@outlook.com',
  to: 'faizan.majgaonkar@torinit.ca',
  subject: 'todo Added ',
  text: description,
}

mailTransporter.sendMail(mailDetails, function (err, data) {
  if (err) {
    console.log('Error Occurs' + err)
  } else {
    console.log('Email sent successfully')
  }
})

}

