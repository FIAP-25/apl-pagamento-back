import UseCaseModule from '@/usecase/usecase.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BaseController } from './controller/base/base.controller';
import { HealthController } from './controller/health/health.controller';
import { PagamentoController } from './controller/pagamento/pagamento.controller';

@Module({
    imports: [UseCaseModule, HttpModule],
    controllers: [PagamentoController, HealthController, BaseController],
    exports: [HttpModule]
})
export default class ApplicationModule {}
