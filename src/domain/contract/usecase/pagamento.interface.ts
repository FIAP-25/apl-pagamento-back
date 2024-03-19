import { CadastrarPagamentoOutput } from '@/infrastructure/dto/pagamento/cadastrarPagamento.dto';
import { ObterPagamentoOutput } from '@/infrastructure/dto/pagamento/obterPagamento.dto';
import { RealizarPagamentoOutput } from '@/infrastructure/dto/pagamento/realizarPagamento.dto';

export abstract class IPagamentoUseCase {
    abstract obterPagamentos(): Promise<ObterPagamentoOutput[]>;
    abstract notificaCliente(data: any);
    abstract realizarPagamento(pedidoId: string): Promise<RealizarPagamentoOutput>;
    abstract cadastrarPagamento(pedidoId: string): Promise<CadastrarPagamentoOutput>;
    abstract pagamentoWebhook(pedidoId: string, sucesso: boolean, motivo: string): Promise<void>;
}
