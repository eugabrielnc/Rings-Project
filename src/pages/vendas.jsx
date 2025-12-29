import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthData } from "../utils/dadosuser";

export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const authData = getAuthData();
  const [inputCode, setInputCode] = useState(false)
  const [code, setCode] = useState("");
  const [saleID, setSaleID] = useState("");  

  useEffect(() => {
    async function carregarDados() {
      try {
        const resSales = await fetch(`${url}/sales/`);
        const resProducts = await fetch(`${url}/products`);

        const salesRaw = await resSales.json();
        const productsRaw = await resProducts.json();

        const salesArray = Array.isArray(salesRaw) ? salesRaw : salesRaw.data || [];
        const productsArray = Array.isArray(productsRaw) ? productsRaw : productsRaw.data || [];

        const productsMap = new Map(
          productsArray.map((p) => [String(p.id), p])
        );

        const produtosCompletos = salesArray
          .filter((sale) => sale.status !== "cart") // 🚫 REMOVE CART
          .map((sale, index) => {
            const produto = productsMap.get(String(sale.product_id));

            return {
              key: sale.id,
              id: sale.product_id,
              name: produto?.name || "Produto não encontrado",
              price: produto?.price || 0,
              code:sale.code,
              user_cep:sale.user_cep,
              address:`${sale.state},${sale.city},${sale.neighboor},${sale.street}`,
              complement: sale.complement
            };
          });

        setProdutos(produtosCompletos);
      } catch (erro) {
        console.error("Erro:", erro);
        setProdutos([]);
      }
    }

    carregarDados();
  }, [url]);

  console.log(produtos);
  
  const atualizarCodigo = async () => {

  const dados = {
    sale_id:saleID,
    authorization:authData.token, 
    code:code 

  }

    const resPutSale = await fetch(`${url}/sales/`,{
      method:"PUT",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify(dados),
    }
      



    );

    console.log(dados);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "26px", color: "#C9A86A" }}>
        Gerenciar Vendas
      </h2>

    {inputCode &&
        <div  style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",

      }}>
    <h3>Atualizar código de rastreio ${saleID}</h3>
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="input-field"></input>

              <button onClick={(e) => atualizarCodigo()} className="login-button" style={{borderRadius:"20px",padding:"5px"}}> confirmar </button>
              <button onClick={(e) => setInputCode(false) }className="login-button" style={{borderRadius:"20px",padding:"5px", background:"red"}}> cancelar </button>
        </div>
    }

      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9F5EE" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Produto</th>
              <th style={thStyle}>Preço</th>
              <th style={thStyle}> Código de rastreio </th> 
              <th style={thStyle}>CEP cliente</th>
              <th style={thStyle}>Endereço</th>
              <th style={thStyle}>Complemento do endereço</th>
          </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.key}>
                <td style={tdStyle}>{produto.id}</td>
                <td style={tdStyle}>{produto.name}</td>
              <td style={tdStyle}>
                {Number(produto.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
                <td style={tdStyle} onClick={() => {setInputCode(true); setCode(produto.code); setSaleID(produto.key)}}>

              {inputCode || produto.code.length > 0 ?  produto.code : <button > add codigo </button>  }  


              </td>
                <td style={tdStyle}>{produto.user_cep}</td>
                <td style={tdStyle}>{produto.address}</td>
                <td style={tdStyle}>{produto.complement}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
const thStyle = {
  padding: "12px",
  textAlign: "left",
  color: "#444",
  fontWeight: "600",
  borderBottom: "2px solid #eee",
};

const tdStyle = {
  padding: "12px",
  fontSize: "15px",
  color: "#555",
};
