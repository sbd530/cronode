import { JobsService } from './jobs.service';
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

@Controller('jobs')
export class JobsController {
    private readonly logger = new Logger(JobsController.name)

    constructor(private readonly jobsService: JobsService) { }

    @Get('/every-sec')
    everySec() {
        // this.jobsService.logEveryTenSeconds
    }

    @Get('/ten-sec')
    tenSec() {
        // this.jobsService.logEveryTenSeconds
    }

    @Post()
    addCronJob(@Body() { name, seconds }) {
        this.jobsService.addCronJob(name, seconds)
    }

    @Get()
    getCronInfo() {
        this.jobsService.getCrons()
    }
}
