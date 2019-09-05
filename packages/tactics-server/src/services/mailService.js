import nodemailer from 'nodemailer';
import serviceFactory from '../factories/serviceFactory';
import config from '../config';

class MailService {
    constructor(){
        this._transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.MAILER.ADDRESS,
                pass: config.MAILER.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            },
            secure: false
        });

        this._options = {
            from: config.MAILER.ADDRESS
        };
    }

    senfMail(mail) {
        this._transporter.sendMail({ ...this._options, ...mail });
    }
}

export default serviceFactory('mailService', new MailService());
