// import NODEMAILER
import nodemailer from 'nodemailer';
// VARIABLES DE ENTORNO
import { envs } from '../../config/plugins/envs.plugin';
// Log Entity
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

// interface
interface SendEmailOptions {
    from: string;
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}
// interface Attachment
interface Attachment {
    filename: string;
    path: string;

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
        host: envs.MAILER_HOST,
        port: envs.MAILER_PORT,
        secure: envs.MAILER_SECURE,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: envs.MAILER_AUTH_USER,
            pass: envs.MAILER_AUTH_PASSWORD,
        },

    });

    // inyeccion de dependencias
    constructor() {}

    // METODOS
    async sendEmail( options: SendEmailOptions) : Promise<boolean> {
        // desestructurar
        const { to, subject, htmlBody, from, attachments = [] } = options;

        try {
            
            const sentInformation = await this.transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });
                        
            return true;

        } catch (error) {
            console.log( error );
            return false;
        }
    }
    // metodo para madar el email con los logs
    async sendEmailWithFileSystemLogs( to: string | string[]) {
        const from = '¡AquíEstoy! <info@aquiestoy.mx>'
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs del sistema</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto inventore nulla nobis quod molestias quam accusantium beatae. Cumque, quam! Hic, maiores dicta! Ipsam animi incidunt dolor reiciendis. Mollitia, at esse.</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log'
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            },
        ];

        // enviar correo
        return this.sendEmail({
            from,
            to,
            subject,
            attachments,
            htmlBody
        });
    }


}