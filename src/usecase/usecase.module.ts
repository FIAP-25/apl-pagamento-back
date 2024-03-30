import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { PagamentoUseCase } from './pagamento/pagamento.usecase';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        InfrastructureModule,
        ClientsModule.register([
            {
                name: 'PAYMENT_ORDER',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqps://swaaocbz:3egfiSYM8jugggFUuzJ6agMTViNLXS51@woodpecker.rmq.cloudamqp.com/swaaocbz'],
                    queue: 'payment-order-queue',
                    queueOptions: {
                        durable: false
                    }
                }
            }
        ]),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5
        })
    ],
    providers: [{ provide: IPagamentoUseCase, useClass: PagamentoUseCase }],
    exports: [IPagamentoUseCase]
})
export default class UseCaseModule {}
