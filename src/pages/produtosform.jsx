import React, { useState, useRef } from "react";
import "../assets/Css/formsproduto.css";
import { getAuthData } from "../utils/dadosuser";

export default function CreateProductPage() {
  const authData = getAuthData();
  const url = import.meta.env.VITE_API_URL;
  const inputFileRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    material: "",
    checkout_link: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  async function handleSubmit(e) {
    e.preventDefault();

    if (!authData?.token) {
      alert("Usuário não autenticado");
      return;
    }

    if (images.length === 0) {
      alert("Envie uma imagem");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", Number(form.price));
      formData.append("authorization", authData.token);
      formData.append("type", form.type);
      formData.append("material", form.material);
      formData.append("checkout_link", form.checkout_link);
      formData.append("image", images[0].file);

      const res = await fetch(`${url}/products/`, {
        method: "POST",
        body: formData,
      });

      const data = await res.text();

      if (!res.ok) {
        console.error(data);
        alert("Erro ao criar produto");
        return;
      }

      setSuccessMessage(data); // ex: "concluido"

      setSuccessMessage("Produto criado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro inesperado");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <h1
        style={{
          color: "var(--gold)",
          fontWeight: "700",
          marginBottom: "20px",
        }}
      >
        Criar Produto
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
        {errors.name && <p className="error-text">{errors.name}</p>}

        {/* PREÇO */}
        <label className="label">Preço</label>
        <input
          name="price"
          type="number"
          className="input"
          value={form.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error-text">{errors.price}</p>}

        {/* TIPO */}
        <label className="label">Tipo</label>
        <input
          name="type"
          className="input"
          value={form.type}
          onChange={handleChange}
        />
        {errors.type && <p className="error-text">{errors.type}</p>}

        {/* MATERIAL */}
        <label className="label">Material</label>
        <input
          name="material"
          className="input"
          value={form.material}
          onChange={handleChange}
        />
        {errors.material && <p className="error-text">{errors.material}</p>}

        {/* CHECKOUT LINK */}
        <label className="label">Checkout Link</label>
        <input
          name="checkout_link"
          className="input"
          value={form.checkout_link}
          onChange={handleChange}
        />
        {errors.checkout_link && (
          <p className="error-text">{errors.checkout_link}</p>
        )}

        {/* IMAGEM */}
        <label className="label">Imagem</label>
        <div
          className="upload-zone"
          onClick={() => inputFileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
        >
          Clique ou solte imagens aqui
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
                  onClick={() =>
                    setImages(images.filter((_, idx) => idx !== i))
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* SUBMIT */}
        <button className="button-primary" disabled={submitting}>
          {submitting ? "Salvando..." : "Salvar Produto"}
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
