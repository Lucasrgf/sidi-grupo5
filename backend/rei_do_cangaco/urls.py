"""rei_do_cangaco URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken import views
from core.views import UserViewSet, GroupViewSet, CategoriaViewSet, FormaPagamentoViewSet, PedidoViewSet, ProdutoViewSet, FornecedorViewSet, login

router = routers.DefaultRouter()
router.register(r'vendedores', UserViewSet)
router.register(r'forma-pagamento', FormaPagamentoViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'produtos', ProdutoViewSet)
router.register(r'fornecedores', FornecedorViewSet)
router.register(r'categorias', CategoriaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/login', login),
    path('api-token-auth/', views.obtain_auth_token, name='api_token_auth'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
