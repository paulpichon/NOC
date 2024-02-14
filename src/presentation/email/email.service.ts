// import NODEMAILER
import nodemailer from 'nodemailer';
// VARIABLES DE ENTORNO
import { envs } from '../../config/plugins/envs.plugin';

// interface
interface SendEmailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    from: string;
    // TODO: attachements
}
// TODO: attachements

// envio de email
export class EmailService {
    
    private transporter = nodemailer.createTransport({
        // Configuracion GMAIL
        // service: envs.MAILER_SERVICE,
        // auth: {
        //     user: envs.MAILER_EMAIL,
        //     pass: envs.MAILER_SECRET_KEY
        // }

        // configuracion con mi propio servicio de CORREO ELECTRONICO (HOSTGATOR TITAN)
        host: "smtp.titan.email",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "info@aquiestoy.mx",
            pass: "barcelona19421992!",
        },

    });

    // METODOS
    async sendEmail( options: SendEmailOptions) : Promise<boolean> {
        // desestructurar
        const { to, subject, htmlBody, from } = options;

        try {
            
            const sentInformation = await this.transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                html: htmlBody
            });

            return true;
        } catch (error) {
            console.log( error );
            
            return false;
        }


    }


}