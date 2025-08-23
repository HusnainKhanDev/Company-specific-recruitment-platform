import nodemailer from 'nodemailer'



export async function SendMailToCandidate(email: string, name: string, title: string){
    console.log("Function chala")
    let Transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hasnainkhan6106@gmail.com',
            pass: process.env.GMAILSERVICE_PASSWORD
        }
    })
console.log("Password", process.env.GMAILSERVICE_PASSWORD)
    try{
        let MailingOptions = {
            from: 'hasnainkhan6106@gmail.com',
            to: email,
            subject: `Application Update: Your Application is Accepted for ${title}`,
            text:  `
                Hello ${name},

                We are pleased to inform you that your application for the position of ${title} at our company has been accepted.

                Our team will contact you soon with further details regarding the next steps. In the meantime, 
                please feel free to prepare any necessary documents or questions you may have.

                Congratulations, and we look forward to connecting with you.

                Best regards,
                Hiring Team
            `
        }

        let res = await Transporter.sendMail(MailingOptions)
        console.log("Response Of Mail", res)
        return res
    }
    catch(err){
        console.log("Error in Sending mail: ", err)
    }
}