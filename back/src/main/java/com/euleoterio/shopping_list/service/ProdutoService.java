package com.euleoterio.shopping_list.service;

import com.euleoterio.shopping_list.model.Produto;
import com.euleoterio.shopping_list.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    public Produto procurarPorId(Long id) {
        return produtoRepository.findById(id).orElse(null);
    }

    public Produto criarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto atualizarProduto(Long id, Produto produtoAtualizado) {
        Produto produto = produtoRepository.findById(id).orElse(null);
        if (produto != null) {
            produto.setNome(produtoAtualizado.getNome());
            produto.setPreco(produtoAtualizado.getPreco());
            return produtoRepository.save(produto);
        } else {
            return null; // ou lançar uma exceção
        }
    }

    public void deletarProduto(Long id) {
        produtoRepository.deleteById(id);
    }
}
