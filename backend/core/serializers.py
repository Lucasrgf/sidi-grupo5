from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Vendedor, Forma_Pagamento, Pedido, Produto, Produto_Pedido, Fornecedor, Categoria

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = ['id', 'cnpj_cpf', 'nome_fantasia', 'ativo']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nome']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class VendedorSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = ['id', 'nome', 'login']

class VendedorCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = ['id', 'nome', 'login', 'senha', 'ativo']

class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = ['id', 'nome', 'login', 'ativo']

class FormaPagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forma_Pagamento
        fields = ['tipo', 'descricao']

class ProdutoSerializer(serializers.ModelSerializer):
    fornecedor = FornecedorSerializer()
    categoria = CategoriaSerializer()
    class Meta:
        model = Produto
        fields = ['id', 'codigo', 'nome', 'valor', 'categoria', 'fornecedor', 'ativo']
    def create(self, validated_data):
        fornecedor_data =  validated_data.pop('fornecedor')
        categoria_data =  validated_data.pop('categoria')
        produto = Produto.objects.create(**validated_data)
        # Fornecedor.objects.update(produto=produto, **fornecedor_data)
        # Categoria.objects.update(produto=produto, **categoria_data)
        return produto

class ProdutoPedidoSerializer(serializers.ModelSerializer):
    produto = ProdutoSerializer()
    class Meta:
        model = Produto_Pedido
        fields = ['produto', 'qtd_produto', 'valor_parcial']

class PedidoSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ['id', 'valor', 'data', 'status']

class PedidoSerializer(serializers.ModelSerializer):
    forma_pagamento = FormaPagamentoSerializer()
    vendedor = VendedorSimpleSerializer()
    pedido = ProdutoPedidoSerializer(many=True)
    class Meta:
        model = Pedido
        fields = ['id', 'valor', 'data', 'status', 'forma_pagamento', 'vendedor', 'pedido']