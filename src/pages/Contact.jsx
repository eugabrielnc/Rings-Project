import React from "react";

const Contact = () => {
  return (
    <div>

      {/* Map Section */}
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3995.1234567890123!2d-52.0082000!3d-24.0330000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94fbba0000000001%3A0xabcdef1234567890!2sAv.%20Paran%C3%A1%2C%202900%20-%20Vila%20Mineira%2C%20Barbosa%20Ferraz%20-%20PR%2C%2086960-000%2C%20Brazil!5e0!3m2!1spt-BR!2sbr!4v1700000000000
"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
        />
      </div>

      {/* Contact Section */}
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="contact__text">
                <div className="section-title">
                  <span>Informações</span>
                </div>
                <ul>
                  <li>
                    <h4>📍 Onde estamos</h4>
                    <p>A Alianças Eternas é uma empresa especializada na revenda de alianças, atuando de forma 100% online, com atendimento personalizado para todo o Brasil.
                      Trabalhamos em parceria com uma fábrica consolidada no setor desde 1995, responsável pela produção das alianças com alto padrão de qualidade, acabamento premium e materiais selecionados.
                    </p>
                  </li>
                  <li>
                    <h4>📌 Endereço da fábrica parceira:</h4>
                    <p>⬆️ Acima você pode visualizar a localização da fábrica no Google Maps.</p>
                    <p>Av. Paraná, 2900 – Vila Mineira
                      Barbosa Ferraz – PR – CEP 86960-000
                    </p>
                  </li>
                  <li>
                    <h4>🏭 Como funciona nossa operação</h4>
                    <p>Nossa estrutura funciona de forma organizada para
                      garantir agilidade, segurança e qualidade em cada pedido:
                    </p>
                    <p>💬 Atendimento e vendas: realizados de forma online, com suporte personalizado via WhatsApp
                    </p>
                    <p>📦 Separação e logística: centralizadas em Maringá - PR, garantindo conferência e envio rápido com código de rastreio pelos Correios
                    </p>
                    <p>🏭 Fabricação: realizada na unidade de Barbosa Ferraz – PR, onde as alianças são produzidas
                    </p>
                    <p>Esse modelo nos permite atender clientes de todas as regiões do Brasil com eficiência e controle de qualidade.
                    </p>
                  </li>
                  <li>
                    <h4>💛 Por que comprar com a Alianças Eternas?</h4>
                    <p>Ao comprar conosco, você não está apenas adquirindo alianças, mas contando com um serviço completo:</p>
                    <p>✔ Atendimento humano e personalizado
                    </p>
                    <p>✔ Ajuda na escolha do modelo e do tamanho ideal
                    </p>
                    <p>✔ Acompanhamento do pedido do início ao fim</p>
                    <p>✔ Frete otimizado para sua região</p>
                    <p>✔ Suporte antes, durante e após a compra</p>
                    <p>Nosso compromisso é oferecer segurança, transparência e uma excelente experiência de compra, especialmente para um momento tão importante quanto um noivado ou casamento.
                    </p>
                  </li>
                  <li>
                    <h4>ℹ️ Importante saber
                    </h4>
                    <p>A Alianças Eternas é uma loja online. No momento, não realizamos atendimento presencial.
                      Nosso foco é oferecer praticidade, conforto e segurança para que você possa comprar suas alianças de onde estiver.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="contact__img">
                <img src="/img/contact/local.jpg" alt="" />
                <img src="/img/contact/joias.jpg" alt="" />
                <img src="/img/contact/moedas.jpg" alt="" />
                <img src="/img/contact/fazendo.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Contact;
