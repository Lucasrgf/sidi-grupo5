from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model

from rest_framework import serializers
from .models import Forma_Pagamento, Pedido, Produto, Produto_Pedido, Fornecedor, Categoria
User = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'id', 'password']
        def create(self, validated_data):
            user = super(UserSerializer, self).create(validated_data)
            user.set_password(validated_data['password'])
            user.save()
            return user


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


class FormaPagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forma_Pagamento
        fields = ['tipo', 'descricao']


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ['id', 'codigo', 'nome', 'valor',
                  'categoria', 'fornecedor', 'ativo']


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
    vendedor = UserSerializer()
    pedido = ProdutoPedidoSerializer(many=True)

    class Meta:
        model = Pedido
        fields = ['id', 'valor', 'data', 'status',
                  'forma_pagamento', 'vendedor', 'pedido']
