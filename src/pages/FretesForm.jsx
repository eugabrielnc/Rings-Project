import React, { useState, useRef } from "react";
import "../assets/Css/formsproduto.css";
import { getAuthData } from "../utils/dadosuser";
import { FILTER_CONFIG } from "../utils/filters";


export default function FretesForm() {
  const authData = getAuthData();
  const url = import.meta.env.VITE_API_URL;
  const inputFileRef = useRef(null);

  const [form, setForm] = useState({
    state: "",
    city: "",
    value: 0,

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

    

    setSubmitting(true);

    try {
      


      const res = await fetch(`${url}/freight/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify({
            ...form,
            authorization: authData.token,
        }),
      });

      const data = await res.text();
      console.log(data);
      console.log(res.ok);
      if (!res.ok) {
        console.error(data);
        alert("Erro ao adicionar o frete");
        return;
      }

      setSuccessMessage(data); // ex: "concluido"

      setSuccessMessage("Frete adicionado com sucesso!");
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
        Adicionar Frete
      </h1>

      <form onSubmit={handleSubmit} className="card">
        {/* NOME */}
        <label className="label">Estado</label>
        <input
          name="state"
          className="input"
          value={form.state}
          onChange={handleChange}
        />
        {errors.state && <p className="error-text">{errors.state}</p>}

        {/* CIDADE */}
        <label className="label">Cidade</label>
        <input
          name="city"
          className="input"
          value={form.city}
          onChange={handleChange}
        />
        {errors.city && <p className="error-text">{errors.city}</p>}

        {/* VALOR */}
        <label className="label">Valor</label>
        <input
          name="value"
          type="number"
          className="input"
          value={form.value}
          onChange={handleChange}
        />
        {errors.value && <p className="error-text">{errors.value}</p>}

        


        <br />
        {/* SUBMIT */}
        <button className="button-primary" disabled={submitting}>
          {submitting ? "Salvando..." : "Salvar Frete"}
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
