from django.db import models

# Create your models here.
class Vendedor(models.Model):
    nome = models.CharField(max_length=200)
    login = models.CharField(max_length=200)
    senha = models.CharField(max_length=200)
    ativo = models.BooleanField()

    def __str__(self):
        return self.nome

class Forma_Pagamento(models.Model):
    tipo = models.CharField(max_length=50)
    descricao = models.CharField(max_length=200)
    def __str__(self):
        return self.tipo

class Pedido(models.Model):
    valor = models.DecimalField(max_digits=12, decimal_places=2)
    data = models.DateField()
    status = models.CharField(max_length=20)
    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE)
    forma_pagamento = models.ForeignKey(Forma_Pagamento, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.id)

class Fornecedor(models.Model):
    cnpj_cpf = models.CharField(max_length=20)
    nome_fantasia = models.CharField(max_length=200)
    ativo = models.BooleanField()
    def __str__(self):
        return self.nome_fantasia

class Categoria(models.Model):
    nome = models.CharField(max_length=200)
    def __str__(self):
        return self.nome

class Produto(models.Model):
    codigo = models.CharField(max_length=10)
    nome = models.CharField(max_length=200)
    valor = models.DecimalField(max_digits=12, decimal_places=2)
    ativo = models.BooleanField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    fornecedor = models.ForeignKey(Fornecedor, on_delete=models.CASCADE)
    def __str__(self):
        return self.nome

class Produto_Pedido(models.Model):
    qtd_produto = models.IntegerField()
    valor_parcial = models.DecimalField(max_digits=12, decimal_places=2)
    pedido = models.ForeignKey(Pedido, related_name="pedido", on_delete=models.CASCADE)
    produto = models.ForeignKey(Produto, related_name="produto", on_delete=models.CASCADE)
    def __str__(self):
        return str(self.pedido) + "-" + str(self.produto)

class Contato(models.Model):
    logradouro = models.CharField(max_length=200)
    numero = models.CharField(max_length=10)
    bairro = models.CharField(max_length=100)
    cidade = models.CharField(max_length=200)
    estado = models.CharField(max_length=2)
    cep = models.CharField(max_length=8)
    complemento = models.CharField(max_length=200)
    telefone_fixo = models.CharField(max_length=10)
    celular = models.CharField(max_length=11)
    email = models.EmailField(max_length=200)
    fornecedor = models.ForeignKey(Fornecedor, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.id) + str(self.fornecedor)
    
