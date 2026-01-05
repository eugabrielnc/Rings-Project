import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/Css/formsproduto.css";
import { getAuthData } from "../utils/dadosuser";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authData = getAuthData();
  const url = import.meta.env.VITE_API_URL;
  const inputFileRef = useRef(null);
  
  const [form, setForm] = useState({
    status: "",
    code: "",
  });
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // 🔹 BUSCAR PRODUTO
 useEffect(() => {
  async function carregarProduto() {
    try {
      const res = await fetch(`${url}/sales/sale/${id}`);
      const data = await res.json();

      console.log("PRODUTO DA API:", data);

      const product = Array.isArray(data) ? data[0] : data;

      setForm({
        sale_id: product.id, 
        code: product.code ?? "",
        user_cep: product.user_cep ?? "",
        state: product.state ?? "",
        city: product.city ?? "",
        neighboor: product.neighboor ?? "",
        street: product.street  ?? "",
        complement: product.complement ?? "", 
        status: product.status ?? "",
      });

      console.log(status, "teste")

      if (product.image) {
        setImages([{ file: null, url: product.image }]);
      }
    } catch (err) {
      console.error("Erro ao carregar produto:", err);
    } finally {
      setLoading(false);
    }
  }

  carregarProduto();
}, [id]);


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFiles(files) {
    const arr = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages(arr);
  }

  // 🔹 SUBMIT (UPDATE)
  async function handleSubmit(e) {
    e.preventDefault();
    
    console.log("DICITIONARIO",form.sale_id)


    if (!authData?.token) {
      alert("Usuário não autenticado");
      return;
    }

    setSubmitting(true);

    try {

      const res = await fetch(`${url}/sales`, {
        headers:{"Content-Type":"application/json"}, 
        method: "PUT",
        body: JSON.stringify({
          authorization: authData.token,
          ...form
        }),
      });

      if (!res.ok) {
        alert("Erro ao atualizar venda");
        return;
      }

      setSuccessMessage("Produto atualizado com sucesso!");

      setTimeout(() => {
        navigate("/admin/produto");
      }, 1200);
    } catch (err) {
      console.error(err);
      alert("Erro inesperado");
    } finally {
      setSubmitting(false);
    }
  }
if (loading) {
  return <p>Carregando produto...</p>;
}


  return (
    <div className="container">
      <h1 style={{ color: "var(--gold)", fontWeight: "700", marginBottom: "20px" }}>
        Editar Vendas 
      </h1>

      <form onSubmit={handleSubmit} className="card">
    <label className="label">Status</label>
    {/* STATUS */}
    <select
      name="status"
      className="input"
      value={form.status}
      onChange={handleChange}
    >
      <option value="">Selecione</option>
      <option value="Aguardando pagamento">Aguardando pagamento</option>
      <option value="pagamento concluido">pagamento concluido</option>
      <option value="em produção">em produção</option>
      <option value="a caminho">a caminho</option>
      <option value="entregue">entregue</option>
    </select>

        {/* NOME */}
        <label className="label"> Código de rastreio</label>
        <input
          name="code"
          className="input"
          value={form.code}
          onChange={handleChange}
        />

        

        {/* PREÇO */}
        <label className="label">Quantidade</label>
        <input
          name="amount"
          type="number"
          className="input"
          value={form.amount}
         // onChange={handleChange}
        />

        {/* TIPO */}
        <label className="label">CEP do cliente</label>
        <input
          name="user_cep"
          className="input"
          value={form.user_cep}
          onChange={handleChange}
        />

        {/* MATERIAL */}
        <label className="label">Estado</label>
        <input
          name="state"
          className="input"
          value={form.state}
          onChange={handleChange}
        />

        {/* CHECKOUT */}
        <label className="label">Cidade</label>
        <input
          name="city"
          className="input"
          value={form.city}
          onChange={handleChange}
        />

      <label className="label">Bairro</label>
        <input
          name="neighboor"
          className="input"
          value={form.neighboor}
          onChange={handleChange}
        />

      <label className="label">Rua</label>
        <input
          name="street"
          className="input"
          value={form.street}
          onChange={handleChange}
        />

        <label className="label">Número da rua</label>
        <input
          name="number"
          className="input"
          value={form.number}
          onChange={handleChange}
        />

         <label className="label">Complemento de endereço</label>
        <input
          name="complement"
          className="input"
          value={form.complement}
          onChange={handleChange}
        />




                {/* PREVIEW */}
        {images.length > 0 && (
          <div className="image-grid">
            {images.map((img, i) => (
              <div key={i} className="image-preview">
                <img src={img.url} alt="preview" />
                <button
                  type="button"
                  className="image-remove"
                  onClick={() => setImages([])}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <button className="button-primary" disabled={submitting}>
          {submitting ? "Salvando..." : "Salvar Alterações"}
        </button>

        {successMessage && (
          <p style={{ color: "green", marginTop: "10px" }}>
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
}
