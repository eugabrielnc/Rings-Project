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
        user_cep: product.user_cep,
        state: product.state ?? "",
        city: product.city ?? "",
        neighboor: product.neighboor ?? "",
        street: product.street  ?? "",
        complement: product.complement ?? "", 
        status: product.status ?? "",
        gravacaoMasc:
        product.sizes
        ?.split("/")?.[1]
        ?.split(",")?.[1]
        ?.split("masc:")?.[1] ?? "",

        gravacaoFem:
        product.sizes
        ?.split("/")?.[1]
        ?.split(",")?.[0]
        ?.split("fem:")?.[1] ?? "",

        sizeFem:
          product.sizes
            ?.split("/")?.[0]
            ?.split(",")?.[0]
            ?.split("fem:")?.[1] ?? "",

        sizeMasc:
          product.sizes
            ?.split("/")?.[0]
            ?.split(",")?.[1]
            ?.split("masc:")?.[1] ?? "",

      });

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
          sizes:`fem:${form.sizeFem},masc:${form.sizeMasc}/fem:${form.gravacaoMasc},masc:${form.gravacaoFem}`,
          ...form
        }),
      });

      if (!res.ok) {
        alert("Erro ao atualizar venda");
        return;
      }

      setSuccessMessage("Produto atualizado com sucesso!");

      setTimeout(() => {
        navigate("/admin/vendas");
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

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px"
    }}
  >
    {/* STATUS */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Status</label>
      <select
        name="status"
        className="input"
        value={form.status}
        onChange={handleChange}
      >
        <option value="">Selecione</option>
        <option value="aguardando pagamento">aguardando pagamento</option>
        <option value="pagamento confirmado">pagamento confirmado</option>
        <option value="em produção">em produção</option>
        <option value="a caminho">a caminho</option>
        <option value="entregue">entregue</option>
      </select>
    </div>

    {/* CÓDIGO */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Código de rastreio</label>
      <input
        name="code"
        className="input"
        value={form.code}
        onChange={handleChange}
      />
    </div>

    {/* QUANTIDADE */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Quantidade</label>
      <input
        name="amount"
        type="number"
        className="input"
        value={form.amount}
        onChange={handleChange}
      />
    </div>

    {/* GRAVAÇÃO MASC */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Gravação Masculina</label>
      <input
        name="gravacaoMasc"
        className="input"
        value={form.gravacaoMasc}
        onChange={handleChange}
      />
    </div>

    {/* GRAVAÇÃO FEM */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Gravação Feminina</label>
      <input
        name="gravacaoFem"
        className="input"
        value={form.gravacaoFem}
        onChange={handleChange}
      />
    </div>

    {/* TAM FEM */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Tamanho Aliança Feminina</label>
      <input
        name="sizeFem"
        className="input"
        value={form.sizeFem}
        onChange={handleChange}
      />
    </div>

    {/* TAM MASC */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Tamanho Aliança Masculina</label>
      <input
        name="sizeMasc"
        className="input"
        value={form.sizeMasc}
        onChange={handleChange}
      />
    </div>

    {/* CEP */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">CEP do cliente</label>
      <input
        name="user_cep"
        className="input"
        value={form.user_cep}
        onChange={handleChange}
      />
    </div>

    {/* ESTADO */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Estado</label>
      <input
        name="state"
        className="input"
        value={form.state}
        onChange={handleChange}
      />
    </div>

    {/* CIDADE */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Cidade</label>
      <input
        name="city"
        className="input"
        value={form.city}
        onChange={handleChange}
      />
    </div>

    {/* BAIRRO */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Bairro</label>
      <input
        name="neighboor"
        className="input"
        value={form.neighboor}
        onChange={handleChange}
      />
    </div>

    {/* RUA */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Rua</label>
      <input
        name="street"
        className="input"
        value={form.street}
        onChange={handleChange}
      />
    </div>

    {/* NÚMERO */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Número da rua</label>
      <input
        name="number"
        className="input"
        value={form.number}
        onChange={handleChange}
      />
    </div>

    {/* COMPLEMENTO */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className="label">Complemento</label>
      <input
        name="complement"
        className="input"
        value={form.complement}
        onChange={handleChange}
      />
    </div>
  </div>

  <button
    className="button-primary"
    disabled={submitting}
    style={{ marginTop: "20px" }}
  >
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
