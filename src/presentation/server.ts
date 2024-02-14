import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
// enviar correo
import { EmailService } from "./email/email.service";

// LogRepository implementation, y lo manbdamos en el CheckService
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

// clase server
export class Server {

    public static start() {

        console.log('Server started...');

        // Mandar EMAIL
        const emailService = new EmailService();
        // cuerpo del email
        emailService.sendEmail({
            from: "info@aquiestoy.mx",
            to: 'paul10_barca@hotmail.com',
            subject: 'Logs del sistema',
            htmlBody: `
                <h1>Logs del sistema</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto inventore nulla nobis quod molestias quam accusantium beatae. Cumque, quam! Hic, maiores dicta! Ipsam animi incidunt dolor reiciendis. Mollitia, at esse.</p>
                <p>Ver logs adjuntos</p>
            `
        });
        

        // llamamos CronService.createJob()
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         // mandamos a llamar el CheckService: nuestro caso de uso
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } is ok!`),
        //             ( error ) => console.log( error ),
        //         ).execute( url );
        //         // new CheckService().execute('http://localhost:3000');
                
        //     }
        // );
    }

}