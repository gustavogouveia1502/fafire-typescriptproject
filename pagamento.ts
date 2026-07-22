/**
 * Desafio 2 - Padrões de Projeto
 * Padrão escolhido: STRATEGY (Comportamental)
 *
 * Cenário: Sistema de processamento de pagamentos de um pedido de e-commerce.
 * O mesmo pedido pode ser pago de formas diferentes (Cartão de Crédito, Pix,
 * Boleto), cada uma com sua própria regra de cálculo (taxas/descontos) e
 * forma de confirmação. O Strategy permite trocar o algoritmo de pagamento
 * em tempo de execução, sem alterar a classe do Pedido (Context).
 *
 * Referência: https://refactoring.guru/design-patterns/strategy
 */

// ---------- Interface Strategy ----------
interface EstrategiaPagamento {
  calcularValorFinal(valor: number): number;
  processarPagamento(valor: number): void;
  getNomeMetodo(): string;
}

// ---------- Estratégias Concretas ----------

class PagamentoCartaoCredito implements EstrategiaPagamento {
  private numeroCartao: string;
  private parcelas: number;

  constructor(numeroCartao: string, parcelas: number = 1) {
    this.numeroCartao = numeroCartao;
    this.parcelas = parcelas;
  }

  public getNomeMetodo(): string {
    return "Cartão de Crédito";
  }

  // Cartão de crédito aplica juros de 2% ao mês a partir da 2ª parcela
  public calcularValorFinal(valor: number): number {
    if (this.parcelas <= 1) {
      return valor;
    }
    const taxaJuros = 0.02 * (this.parcelas - 1);
    return valor * (1 + taxaJuros);
  }

  public processarPagamento(valor: number): void {
    const valorFinal = this.calcularValorFinal(valor);
    const ultimosDigitos = this.numeroCartao.slice(-4);
    console.log(
      `[Cartão de Crédito] Cobrando R$ ${valorFinal.toFixed(2)} em ${this.parcelas}x ` +
        `no cartão final ${ultimosDigitos}.`
    );
  }
}

class PagamentoPix implements EstrategiaPagamento {
  private chavePix: string;

  constructor(chavePix: string) {
    this.chavePix = chavePix;
  }

  public getNomeMetodo(): string {
    return "Pix";
  }

  // Pix concede 5% de desconto por ser instantâneo
  public calcularValorFinal(valor: number): number {
    return valor * 0.95;
  }

  public processarPagamento(valor: number): void {
    const valorFinal = this.calcularValorFinal(valor);
    console.log(
      `[Pix] Gerando QR Code para a chave "${this.chavePix}". ` +
        `Valor com 5% de desconto: R$ ${valorFinal.toFixed(2)}.`
    );
  }
}

class PagamentoBoleto implements EstrategiaPagamento {
  private cpfPagador: string;

  constructor(cpfPagador: string) {
    this.cpfPagador = cpfPagador;
  }

  public getNomeMetodo(): string {
    return "Boleto Bancário";
  }

  // Boleto cobra taxa fixa de R$ 3,50
  public calcularValorFinal(valor: number): number {
    return valor + 3.5;
  }

  public processarPagamento(valor: number): void {
    const valorFinal = this.calcularValorFinal(valor);
    console.log(
      `[Boleto] Emitindo boleto para o CPF ${this.cpfPagador}. ` +
        `Valor com taxa de emissão: R$ ${valorFinal.toFixed(2)}.`
    );
  }
}

// ---------- Contexto ----------

class Pedido {
  private itens: { descricao: string; valor: number }[] = [];
  private estrategiaPagamento: EstrategiaPagamento | null = null;

  constructor(private readonly numeroPedido: string) {}

  public adicionarItem(descricao: string, valor: number): void {
    this.itens.push({ descricao, valor });
  }

  public calcularSubtotal(): number {
    return this.itens.reduce((total, item) => total + item.valor, 0);
  }

  // Permite trocar a estratégia de pagamento em tempo de execução
  public definirEstrategiaPagamento(estrategia: EstrategiaPagamento): void {
    this.estrategiaPagamento = estrategia;
  }

  public finalizarCompra(): void {
    if (!this.estrategiaPagamento) {
      console.log("Nenhuma forma de pagamento selecionada.");
      return;
    }

    const subtotal = this.calcularSubtotal();
    console.log(`\nPedido ${this.numeroPedido} - Subtotal: R$ ${subtotal.toFixed(2)}`);
    console.log(`Forma de pagamento escolhida: ${this.estrategiaPagamento.getNomeMetodo()}`);
    this.estrategiaPagamento.processarPagamento(subtotal);
  }
}

// ============ Programa Principal ============

function main(): void {
  console.log("=== Sistema de Pagamentos (Padrão Strategy) ===");

  const pedido1 = new Pedido("PED-1001");
  pedido1.adicionarItem("Notebook", 3200.0);
  pedido1.adicionarItem("Mochila para Notebook", 150.0);

  const pedido2 = new Pedido("PED-1002");
  pedido2.adicionarItem("Livro de TypeScript", 89.9);
  pedido2.adicionarItem("Caneca personalizada", 35.0);

  // Pedido 1 pago no cartão de crédito parcelado
  pedido1.definirEstrategiaPagamento(new PagamentoCartaoCredito("1234567812345678", 3));
  pedido1.finalizarCompra();

  // Pedido 2 pago via Pix
  pedido2.definirEstrategiaPagamento(new PagamentoPix("cliente@email.com"));
  pedido2.finalizarCompra();

  // Demonstrando a troca de estratégia em tempo de execução no mesmo pedido
  console.log("\n>> Cliente do Pedido 2 decide trocar a forma de pagamento para Boleto:");
  pedido2.definirEstrategiaPagamento(new PagamentoBoleto("123.456.789-00"));
  pedido2.finalizarCompra();
}

main();
