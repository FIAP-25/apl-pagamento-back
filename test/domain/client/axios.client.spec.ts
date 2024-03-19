import { AxiosClient } from '@/domain/client/axios.client';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosClient', () => {
    let axiosClient: AxiosClient;
    const urlBase = 'http://localhost';

    beforeEach(() => {
        axiosClient = new AxiosClient();
        axiosClient.urlBase = urlBase;
        jest.clearAllMocks();
    });

    it('deve fazer uma chamada GET corretamente', async () => {
        jest.spyOn(axiosClient, 'executarChamada').mockResolvedValue('resposta_mock_get');

        const response = await axiosClient.executarChamada('get', '/caminho');

        expect(axiosClient.executarChamada).toHaveBeenCalledWith('get', '/caminho');
        expect(response).toEqual('resposta_mock_get');
    });

    it('deve fazer uma chamada POST corretamente', async () => {
        const mockResponse = { data: 'resposta_mock' };
        const body = { chave: 'valor' };
        mockedAxios.post.mockResolvedValue(mockResponse);

        const response = await axiosClient.executarChamada('post', '/caminho', body);

        expect(mockedAxios.post).toHaveBeenCalledWith(`${urlBase}/caminho`, body);
        expect(response).toEqual(mockResponse);
    });

    it('deve fazer uma chamada PUT corretamente', async () => {
        const mockResponse = { data: 'resposta_mock' };
        const body = { chave: 'valor' };
        mockedAxios.put.mockResolvedValue(mockResponse);

        const response = await axiosClient.executarChamada('put', '/caminho', body);

        expect(mockedAxios.put).toHaveBeenCalledWith(`${urlBase}/caminho`, body);
        expect(response).toEqual(mockResponse);
    });

    it('deve fazer uma chamada PATCH corretamente', async () => {
        const mockResponse = { data: 'resposta_mock' };
        const body = { chave: 'valor' };
        mockedAxios.patch.mockResolvedValue(mockResponse);

        const response = await axiosClient.executarChamada('patch', '/caminho', body);

        expect(mockedAxios.patch).toHaveBeenCalledWith(`${urlBase}/caminho`, body);
        expect(response).toEqual(mockResponse);
    });

    it('deve fazer uma chamada DELETE corretamente', async () => {
        const mockResponse = { data: 'resposta_mock' };
        mockedAxios.delete.mockResolvedValue(mockResponse);

        const response = await axiosClient.executarChamada('delete', '/caminho');

        expect(mockedAxios.delete).toHaveBeenCalledWith(`${urlBase}/caminho`);
        expect(response).toEqual(mockResponse);
    });
});
