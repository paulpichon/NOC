import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

// LogRepository implementation, y lo manbdamos en el CheckService
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

// clase server
export class Server {

    public static start() {

        console.log('Server started...');

        // Mandar EMAIL

        console.log( envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL );
        

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