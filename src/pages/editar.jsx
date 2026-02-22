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
  solitary: 0,
  pear: 0,
});
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState({
  image1: null,
  image2: null,
  image3: null,
});
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
  solitary: product.solitary ?? 0,
  pear: product.pear ?? 0,
});

        setImages({
  image1: product.image ? { file: null, url: product.image } : null,
  image2: product.image2 ? { file: null, url: product.image2 } : null,
  image3: product.image3 ? { file: null, url: product.image3 } : null,
});
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

  function handleSingleFile(file, key) {
  if (!file) return;

  const newImage = {
    file,
    url: URL.createObjectURL(file),
  };

  setImages((prev) => ({
    ...prev,
    [key]: newImage,
  }));
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
      formData.append("solitary", String(form.solitary));
formData.append("pear", String(form.pear));

      // só envia imagem se trocar
      if (images.image1?.file)
  formData.append("image", images.image1.file);

if (images.image2?.file)
  formData.append("image2", images.image2.file);

if (images.image3?.file)
  formData.append("image3", images.image3.file);


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


        <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <input
    type="checkbox"
    checked={form.solitary === 1}
    onChange={(e) =>
      setForm({ ...form, solitary: e.target.checked ? 1 : 0 })
    }
    style={{ width: 'auto', margin: 0 }}
  />
  Produto é modelo Solitário
</label>

<label className="label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <input
    type="checkbox"
    checked={form.pear === 1}
    onChange={(e) =>
      setForm({ ...form, pear: e.target.checked ? 1 : 0 })
    }
    style={{ width: 'auto', margin: 0 }}
  />
  Produto é modelo Gota (Pear)
</label>

        {/* IMAGEM */}
        <label className="label">
  Imagens do Produto
</label>

<div className="image-slots">
  {[
  { key: "image1", label: "Imagem 1 (Principal)" },
  { key: "image2", label: "Imagem 2" },
  { key: "image3", label: "Imagem 3" },
].map(({ key, label }) => (
    <div key={key} className="image-slot">
      <p className="image-slot-title">{label}</p>

      {images[key] ? (
        <div className="image-preview">
          <img src={images[key].url} alt={label} />
          <button
            type="button"
            className="image-remove"
            onClick={() =>
              setImages((prev) => ({ ...prev, [key]: null }))
            }
          >
            ×
          </button>
        </div>
      ) : (
        <label className="upload-box">
          Clique para enviar
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) =>
              handleSingleFile(e.target.files[0], key)
            }
          />
        </label>
      )}
    </div>
  ))}
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
