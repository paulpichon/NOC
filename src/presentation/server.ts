import { CronService } from "./cron/cron-service";

// clase server
export class Server {

    public static start() {

        console.log('Server started...');

        // llamamos CronService.createJob()
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                
                
            }
        );
    }

}