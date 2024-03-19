/* eslint-disable import/first */
require('dotenv').config();

import { ExceptionInterceptor } from '@/application/interceptor/exception.interceptor';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServerModule } from './server.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const port = process.env.PORT ?? 4000;

async function bootstrap(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
        console.log('[Servidor]: Ambiente Produtivo.');
    } else {
        console.log('[Servidor]: Ambiente Desenvolvimento.');
    }

    const app = await NestFactory.create(ServerModule);

    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionInterceptor(httpAdapter));

    const config = new DocumentBuilder().setTitle('FIAP - 25 API').setDescription('Documentação API.').setVersion('2.0.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqps://beigjrvu:OVMxq6Oi3OOHJAwRVL9DLyqWUazLUysc@woodpecker.rmq.cloudamqp.com/beigjrvu'],
            queue: 'payment-queue',
            queueOptions: {
                durable: false
            }
        }
    });
    await app.startAllMicroservices();

    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
