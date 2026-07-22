# Atividade de Avaliação - POO em TypeScript

## Desafio 1 — `desafio1/produto.ts`
Sistema de controle de produtos em estoque.

- **Classe:** `Produto`
- **Atributos privados:** `nome`, `preco`, `quantidadeEstoque`, `codigo`
- **Getters e Setters:** um par para cada atributo
- **Métodos:**
  - `venderProduto(quantidade)` → altera o estado do objeto (reduz o estoque)
  - `calcularValorTotalEstoque()` → retorna informação calculada (preço × quantidade)
  - `exibirInformacoes()` → exibe os dados do objeto
- **Objetos criados:** `produto1` (Teclado Mecânico) e `produto2` (Mouse Gamer)
- O `main()` demonstra vendas, uso de getters/setters e cálculo de valores.

### Como executar
```bash
cd desafio1
npx tsc produto.ts --outDir dist
node dist/produto.js
```

## Desafio 2 — `desafio2/pagamento.ts`
Padrão de projeto escolhido: **Strategy** (comportamental).

Cenário: um `Pedido` (Context) pode ser pago por diferentes formas de
pagamento — Cartão de Crédito, Pix ou Boleto — cada uma implementando a
interface `EstrategiaPagamento` com sua própria regra de cálculo (juros,
desconto ou taxa) e forma de confirmação. O pedido pode trocar a estratégia
de pagamento em tempo de execução sem precisar alterar sua própria classe.

- **Interface:** `EstrategiaPagamento`
- **Estratégias concretas:** `PagamentoCartaoCredito`, `PagamentoPix`, `PagamentoBoleto`
- **Contexto:** `Pedido`, que delega o cálculo/processamento à estratégia escolhida

### Como executar
```bash
cd desafio2
npx tsc pagamento.ts --outDir dist
node dist/pagamento.js
```

## Observação
Ambos os projetos foram compilados e executados com sucesso (modo `--strict`),
sem erros de tipagem ou de execução.
