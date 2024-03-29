import { AutoMap } from '@automapper/classes';
import { ObjectId } from 'typeorm';

export class Pagamento {
    @AutoMap()
    _id?: ObjectId | string;

    @AutoMap()
    pedidoId: string;

    @AutoMap()
    notaFiscal: string;

    @AutoMap()
    pagamentoStatus: string;
}
