import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as session from 'express-session';
import { AppModule } from './app.module';
import * as passport from 'passport'
import * as cookieParser from 'cookie-parser'
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

class Application {
    private logger = new Logger(Application.name)
    private DEV_MODE: boolean
    private PORT: string
    private corsOriginList: string[]
    private SWAGGER_USER: string
    private SWAGGER_PASSWORD: string

    constructor(private server: NestExpressApplication) {
        this.server = server
        if (!process.env.SECRET_KEY) this.logger.error('SECRET_KEY does not exist.')
        this.DEV_MODE = process.env.NODE_ENV === 'production' ? false : true
        this.PORT = process.env.PORT || '3000'
        this.corsOriginList = process.env.CORS_ORIGIN_LIST
            ? process.env.CORS_ORIGIN_LIST.split(',').map(origin => origin.trim())
            : ['*']
        this.SWAGGER_USER = process.env.SWAGGER_USER || 'grugu'
        this.SWAGGER_PASSWORD = process.env.SWAGGER_PASSWORD || 'mando'
    }

    private setUpBasicAuth() {
        this.server.use(
            ['/docs', '/docs-json'],
            expressBasicAuth({
                challenge: true,
                users: {
                    [this.SWAGGER_USER]: this.SWAGGER_PASSWORD,
                },
            }),
        )
    }

    private setUpOpenAPIMidleware() {
        SwaggerModule.setup(
            'docs',
            this.server,
            SwaggerModule.createDocument(
                this.server,
                new DocumentBuilder()
                    .setTitle('Cronode')
                    .setDescription('Scheduler-nestjs')
                    .setVersion('1.0.0')
                    .build(),
            ),
        )
    }

    private async setUpGlobalMiddleware() {
        this.server.enableCors({
            origin: this.corsOriginList,
            credentials: true,
        })
        this.server.use(cookieParser())
        this.setUpBasicAuth()
        this.setUpOpenAPIMidleware()
        //* DTO 등 validation 작동
        this.server.useGlobalPipes(
            new ValidationPipe({
                transform: true,
            }),
        )
        // this.server.use(passport.initialize())
        // this.server.use(passport.session())
        //* @Exclude() 데코레이터가 붙은 프로퍼티를 인터셉터 단계에서 제외시켜준다.
        this.server.useGlobalInterceptors(
            new ClassSerializerInterceptor(this.server.get(Reflector)),
        )
        this.server.useGlobalFilters(new HttpExceptionFilter())
    }

    async boostrap() {
        await this.setUpGlobalMiddleware()
        await this.server.listen(this.PORT)
    }

    startLog() {
        if (this.DEV_MODE) {
            this.logger.log(`✅ Server on http://localhost:${this.PORT}`)
        } else {
            this.logger.log(`✅ Server on port ${this.PORT}...`)
        }
    }

    errorLog(error: string) {
        this.logger.error(`🆘 Server error ${error}`)
    }

}

async function init(): Promise<void> {
    const server = await NestFactory.create<NestExpressApplication>(AppModule)
    const app = new Application(server)
    await app.boostrap()
    app.startLog()
}

init().catch((error) => {
    new Logger('init').error(error)
})