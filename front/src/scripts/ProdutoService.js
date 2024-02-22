class ProdutoService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/produtos';
    }

    async listarProdutos() {
        const response = await fetch(this.baseUrl);
        return await response.json();
    }

    async adicionarProduto(produto) {
        await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
    }

    async deletarProduto(id) {
        await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE'
        });
    }

    async obterProduto(id) {
        const response = await fetch(`${this.baseUrl}/${id}`);
        return await response.json();
    }

    async atualizarProduto(id, produto) {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar o produto');
            }
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
            throw error;
        }
    }
}
