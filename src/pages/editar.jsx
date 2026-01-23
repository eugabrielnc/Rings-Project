import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/Css/formsproduto.css";
import { getAuthData } from "../utils/dadosuser";
import { FILTER_CONFIG } from "../utils/filters";

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
    stone: 0,
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
          stone: product.stone ?? 0,
        });

        const imgs = [];

        if (product.image) imgs.push({ file: null, url: product.image });
        if (product.image2) imgs.push({ file: null, url: product.image2 });
        if (product.image3) imgs.push({ file: null, url: product.image3 });
        if (product.image4) imgs.push({ file: null, url: product.image4 });

        setImages(imgs);

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
    const newFiles = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => {
      const merged = [...prev, ...newFiles];
      return merged.slice(0, 4);
    });
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
      formData.append("stone", form.stone);
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
        <select
          className="input"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
              material: "", // reseta material ao trocar o tipo
            })
          }
        >
          <option value="">Selecione um tipo</option>
          {Object.keys(FILTER_CONFIG).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* MATERIAL */}
        <label className="label">Material</label>
        <select
          className="input"
          value={form.material}
          onChange={(e) =>
            setForm({
              ...form,
              material: e.target.value,
            })
          }
          disabled={!form.type}
        >
          <option value="">
            {form.type ? "Selecione um material" : "Selecione um tipo primeiro"}
          </option>

          {form.type &&
            FILTER_CONFIG[form.type]?.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
        </select>

        {/* CHECKOUT */}
        <label className="label">Checkout Link</label>
        <input
          name="checkout_link"
          className="input"
          value={form.checkout_link}
          onChange={handleChange}
        />
        {/* PEDRA */}
        <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            checked={form.stone === 1}
            onChange={(e) =>
              setForm({
                ...form,
                stone: e.target.checked ? 1 : 0,
              })
            }
            style={{ width: 'auto', margin: 0 }}
          />
          Produto aceita pedras personalizadas
        </label>

        {/* IMAGEM */}
        <label className="label">Imagem</label>
        <div
          className="upload-zone"
          onClick={() => inputFileRef.current?.click()}
        >
          Clique ou solte até 4 imagens

          <input
            type="file"
            accept="image/*"
            multiple
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
