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
    name: "",
    price: "",
    type: "",
    material: "",
    checkout_link: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // 🔹 BUSCAR PRODUTO
 useEffect(() => {
  async function carregarProduto() {
    try {
      const res = await fetch(`${url}/products/${id}`);
      const data = await res.json();

      console.log("PRODUTO DA API:", data);

      const product = Array.isArray(data) ? data[0] : data;

      setForm({
        name: product.name ?? "",
        price: product.price != null ? String(product.price) : "",
        type: product.type ?? "",
        material: product.material ?? "",
        checkout_link: product.checkout_link ?? "",
        status: product.status ?? "",
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

    if (!authData?.token) {
      alert("Usuário não autenticado");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("product_id", id);
      formData.append("authorization", authData.token);
      formData.append("name", form.name);
      formData.append("price", Number(form.price));
      formData.append("type", form.type);
      formData.append("material", form.material);
      formData.append("checkout_link", form.checkout_link);
      formData.append("status", form.status);

      // só envia imagem se trocar
      if (images[0]?.file) {
        formData.append("image", images[0].file);
      }

      const res = await fetch(`${url}/products/`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        alert("Erro ao atualizar produto");
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
        Editar Produto
      </h1>

      <form onSubmit={handleSubmit} className="card">
        {/* NOME */}
        <label className="label">Nome</label>
        <input
          name="name"
          className="input"
          value={form.name}
          onChange={handleChange}
        />

        

        {/* PREÇO */}
        <label className="label">Preço</label>
        <input
          name="price"
          type="number"
          className="input"
          value={form.price}
          onChange={handleChange}
        />

        {/* STATUS */}
        <label className="label">Status</label>
        <select
          name="status"
          className="input"
          value={form.status}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>

        {/* TIPO */}
        <label className="label">Tipo</label>
        <input
          name="type"
          className="input"
          value={form.type}
          onChange={handleChange}
        />

        {/* MATERIAL */}
        <label className="label">Material</label>
        <input
          name="material"
          className="input"
          value={form.material}
          onChange={handleChange}
        />

        {/* CHECKOUT */}
        <label className="label">Checkout Link</label>
        <input
          name="checkout_link"
          className="input"
          value={form.checkout_link}
          onChange={handleChange}
        />

        {/* IMAGEM */}
        <label className="label">Imagem</label>
        <div
          className="upload-zone"
          onClick={() => inputFileRef.current?.click()}
        >
          Clique ou solte imagem aqui
          <input
            type="file"
            accept="image/*"
            ref={inputFileRef}
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

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
