import { ProdutoPedidoModel } from './produto-pedido.model';
import { VendedorModel } from './vendedor.model';

export class PedidoModel {
    id: number;
    valor: string;
    data: string;
    status: string;
    forma_pagamento: number;
    forma_pagamento_model: {
        id: number;
        descricao: string;
    };
    vendedor: string;
    vendedor_model: VendedorModel;
    pedido: ProdutoPedidoModel[];
}