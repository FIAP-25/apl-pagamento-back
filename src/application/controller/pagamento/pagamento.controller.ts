import ApplicationModule from '@/application/application.module';
import { ok } from '@/application/helper/http.helper';
import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import { AtualizarStatusPagamentoInput } from '@/infrastructure/dto/pagamento/atualizarStatusPagamento.dto';
import { Body, Controller, Get, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EventPattern, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Pagamentos')
@Controller('api/pagamentos')
export class PagamentoController {
    constructor(private pagamentoUseCase: IPagamentoUseCase) {}

    @Get()
    @ApiOperation({ summary: 'Obter pagamentos' })
    async obterPagamentos(@Res() res: Response): Promise<any> {
        const pagamentos = await this.pagamentoUseCase.obterPagamentos();

        return ok(pagamentos, res);
    }

    @EventPattern('payment_created')
    async handlePaymentReceived(@Body() data: any, @Res() res: Response) {
        console.log(data);
        await this.cadastrarPagamento(data.id, res, 'rabbit');
    }

    @Post('cadastrar/:pedidoId')
    @ApiOperation({ summary: 'Paga um pedido' })
    async cadastrarPagamento(@Param('pedidoId') pedidoId: string, @Res() res: Response, origem?: string): Promise<any> {
        const pagamentoCadastrado = await this.pagamentoUseCase.cadastrarPagamento(pedidoId);
        if (origem == 'rabbit') return pagamentoCadastrado;
        return ok(pagamentoCadastrado, res);
    }

    @Post('pagar/:pedidoId')
    @ApiOperation({ summary: 'Paga um pedido' })
    async pagarPedido(@Param('pedidoId') pedidoId: string, @Res() res: Response): Promise<any> {
        const pedidoAtualizado = await this.pagamentoUseCase.realizarPagamento(pedidoId);
        return ok(pedidoAtualizado, res);
    }
}
