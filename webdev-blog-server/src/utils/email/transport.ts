const nodemailer = require('nodemailer');
import config from "../../config/config"


const transport = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT || 2525,
    secure: false, 
    auth: {
        user: config.SMTP_USER, 
        pass: config.SMTP_PASSWORD 
    }
});



export default transport
