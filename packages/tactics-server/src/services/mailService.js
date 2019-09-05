import nodemailer from 'nodemailer';
import serviceFactory from '../factories/serviceFactory';
import config from '../config';
import models from '../models';
class MailService {
    constructor() {
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

    async sendResetPasswordEmail({ email }) {
        const user = await models.user.findOne({ email });
        const token = crypto.randomBytes(20).toString('hex');
        await models.user.update(
            {
                reset_password_token: token,
                reset_password_token_expire:
                    Date.now() + config.RESET_PASSWORD.EXPIRE
            },
            { id: user.id }
        );

        await this.sendMail({
            from: config.MAILER.ADDRESS,
            to: user.toJSON().email,
            subject: 'password reset',
            text: `Yo dawg reset yo password : ${config.WEBSITE_URL}/reset_password/${token}`
        });
        return { message: 'ok' };
    }
}

export default serviceFactory('mailService', new MailService());
