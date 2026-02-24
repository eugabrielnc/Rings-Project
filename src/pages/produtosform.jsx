import React, { useState, useRef } from "react";
import "../assets/Css/formsproduto.css";
import { getAuthData } from "../utils/dadosuser";
import { FILTER_CONFIG } from "../utils/filters";


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
  stone: 0,
  solitary: 0,
  pear: 0,
});

  const [images, setImages] = useState({
  image1: null,
  image2: null,
  image3: null,
});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  



  async function handleSubmit(e) {
    e.preventDefault();

    if (!authData?.token) {
      alert("Usuário não autenticado");
      return;
    }

    if (!images.image1) {
  alert("A Imagem 1 (Principal) é obrigatória");
  return;
}

    setSubmitting(true);

    try {
      const formData = new FormData();


      formData.append("authorization", authData.token);
      formData.append("name", form.name);
      formData.append("price", String(form.price));
      formData.append("type", form.type);
      formData.append("material", form.material);
      formData.append("checkout_link", form.checkout_link);
      formData.append("stone", String(form.stone));
      formData.append("solitary", String(form.solitary));
formData.append("pear", String(form.pear));


      if (!images.image1) {
  alert("A Imagem 1 (Principal) é obrigatória");
  return;
}


      formData.append("image", images.image1.file);

if (images.image2)
  formData.append("image2", images.image2.file);

if (images.image3)
  formData.append("image3", images.image3.file);


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
        {errors.type && <p className="error-text">{errors.type}</p>}

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





{/* PEAR */}
<label className="label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <input
    type="checkbox"
    checked={form.pear === 1}
    onChange={(e) =>
      setForm({
        ...form,
        pear: e.target.checked ? 1 : 0,
      })
    }
    style={{ width: 'auto', margin: 0 }}
  />
  Produto é um par 
</label>

        
        {/* SOLITARY */}
<label className="label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <input
    type="checkbox"
    checked={form.solitary === 1}
    onChange={(e) =>
      setForm({
        ...form,
        solitary: e.target.checked ? 1 : 0,
      })
    }
    style={{ width: 'auto', margin: 0 }}
  />
  O par vem com uma sólitaria acompanhando 
</label>

        {/* PREVIEW */}
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
