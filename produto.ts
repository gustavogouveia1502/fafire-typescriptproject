/**
 * Desafio 1 - Fundamentos de Programação Orientada a Objetos
 * Sistema de Controle de Produtos em Estoque
 *
 * Requisitos atendidos:
 * 1. Classe: Produto
 * 2. Atributos privados: nome, preco, quantidadeEstoque (3+)
 * 3. Construtor para inicializar os atributos
 * 4. Getters e Setters para todos os atributos
 * 5. Métodos:
 *    - venderProduto()      -> altera o estado do objeto
 *    - calcularValorTotalEstoque() -> retorna informação calculada
 *    - exibirInformacoes()  -> exibe informações do objeto
 * 6. Criação de pelo menos dois objetos da classe
 * 7. Demonstração do funcionamento no programa principal
 */

class Produto {
  private nome: string;
  private preco: number;
  private quantidadeEstoque: number;
  private codigo: string;

  constructor(nome: string, preco: number, quantidadeEstoque: number, codigo: string) {
    this.nome = nome;
    this.preco = preco;
    this.quantidadeEstoque = quantidadeEstoque;
    this.codigo = codigo;
  }

  // ---------- Getters ----------
  public getNome(): string {
    return this.nome;
  }

  public getPreco(): number {
    return this.preco;
  }

  public getQuantidadeEstoque(): number {
    return this.quantidadeEstoque;
  }

  public getCodigo(): string {
    return this.codigo;
  }

  // ---------- Setters ----------
  public setNome(nome: string): void {
    if (nome.trim().length === 0) {
      throw new Error("O nome do produto não pode ser vazio.");
    }
    this.nome = nome;
  }

  public setPreco(preco: number): void {
    if (preco < 0) {
      throw new Error("O preço não pode ser negativo.");
    }
    this.preco = preco;
  }

  public setQuantidadeEstoque(quantidadeEstoque: number): void {
    if (quantidadeEstoque < 0) {
      throw new Error("A quantidade em estoque não pode ser negativa.");
    }
    this.quantidadeEstoque = quantidadeEstoque;
  }

  public setCodigo(codigo: string): void {
    this.codigo = codigo;
  }

  // ---------- Métodos ----------

  /**
   * Altera o estado do objeto: reduz a quantidade em estoque
   * ao efetuar uma venda.
   */
  public venderProduto(quantidade: number): void {
    if (quantidade <= 0) {
      console.log(`Não é possível vender uma quantidade inválida (${quantidade}) de "${this.nome}".`);
      return;
    }

    if (quantidade > this.quantidadeEstoque) {
      console.log(
        `Estoque insuficiente para vender ${quantidade}x "${this.nome}". ` +
          `Disponível: ${this.quantidadeEstoque}.`
      );
      return;
    }

    this.quantidadeEstoque -= quantidade;
    console.log(`Venda realizada: ${quantidade}x "${this.nome}". Novo estoque: ${this.quantidadeEstoque}.`);
  }

  /**
   * Retorna uma informação calculada: o valor total (preço * quantidade)
   * que o produto representa em estoque.
   */
  public calcularValorTotalEstoque(): number {
    return this.preco * this.quantidadeEstoque;
  }

  /**
   * Exibe as informações do objeto.
   */
  public exibirInformacoes(): void {
    console.log("----------------------------------------");
    console.log(`Código:            ${this.codigo}`);
    console.log(`Nome:              ${this.nome}`);
    console.log(`Preço unitário:    R$ ${this.preco.toFixed(2)}`);
    console.log(`Quantidade estoque:${this.quantidadeEstoque}`);
    console.log(`Valor total:       R$ ${this.calcularValorTotalEstoque().toFixed(2)}`);
    console.log("----------------------------------------");
  }
}

// ============ Programa Principal ============

function main(): void {
  console.log("=== Sistema de Controle de Produtos em Estoque ===\n");

  // Criando dois objetos da classe Produto
  const produto1 = new Produto("Teclado Mecânico", 250.0, 15, "PROD-001");
  const produto2 = new Produto("Mouse Gamer", 120.5, 30, "PROD-002");

  console.log(">> Informações iniciais dos produtos:");
  produto1.exibirInformacoes();
  produto2.exibirInformacoes();

  console.log("\n>> Realizando vendas (alteração de estado):");
  produto1.venderProduto(5);
  produto2.venderProduto(40); // deve falhar por estoque insuficiente
  produto2.venderProduto(10);

  console.log("\n>> Usando setters para atualizar dados:");
  produto1.setPreco(229.9);
  produto2.setNome("Mouse Gamer RGB");

  console.log("\n>> Usando getters para consultar dados:");
  console.log(`Nome atual do produto 1: ${produto1.getNome()}`);
  console.log(`Preço atual do produto 1: R$ ${produto1.getPreco().toFixed(2)}`);
  console.log(`Estoque atual do produto 2: ${produto2.getQuantidadeEstoque()} unidades`);

  console.log("\n>> Valor total calculado em estoque:");
  console.log(`Produto 1 (${produto1.getNome()}): R$ ${produto1.calcularValorTotalEstoque().toFixed(2)}`);
  console.log(`Produto 2 (${produto2.getNome()}): R$ ${produto2.calcularValorTotalEstoque().toFixed(2)}`);

  console.log("\n>> Informações finais dos produtos:");
  produto1.exibirInformacoes();
  produto2.exibirInformacoes();

  const valorTotalGeral = produto1.calcularValorTotalEstoque() + produto2.calcularValorTotalEstoque();
  console.log(`\nValor total geral do estoque: R$ ${valorTotalGeral.toFixed(2)}`);
}

main();
