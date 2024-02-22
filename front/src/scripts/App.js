class App {
    constructor() {
        this.produtoService = new ProdutoService();
        this.produtoForm = new ProdutoForm(this.produtoService);
        this.carregarProdutos();
    }

    async carregarProdutos() {
        const produtos = await this.produtoService.listarProdutos();
        this.renderProdutos(produtos);
    }

    renderProdutos(produtos) {
        const lista = document.getElementById('produto-lista');
        lista.innerHTML = '';

        produtos.forEach(produto => {
            const item = document.createElement('li');
            item.className = 'produto-item';
            item.innerHTML = `
                <span>${produto.nome} - R$ ${produto.preco.toFixed(2)}</span>
                <div class="btn-container">
                    <button onclick="app.editarProduto(${produto.id})">Editar</button>
                    <button onclick="app.deletarProduto(${produto.id})">Excluir</button>
                </div>
            `;
            lista.appendChild(item);
        });
    }

    async deletarProduto(id) {
        await this.produtoService.deletarProduto(id);
        this.carregarProdutos();
    }

    async editarProduto(id) {
        const produto = await this.produtoService.obterProduto(id);
        if (produto) {
            document.getElementById('produto-nome').value = produto.nome;
            document.getElementById('produto-preco').value = produto.preco;
            // Aqui você pode definir o ID do produto em um campo oculto para identificar o produto sendo editado
            document.getElementById('produto-id').value = produto.id;
        }
    }
}

const app = new App();
