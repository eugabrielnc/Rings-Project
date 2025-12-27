import { Link } from "react-router-dom";
import '../assets/Css/megamenu.css';

export default function MegaMenu({ category, isOpen }) {
  const menuContent = {
    aliancas: {
      sections: [
        {
          items: [
            "Aliança de Moedas",
            "Alianças de prata",
            "Alianças de Ouro 10k",
          ]
        },
      ]
    },
    brincos: {
      sections: [
        {
          items: [
           "Moeda antiga com banho a ouro 18k"
          ]
        },
      ]
    },
    pingentes: {
      sections: [
        {
          items: [
            "Moeda antiga com banho a ouro 18k"
          ]
        },
      ]
    },
    aneis: {
      sections: [
        {
          items: [
            "Anéis de formatura",
            "Anéis/Masculinos Moeda",
            "Anéis Solitários e Aparadores Moeda",
            "Anéis de Prata",
          ]
        },
      ]
    }
  };

  const content = menuContent[category];

  if (!content || !isOpen) return null;

  return (
    <div className="mega-menu">
      <div className="mega-menu__content">
        {content.sections.map((section, index) => (
          <div key={index} className="mega-menu__section">
            <h3 className="mega-menu__title">{section.title}</h3>
            {section.items.length > 0 && (
              <ul className="mega-menu__list">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <Link to={`/shop?filter=${item}`}>{item}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
