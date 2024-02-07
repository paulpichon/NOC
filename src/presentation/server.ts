import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

// clase server
export class Server {

    public static start() {

        console.log('Server started...');

        // llamamos CronService.createJob()
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                
                // mandamos a llamar el CheckService: nuestro caso de uso
                new CheckService().execute('https://google.com');
                
            }
        );
    }

}