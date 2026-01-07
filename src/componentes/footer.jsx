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
                                O casal é o centro do nosso modelo de negócio, que combina design exclusivo, artesania de alto padrão e uma experiência pensada para celebrar histórias de amor únicas
                            </p>
                            <a href="#">
                                <img src="/img/cards.png" alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                        <div className="footer__widget">
                            <h6>Sobre nós</h6>
                            <ul>
                                <li>
                                    <a href="#">Nossa história</a>
                                </li>
                                <li>
                                    <a href="/contact">Nosso contato</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6">
                        <div className="footer__widget">
                            <h6>Compra</h6>
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
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                        <div className="footer__widget">
                            <h6>Fique por dentro</h6>
                            <div className="footer__newslatter">
                                <p>
                                    Seja o primeiro a saber sobre as novidades, catálogos, ofertas e promoções!
                                </p>
                                <form>
                                    <input type="text" placeholder="Seu e-mail" />
                                    <button type="submit">
                                        <span className="fa fa-envelope"></span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}