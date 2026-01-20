import '../assets/Css/bootstrap.min.css';
import '../assets/Css/font-awesome.min.css';
import '../assets/Css/elegant-icons.css';
import '../assets/Css/magnific-popup.css';
import '../assets/Css/nice-select.css';
import '../assets/Css/owl.carousel.min.css';
import '../assets/Css/slicknav.min.css';
import '../assets/Css/style.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer__about">
                            <div className="footer__logo">
                                <a href="#">
                                    <img src="/img/1767797462566.png" alt="" />
                                </a>
                            </div>
                            <p>
                                Nosso trabalho começa no amor e termina na eternidade. Criamos alianças com design refinado e qualidade excepcional para celebrar histórias únicas.
                            </p>
                            <a href="#">
                                <img src="/img/cards2.png" alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6">
                        <div className="footer__widget">
                            <h6>Institucional</h6>
                            <ul>
                                <li>
                                    <a href="/infopag">Detalhes de Pagamento</a>
                                </li>
                                <li>
                                    <a href="/garantia">Garantias</a>
                                </li>
                                <li>
                                    <a href="/termouser">Termos de Uso</a>
                                </li>
                                <li>
                                    <a href="/pag">Politicas de Privacidade</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6">
                        <div className="footer__widget footer__atendimento">
                            <h6>Atendimento</h6>
                            <ul>
                                <li><a href="tel:82991394107">82 99139-4107</a></li>
                                <li><a href="tel:81935000006">81 93500-0006</a></li>
                                <li>
                                    <a href="mailto:aliancaseternasofc@gmail.com">
                                        aliancaseternasofc@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>


                   
                </div>
            </div>
        </footer>
    );
}