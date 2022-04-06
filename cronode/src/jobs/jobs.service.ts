import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class JobsService {
    private readonly logger = new Logger(JobsService.name)

    constructor(private schedulerRegistry: SchedulerRegistry) { }

    // @Cron('* * * * * *')
    // everySec() {
    //     this.logger.log('every sec')
    // }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // logEveryTenSeconds() {
    //     this.logger.log('10 secs')
    // }



    addCronJob(name: string, seconds: string) {
        const job = new CronJob(`${seconds} * * * * *`, () => {
            this.logger.warn(`time (${seconds}) for job ${name} to run!`);
        });

        this.schedulerRegistry.addCronJob(name, job)
        job.start()

        this.logger.warn(`job ${name} added for each minute at ${seconds} seconds!`)
    }

    getCrons() {
        const jobs = this.schedulerRegistry.getCronJobs();
        jobs.forEach((value, key, map) => {
            let next;
            try {
                next = value.nextDates().toDate();
            } catch (e) {
                next = 'error: next fire date is in the past!';
            }
            this.logger.log(`job: ${key} -> next: ${next}`);
        });
    }

}
