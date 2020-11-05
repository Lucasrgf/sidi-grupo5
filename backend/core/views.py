from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import UserSerializer, GroupSerializer,CategoriaSerializer, VendedorSimpleSerializer, VendedorCompleteSerializer, VendedorSerializer, FormaPagamentoSerializer, PedidoSerializer, PedidoSimpleSerializer, ProdutoSerializer, FornecedorSerializer
from .models import Vendedor, Forma_Pagamento, Pedido, Produto, Fornecedor, Categoria
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class VendedorViewSet(viewsets.ModelViewSet):
    serializer_class = VendedorCompleteSerializer
    queryset = Vendedor.objects.all()
    def list(self, request):
        queryset = Vendedor.objects.all()
        serializer = VendedorSimpleSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Vendedor.objects.all()
        vendedor = get_object_or_404(queryset, pk=pk)
        serializer = VendedorCompleteSerializer(vendedor)
        return Response(serializer.data)


class FormaPagamentoViewSet(viewsets.ModelViewSet):
    serializer_class = FormaPagamentoSerializer
    queryset = Forma_Pagamento.objects.all()

class PedidoViewSet(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    queryset = Pedido.objects.all()
    def list(self, request):
        queryset = Pedido.objects.all()
        serializer = PedidoSimpleSerializer(queryset, many=True)
        return Response(serializer.data)

class ProdutoViewSet(viewsets.ModelViewSet):
    serializer_class = ProdutoSerializer
    queryset = Produto.objects.all()

class FornecedorViewSet(viewsets.ModelViewSet):
    serializer_class = FornecedorSerializer
    queryset = Fornecedor.objects.all()

class CategoriaViewSet(viewsets.ModelViewSet):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()

