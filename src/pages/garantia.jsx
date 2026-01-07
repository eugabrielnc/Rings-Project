import "../assets/Css/garantia.css";

export default function PoliticaGarantiaMain() {
  return (
    <main className="pg-garantia-wrapper">

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">1. Produção e Envio</h2>
        <p>
          O prazo de fabricação das alianças varia conforme o modelo escolhido,
          podendo levar até <strong>20 dias úteis</strong> após a confirmação do pagamento.
        </p>
        <p>
          O prazo de entrega passa a contar a partir da data de postagem,
          realizada via Correios, conforme a modalidade de envio selecionada.
        </p>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">2. Garantia Legal e Garantia do Material</h2>
        <ul className="pg-garantia-lista">
          <li>
            <strong>Garantia legal de 90 dias</strong>, conforme o Código de Defesa do Consumidor.
          </li>
          <li>
            <strong>Garantia vitalícia do material</strong>, assegurando a qualidade do metal.
          </li>
        </ul>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">3. O que está coberto pela garantia</h2>
        <ul className="pg-garantia-lista">
          <li>Defeitos de fabricação.</li>
          <li>Problemas estruturais no metal ou na montagem da peça.</li>
        </ul>

        <p className="pg-garantia-aviso">
          Não estão cobertos danos causados por mau uso, incluindo quedas, impactos,
          riscos, desgaste natural, exposição a produtos químicos, perfumes, cremes,
          suor excessivo ou alterações químicas do organismo.
        </p>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">4. Como acionar a garantia</h2>
        <ul className="pg-garantia-lista">
          <li>Entre em contato com nosso suporte via WhatsApp.</li>
          <li>Informe:
            <ul className="pg-garantia-sublista">
              <li>Nome completo do comprador</li>
              <li>Data da compra</li>
              <li>Número do pedido (solicitar ao suporte)</li>
              <li>Modelo da aliança</li>
              <li>Descrição detalhada do problema</li>
            </ul>
          </li>
          <li>Envie um vídeo claro da peça demonstrando o defeito.</li>
        </ul>
        <p>
          Após a análise inicial, nossa equipe orientará sobre o envio do produto
          pelos Correios para avaliação técnica.
        </p>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">5. Avaliação, reparo ou substituição</h2>
        <p>
          Após o recebimento da peça, a fábrica realizará uma avaliação técnica.
          Confirmado o defeito, o produto será reparado ou substituído.
          Caso o reparo não seja possível, a substituição ocorrerá por produto
          igual ou similar, conforme disponibilidade em estoque.
        </p>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">6. Exclusões da garantia</h2>
        <ul className="pg-garantia-lista">
          <li>Uso inadequado ou negligente.</li>
          <li>Quedas, impactos ou traumas físicos.</li>
          <li>Contato com produtos químicos.</li>
          <li>Desgaste natural pelo uso contínuo.</li>
          <li>Reações químicas do organismo.</li>
        </ul>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">7. Custos de envio</h2>
        <p>
          Os custos de envio do produto para avaliação, bem como o retorno ou
          substituição, são de responsabilidade do cliente, salvo disposição
          legal em contrário.
        </p>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">8. Atualizações desta política</h2>
        <p>
          A Alianças Eternas reserva-se o direito de alterar esta política a
          qualquer momento, sem aviso prévio. Recomendamos a consulta periódica
          desta página.
        </p>
      </section>

      <section className="pg-garantia-bloco">
        <h2 className="pg-garantia-titulo">9. Contato para suporte</h2>
        <p>
          <strong>WhatsApp:</strong> (82) 99139-4107<br />
          <strong>WhatsApp:</strong> (81) 93500-0006<br /><br />
          <strong>E-mail:</strong> aliancaseternasofc@gmail.com
        </p>
      </section>

    </main>
  );
}
