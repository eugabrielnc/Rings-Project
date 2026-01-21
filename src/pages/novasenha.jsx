import React, { useState, useEffect } from "react";
import { getAuthData } from "../utils/dadosuser";
import "../assets/Css/novasenha.css";

const AlterarDados = () => {


  const pageStyle = {
    minHeight: "100vh",
    backgroundImage: "url('/img/fundo2.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    position: "relative",
  };


  const overlayStyle = {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(255,255,255,0.25)",
    zIndex: 0,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 1,
  };


  const authData = getAuthData();
  const url = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    user_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 carregar dados do usuário logado
  useEffect(() => {
    if (!authData) return;

    setForm({
      user_name: authData.name || "",
      email: authData.email || "",
      phone: authData.phone || "",
      password: "",
    });
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!authData?.token || !authData?.id) {
      setMessage("Usuário não autenticado.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        user_id: authData.id, // 👈 AQUI ESTÁ A CORREÇÃO
        authorization: authData.token,
        user_name: form.user_name,
        email: form.email,
        phone: form.phone,
      };


      // senha é opcional
      if (form.password) {
        payload.password = form.password;
      }

      console.log("PAYLOAD ENVIADO:", payload);

      const response = await fetch(`${url}/users/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar dados");
      }

      setMessage("Dados atualizados com sucesso!");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={pageStyle}>
      {/* Overlay */}
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <div className="nova-senha-container">
          <div className="nova-senha-card">
            <h2>Alterar meus dados</h2>

            <form className="nova-senha-form" onSubmit={handleSubmit}>
              <div>
                <label>Nome</label>
                <input
                  name="user_name"
                  value={form.user_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Telefone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Nova senha (opcional)</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </form>

            {message && (
              <p
                className={`nova-senha-message ${message.includes("sucesso") ? "success" : "error"
                  }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlterarDados;
