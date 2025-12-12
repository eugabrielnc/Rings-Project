import React, { useState, useRef } from "react";
import "../assets/Css/formsproduto.css";

export default function CreateProductPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
  });
const url = import.meta.env.VITE_API_URL;
  const [images, setImages] = useState([]); // ← AQUI GARANTE QUE EXISTE
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const inputFileRef = useRef(null);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Nome do produto é obrigatório";
    if (!form.price || Number(form.price) <= 0) e.price = "Preço inválido";
    return e;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFiles(list) {
    const arr = Array.from(list).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages([...images, ...arr]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const eVal = validate();
    setErrors(eVal);
    if (Object.keys(eVal).length) return;

    setSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("price", Number(form.price));
      formData.append("authorization", "public");

      if (images.length === 0) {
        alert("Envie ao menos 1 imagem!");
        setSubmitting(false);
        return;
      }

      // ENVIO CORRETO DA IMAGEM COMO UploadFile
      formData.append("image", images[0].file);

      const res = await fetch(`${url}/products`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Resposta da API:", data);

      if (!res.ok) {
        alert("Erro API: " + JSON.stringify(data));
        setSubmitting(false);
        return;
      }

      setSuccessMessage("Produto criado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro inesperado ao enviar o produto");
    }

    setSubmitting(false);
  }

  return (
    <div className="container">
      <h1 style={{ color: "var(--gold)", fontWeight: "700", marginBottom: "20px" }}>
        Criar Produto
      </h1>

      <form onSubmit={handleSubmit} className="card">
        <label className="label">Nome</label>
        <input
          name="name"
          className="input"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <label className="label">Preço</label>
        <input
          name="price"
          className="input"
          value={form.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error-text">{errors.price}</p>}

        <label className="label">Imagem</label>
        <div
          className="upload-zone"
          onClick={() => inputFileRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
        >
          Clique ou solte imagens aqui
          <input
            type="file"
            ref={inputFileRef}
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {images.length > 0 && (
          <div className="image-grid">
            {images.map((img, i) => (
              <div key={i} className="image-preview">
                <img src={img.url} alt="preview" />
                <button
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

        <button className="button-primary" disabled={submitting}>
          {submitting ? "Salvando..." : "Salvar Produto"}
        </button>

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
}
