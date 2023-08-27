import { Pedido } from '@/domain/entity/pedido.model';

export interface IPedidoService {

  find(): Promise<Pedido[]>;
  findById(id: string): Promise<Pedido>;
  save(pedido: Pedido): Promise<Pedido>;
  removeById(id: string): Promise<void>;
}