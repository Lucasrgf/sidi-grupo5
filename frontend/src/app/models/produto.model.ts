import { CategoriaModel } from './categoria.model';
import { FornecedorModel } from './fornecedor.model';

export class ProdutoModel {
    id: number;
    codigo: string;
    nome: string;
    valor: string;
    ativo: string;
    categoria: CategoriaModel;
    fornecedor: FornecedorModel;
}