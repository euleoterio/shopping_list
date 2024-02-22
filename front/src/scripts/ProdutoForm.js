class ProdutoForm {
    constructor(produtoService) {
        this.produtoService = produtoService;
        this.initForm();
    }

    initForm() {
        document.getElementById('produto-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nome = document.getElementById('produto-nome').value;
            const preco = parseFloat(document.getElementById('produto-preco').value);
            // Aqui você pode obter o ID do produto sendo editado a partir de um campo oculto
            const idField = document.getElementById('produto-id');
            const id = idField ? idField.value : null; // Verifica se o campo de ID existe antes de acessá-lo
            // Se o ID estiver presente e não for vazio, atualize o produto em vez de adicionar um novo
            if (id && id.trim() !== '') {
                await this.produtoService.atualizarProduto(id, { nome, preco });
            } else {
                await this.produtoService.adicionarProduto(new Produto(null, nome, preco));
            }
            document.getElementById('produto-form').reset();
            document.getElementById('produto-id').value = ''; // Limpa o campo ID após adicionar ou editar
            app.carregarProdutos(); // Atualiza a lista de produtos após adicionar ou editar um produto
        });
    }
}
