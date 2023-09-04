import UseCaseModule from '@/usecase/usecase.module';
import { Module } from '@nestjs/common';
import { CategoriaController } from './controller/categoria/categoria.controller';
import { ClienteController } from './controller/cliente/cliente.controller';
import { HeatlhController } from './controller/health/health.controller';
import { PagamentoController } from './controller/pagamento/pagamento.controller';
import { PedidoController } from './controller/pedido/pedido.controller';
import { ProdutoController } from './controller/produto/produto.controller';

@Module({
    imports: [UseCaseModule],
    controllers: [ClienteController, CategoriaController, ProdutoController, PedidoController, PagamentoController, HeatlhController]
})
export default class ApplicationModule {}
