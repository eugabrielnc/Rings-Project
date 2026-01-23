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
                    {/* Logo */}
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="footer__about">
                            <div className="footer__logo">
                                <a href="#">
                                    <img src="/img/1767797462566.png" alt="" />
                                </a>
                            </div>
                            <p className="footer__text">
                                Nosso trabalho começa no amor e termina na eternidade. Criamos alianças com design refinado e qualidade excepcional para celebrar histórias únicas.
                            </p>
                            <div className="footer__cards">
                                <img src="/img/cards2.png" alt="Formas de pagamento" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Institucional */}
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
                                    <a href="/pag">Políticas de Privacidade</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Atendimento */}
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
                    
                    {/* Selos de Segurança - Desktop */}
                    <div className="col-lg-4 col-md-12 d-none d-lg-flex">
                        <div className="footer__security">
                            <div className="footer__security__badges">
                                <div className="security-badge">
                                    <i className="fa fa-lock"></i>
                                    <span>Site Seguro</span>
                                </div>
                                <div className="security-badge">
                                    <i className="fa fa-shield"></i>
                                    <span>Dados Protegidos</span>
                                </div>
                                <div className="security-badge">
                                    <i className="fa fa-credit-card"></i>
                                    <span>Pag. Seguro</span>
                                </div>
                                <div className="security-badge">
                                    <i className="fa fa-check-circle"></i>
                                    <span>Garantido</span>
                                </div>
                                <div className="security-badge">
                                    <i className="fa fa-truck"></i>
                                    <span>Rastreado</span>
                                </div>
                            </div>
                            <div className="footer__security__cards">
                                <img src="/img/cards2.png" alt="Formas de pagamento" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}