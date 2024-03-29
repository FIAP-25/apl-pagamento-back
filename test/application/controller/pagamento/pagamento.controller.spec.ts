import { PagamentoController } from '@/application/controller/pagamento/pagamento.controller';
import { IPagamentoUseCase } from '@/domain/contract/usecase/pagamento.interface';
import { ObterPagamentoOutput } from '@/infrastructure/dto/pagamento/obterPagamento.dto';
import { RealizarPagamentoOutput } from '@/infrastructure/dto/pagamento/realizarPagamento.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

describe('PagamentoController', () => {
    let controller: PagamentoController;
    let mockPagamentoUseCase: jest.Mocked<IPagamentoUseCase>;
    let response: jest.Mocked<Response>;

    beforeEach(async () => {
        mockPagamentoUseCase = {
            obterPagamentos: jest.fn(),
            cadastrarPagamento: jest.fn(),
            realizarPagamento: jest.fn(),
            pagamentoWebhook: jest.fn(),
            notificaCliente: jest.fn()
        };

        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as jest.Mocked<Response>;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PagamentoController],
            providers: [{ provide: IPagamentoUseCase, useValue: mockPagamentoUseCase }]
        }).compile();

        controller = module.get<PagamentoController>(PagamentoController);
    });

    it('deve obter pagamentos', async () => {
        const mockData: ObterPagamentoOutput[] = [];
        mockPagamentoUseCase.obterPagamentos.mockResolvedValue(mockData);

        await controller.obterPagamentos(response);

        expect(mockPagamentoUseCase.obterPagamentos).toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith({ dados: mockData });
    });

    it('deve realizar um pagamento', async () => {
        const pedidoId = '123';
        const mockData: RealizarPagamentoOutput = {
            pedidoId: pedidoId,
            notaFiscal: '123123123',
            pagamentoStatus: 'PENDENTE'
        };
        mockPagamentoUseCase.realizarPagamento.mockResolvedValue(mockData);

        await controller.pagarPedido(pedidoId, response);

        expect(mockPagamentoUseCase.realizarPagamento).toHaveBeenCalledWith(pedidoId);
        expect(response.json).toHaveBeenCalledWith({ dados: mockData });
    });

    it('deve cadastrar um pagamento', async () => {
        const pedidoId = '123';
        const mockData: RealizarPagamentoOutput = {
            pedidoId: pedidoId,
            notaFiscal: '123123123',
            pagamentoStatus: 'PENDENTE'
        };
        mockPagamentoUseCase.cadastrarPagamento.mockResolvedValue(mockData);

        await controller.cadastrarPagamento(pedidoId, response);

        expect(mockPagamentoUseCase.cadastrarPagamento).toHaveBeenCalledWith(pedidoId);
        expect(response.json).toHaveBeenCalledWith({ dados: mockData });
    });
});
