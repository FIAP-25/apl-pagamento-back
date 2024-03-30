import { mapper } from '@/application/mapper/base.mapper';
import { IAxiosClient } from '@/domain/contract/client/axios.interface';
import { IPagamentoRepository } from '@/domain/contract/repository/pagamento.interface';
import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import { Pagamento } from '@/domain/entity/pagamento.model';
import { CadastrarPagamentoOutput } from '@/infrastructure/dto/pagamento/cadastrarPagamento.dto';
import { ObterPagamentoOutput } from '@/infrastructure/dto/pagamento/obterPagamento.dto';
import { RealizarPagamentoOutput } from '@/infrastructure/dto/pagamento/realizarPagamento.dto';
import { Inject, Injectable } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Client, ClientProxy, MicroserviceOptions, Transport } from '@nestjs/microservices';
const { exec } = require('child_process');

@Injectable()
export class PagamentoUseCase implements IPagamentoUseCase {
    constructor(private pagamentoRepository: IPagamentoRepository, private axiosClient: IAxiosClient, @Inject('PAYMENT_ORDER') private readonly client: ClientProxy) {}

    async obterPagamentos(): Promise<ObterPagamentoOutput[]> {
        const pagamentos = await this.pagamentoRepository.find();
        return mapper.mapArray(pagamentos, Pagamento, ObterPagamentoOutput);
    }

    async cadastrarPagamento(pedidoId: string): Promise<CadastrarPagamentoOutput> {
        const pagamento: Pagamento = {
            pedidoId: pedidoId,
            notaFiscal: '',
            pagamentoStatus: 'PENDENTE'
        };

        const pagamentoSalvo = await this.pagamentoRepository.save(pagamento);

        return mapper.map(pagamentoSalvo, Pagamento, CadastrarPagamentoOutput);
    }

    notificaCliente(data: any) {
        const sender = 'eduardo.vinicius01@outlook.com';
        const recipient = 'eduardo.vinicius01@outlook.com';
        const subject = 'Test Email';
        const message = 'This is a test email sent from Node.js using sendmail.';

        const command = `echo "Subject: ${subject}" | sendmail -f ${sender} ${recipient}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error occurred while sending email:', error);
                return;
            }
            console.log('Email sent successfully');
        });
    }

    async realizarPagamento(pedidoId: string): Promise<RealizarPagamentoOutput> {
        const pagamentoPendente: Pagamento = await this.pagamentoRepository.findByPedidoId(pedidoId);

        if (!pagamentoPendente) {
            throw new Error('pagamento-nao-encontrado');
        }

        pagamentoPendente.pagamentoStatus = 'PAGO';
        pagamentoPendente.notaFiscal = this.gerarNotaFiscal();

        const pagamentoSalvo = await this.pagamentoRepository.save(pagamentoPendente);

        var body = {
            id: pedidoId,
            aprovado: true,
            motivo: 'Pagamento aprovado com sucesso'
        };

        console.log(body);
        this.client.emit('payment_order', body);
        // await this.pagamentoWebhook(pedidoId, true, 'Pagamento realizado com sucesso');

        return mapper.map(pagamentoSalvo, Pagamento, RealizarPagamentoOutput);
    }

    async pagamentoWebhook(pedidoId: string, sucesso: boolean, motivo: string): Promise<void> {
        await this.axiosClient
            .executarChamada('patch', `pedidos/webhook`, { id: pedidoId, aprovado: sucesso, motivo: motivo })
            .then((resultado) => {
                console.log('resultado: ', resultado);
            })
            .catch((erro) => {
                console.error('erro: ', erro);
            });
    }

    private gerarNotaFiscal(): string {
        const numeroNotaFiscal = Math.floor(Math.random() * 1000000) + 1;
        const numeroNotaFiscalFormatado = numeroNotaFiscal.toString().padStart(6, '0');
        return `NF${numeroNotaFiscalFormatado}`;
    }
}
