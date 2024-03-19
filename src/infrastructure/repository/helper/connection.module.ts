import { PagamentoEntity } from '@/infrastructure/entity/pagamento.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            url: 'mongodb://127.0.0.1:27017/fiap',
            type: 'mongodb',
            //host: process.env.DATABASE_HOST,
            //username: process.env.DATABASE_USERNAME,
            //password: process.env.DATABASE_PASSWORD,
            //database: process.env.DATABASE_SCHEMA,
            //authSource: process.env.DATABASE_AUTHSOURCE,
            //port: Number(process.env.DATABASE_PORT),
            entities: [PagamentoEntity],
            synchronize: true
        })
    ]
})
export class ConnectionModule {}
