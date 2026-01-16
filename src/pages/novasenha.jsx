import React, { useState } from "react";
import { getAuthData } from "../utils/dadosuser";
import "../assets/Css/novasenha.css"
const NovaSenha = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
   const url = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const authData = getAuthData();

    if (!authData?.token) {
      setMessage("Usuário não autenticado.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${url}/users/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authorization: authData.token,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar a senha");
      }

      setMessage("Senha atualizada com sucesso!");
      setNewPassword("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nova-senha-container">
  <div className="nova-senha-card">
    <h2>Nova Senha</h2>

    <form className="nova-senha-form" onSubmit={handleSubmit}>
      <div>
        <label>Nova Senha</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar Nova Senha"}
      </button>
    </form>

    {message && (
      <p
        className={`nova-senha-message ${
          message.includes("sucesso") ? "success" : "error"
        }`}
      >
        {message}
      </p>
    )}
  </div>
</div>
  );
};

export default NovaSenha;
