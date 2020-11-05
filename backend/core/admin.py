from django.contrib import admin
from .models import Vendedor, Forma_Pagamento, Pedido, Fornecedor, Categoria, Produto, Produto_Pedido, Contato

# Register your models here.
admin.site.register(Vendedor)
admin.site.register(Forma_Pagamento)
admin.site.register(Pedido)
admin.site.register(Fornecedor)
admin.site.register(Categoria)
admin.site.register(Produto)
admin.site.register(Produto_Pedido)
admin.site.register(Contato)