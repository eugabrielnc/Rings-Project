import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/Css/formsproduto.css";
import { getAuthData } from "../utils/dadosuser";

export default function EditUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const authData = getAuthData();
    const url = import.meta.env.VITE_API_URL;
    const inputFileRef = useRef(null);

    const [form, setForm] = useState({
        user_name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // 🔹 BUSCAR USUÁRIO
    useEffect(() => {
        async function carregarUsuario() {
            if (!authData?.token || !id) return;

            try {
                const res = await fetch(`${url}/users/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "application/json",
                    },
                    body: JSON.stringify({
                        authorization: authData.token,
                    }),
                });

                const data = await res.json();

                console.log("LISTA DE USUÁRIOS:", data);

                // 🔹 encontra o usuário pelo ID da rota
                const user = data.find((u) => String(u.id) === String(id));

                if (!user) {
                    alert("Usuário não encontrado");
                    navigate("/admin/usuarios");
                    return;
                }

                setForm({
                    user_name: user.name ?? "",
                    email: user.email ?? "",
                    phone: user.phone ?? "",
                    password: "",
                });

                if (user.image) {
                    setImage({ file: null, url: user.image });
                }
            } catch (err) {
                console.error("Erro ao carregar usuário:", err);
                alert("Erro ao carregar usuário");
            } finally {
                setLoading(false);
            }
        }

        carregarUsuario();
    }, [id]);


    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleFile(file) {
        if (file) {
            setImage({
                file,
                url: URL.createObjectURL(file),
            });
        }
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
    const payload = {
      user_id: id,
      authorization: authData.token,
      user_name: form.user_name,
      email: form.email,
      phone: form.phone,
    };

    // só envia senha se o usuário digitou
    if (form.password) {
      payload.password = form.password;
    }

    const res = await fetch(`${url}/users/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Erro da API:", error);
      alert("Erro ao atualizar usuário");
      return;
    }

    setSuccessMessage("Usuário atualizado com sucesso!");

    setTimeout(() => {
      navigate("/admin/usuarios");
    }, 1200);
  } catch (err) {
    console.error(err);
    alert("Erro inesperado");
  } finally {
    setSubmitting(false);
  }
}


    if (loading) return <p>Carregando usuário...</p>;

    return (
        <div className="container">
            <h1 style={{ color: "var(--gold)", fontWeight: "700", marginBottom: "20px" }}>
                Editar Usuário
            </h1>

            <form onSubmit={handleSubmit} className="card">
                {/* NOME */}
                <label className="label">Nome</label>
                <input
                    name="user_name"
                    className="input"
                    value={form.user_name}
                    onChange={handleChange}
                />

                {/* EMAIL */}
                <label className="label">Email</label>
                <input
                    name="email"
                    type="email"
                    className="input"
                    value={form.email}
                    onChange={handleChange}
                />

                <label className="label">Telefone</label>
                <input
                    name="phone"
                    className="input"
                    value={form.phone}
                    onChange={handleChange}
                />



                <label className="label">Senha (deixe vazio para não alterar)</label>
                <input
                    name="password"
                    type="password"
                    className="input"
                    value={form.password}
                    onChange={handleChange}
                />



                {/* PREVIEW */}
                {image && (
                    <div className="image-grid">
                        <div className="image-preview">
                            <img src={image.url} alt="preview" />
                            <button
                                type="button"
                                className="image-remove"
                                onClick={() => setImage(null)}
                            >
                                ×
                            </button>
                        </div>
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
