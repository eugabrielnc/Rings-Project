import "../assets/Css/garantia.css"


export default function InformacoesPagamentoMain() {
  return (
    <main className="pg-garantia-wrapper">

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">Formas de Pagamento – Alianças Eternas</h2>
        <p>
          Na Alianças Eternas, oferecemos opções de pagamento seguras, práticas e
          confiáveis para garantir uma experiência de compra tranquila do início ao fim.
        </p>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">1. Cartão de Crédito</h2>
        <p>
          Aceitamos as principais bandeiras por meio de plataforma de pagamento segura:
        </p>
        <ul className="pg-garantia-lista">
          <li>Visa</li>
          <li>Mastercard</li>
          <li>Elo</li>
          <li>American Express</li>
          <li>Hipercard</li>
          <li>Diners Club</li>
          <li>Cabal</li>
        </ul>

        <ul className="pg-garantia-lista">
          <li>Parcelamento em até <strong>6x sem juros</strong></li>
          <li>Transações realizadas em ambiente criptografado</li>
          <li>Não armazenamos dados do cartão em nossos sistemas</li>
        </ul>

        <p>
          Todo o processo é feito diretamente pela operadora de pagamento,
          garantindo total segurança.
        </p>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">2. Pix</h2>
        <p>
          Pagamento rápido e seguro via Pix, com aprovação imediata.
        </p>
        <ul className="pg-garantia-lista">
          <li>QR Code ou chave Pix</li>
          <li>Desconto especial quando disponível (verifique no checkout)</li>
        </ul>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">3. Boleto Bancário</h2>
        <p>
          Pagamento à vista por boleto bancário.
        </p>
        <ul className="pg-garantia-lista">
          <li>Boleto emitido pela plataforma de pagamento</li>
          <li>Prazo de vencimento informado no momento da compra</li>
          <li>
            A compensação pode levar até <strong>2 dias úteis</strong> após o pagamento
          </li>
        </ul>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">Segurança e Transparência</h2>
        <ul className="pg-garantia-lista">
          <li>Todas as transações utilizam criptografia SSL</li>
          <li>Seus dados pessoais e financeiros são totalmente protegidos</li>
          <li>Não armazenamos informações sensíveis de pagamento</li>
        </ul>

        <p className="pg-garantia-aviso">
          Em casos excepcionais de suspeita de fraude, o pedido poderá passar por
          análise antes da confirmação, visando a segurança do cliente.
        </p>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">Dúvidas ou problemas com o pagamento?</h2>
        <p>
          Após a finalização do pedido, não é possível alterar a forma de pagamento.
        </p>

        <p>
          Se houver erro ou recusa na transação:
        </p>
        <ul className="pg-garantia-lista">
          <li>O pedido será automaticamente cancelado</li>
          <li>O valor será estornado conforme as regras da operadora</li>
          <li>Uma nova compra deverá ser realizada</li>
        </ul>

        <p>
          Para suporte, entre em contato conosco:
        </p>
        <p>
          <strong>E-mail:</strong> aliancaseternasofc@gmail.com<br /><br />
          <strong>WhatsApp:</strong> atendimento disponível em horário comercial
        </p>
      </section>

    </main>
  );
}
