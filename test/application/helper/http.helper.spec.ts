import { created, customResponseSuccess, noContent, ok, serverError } from '@/application/helper/http.helper';
import { Response } from 'express';

describe('HTTP Helper', () => {
    let mockResponse: Response;

    beforeEach(() => {
        mockResponse = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        } as unknown as Response;
    });

    it('ok deve retornar resposta com status 200 e dados corretos', () => {
        const data = { chave: 'valor' };
        const resultado = ok(data, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ dados: data });
        expect(resultado).toBe(mockResponse);
    });

    it('noContent deve retornar resposta com status 204', () => {
        const resultado = noContent(mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.send).toHaveBeenCalled();
        expect(resultado).toBe(mockResponse);
    });

    it('created deve retornar resposta com status 201 e dados corretos', () => {
        const data = { chave: 'valor' };
        const resultado = created(data, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ dados: data });
        expect(resultado).toBe(mockResponse);
    });

    it('customResponseSuccess deve retornar resposta com status 200 e ID nos dados', () => {
        const data = '123';
        const resultado = customResponseSuccess(data, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ id: data });
        expect(resultado).toBe(mockResponse);
    });

    it('serverError deve retornar resposta com status 500 e detalhes do erro', () => {
        const error = new Error('Erro de teste');
        const resultado = serverError(error, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            tipo: error.name,
            mensagem: error.message,
            mensagemDetalhe: error.stack
        });
        expect(resultado).toBe(mockResponse);
    });
});
