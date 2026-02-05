import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthData } from "../utils/dadosuser";
export default function Fretes() {
    const [fretes, setfretes] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
    const [filtroCidade, setFiltroCidade] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");

    const url = import.meta.env.VITE_API_URL;
    const authData = getAuthData();

    useEffect(() => {
        const media = window.matchMedia("(max-width: 767px)");
        const handler = () => setIsMobile(media.matches);
        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        async function carregarfretes() {
            try {
                const resposta = await fetch(`${url}/freight/`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": authData.token
                    }
                });
                const data = await resposta.json();
                console.log("Dados recebidos:", data);
                setfretes(Array.isArray(data) ? data : []);
            } catch (erro) {
                console.log("Erro ao carregar fretes:", erro);
                setfretes([]);
            }
        }
        carregarfretes();
    }, []);

    async function handleDelete(freteId) {
        const confirmar = window.confirm("Tem certeza que deseja excluir este frete?");
        if (!confirmar) return;

        try {
            await fetch(`${url}/freight/${freteId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json",
                    "Authorization": authData.token
                },
                body: JSON.stringify({
                }),
            });
            setfretes(prev => prev.filter(f => f.id !== freteId));
        } catch {
            alert("Erro ao excluir frete");
        }
    }

    const removerAcentos = (str) =>
        str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
    const fretesFiltrados = fretes.filter(f => {
        const cidadeMatch = removerAcentos(f.city).includes(removerAcentos(filtroCidade));
        const estadoMatch = removerAcentos(f.state).includes(removerAcentos(filtroEstado));

        return cidadeMatch && estadoMatch;
    });
    return (
        <div style={{ padding: isMobile ? "10px" : "20px" }}>

            {/* HEADER */}
            <div style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "12px",
                justifyContent: "space-between",
                marginBottom: "25px"
            }}>
                <h2 style={{ fontSize: isMobile ? "20px" : "26px", color: "#C9A86A" }}>
                    Gerenciar fretes
                </h2>

                <Link to="/admin/fretesforms">
                    <button style={{
                        background: "#C9A86A",
                        color: "#fff",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "none",
                        fontWeight: "600",
                        width: isMobile ? "100%" : "auto"
                    }}>
                        + Adicionar Frete
                    </button>
                </Link>
            </div>

            {/* FILTROS */}
            <div style={{
                background: "#fff",
                padding: isMobile ? "15px" : "20px",
                borderRadius: "12px",
                marginBottom: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(5, 1fr)",
                gap: "15px"
            }}>
                <div>
                    <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#666" }}>
                        Cidade
                    </label>
                    <input
                        type="text"
                        placeholder="Buscar por cidade..."
                        value={filtroCidade}
                        onChange={(e) => setFiltroCidade(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#666" }}>
                        Estado
                    </label>
                    <input
                        type="text"
                        placeholder="Buscar por cidade..."
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                        style={inputStyle}
                    />
                </div>


                {(filtroCidade || filtroEstado) && (
                    <button
                        onClick={() => {
                            setFiltroCidade("");
                            setFiltroEstado("");
                        }}
                        style={{
                            background: "#FF0000",
                            color: "#fff",
                            border: "none",
                            padding: "10px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            marginTop: isMobile ? "0" : "25px",
                            fontWeight: "600"
                        }}
                    >
                        Limpar Filtros
                    </button>
                )}
            </div>

            {/* LISTAGEM */}
            {!isMobile ? (
                /* ===== DESKTOP: TABELA ===== */
                <div style={box}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "#F9F5EE" }}>
                                <th style={th}>Cidade</th>
                                <th style={th}>Estado</th>
                                <th style={th}>Preço</th>
                                <th style={th}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fretesFiltrados.map(p => (
                                <tr key={p.id}>
                                    <td style={td}>{p.city || 'N/A'}</td>
                                    <td style={td}>{p.state || 'N/A'}</td>
                                    <td style={td}>
                                        {(p.value || 0).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL"
                                        })}
                                    </td>
                                    <td style={td}>
                                        <Link to={`/admin/fretesforms/${p.id}`}>
                                            <button style={btnEdit}>Editar</button>
                                        </Link>
                                        <button style={btnDel} onClick={() => handleDelete(p.id)}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* ===== MOBILE: CARDS ===== */
                fretesFiltrados.map(f => (
                    <div key={f.id} style={card}>
                        <strong>{f.city || 'Sem cidade'}</strong>
                        <span>Estado: {f.state || 'N/A'}</span>
                        <span>
                            {(f.value || 0).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}
                        </span>

                        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <Link to={`/admin/fretesforms/${f.id}`}>
                                <button style={btnEdit}>Editar</button>
                            </Link>
                            <button style={btnDel} onClick={() => handleDelete(f.id)}>
                                Excluir
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}




const box = {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const th = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #eee",
};

const td = {
    padding: "12px",
    borderBottom: "1px solid #eee",
};

const card = {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
};

const btnEdit = {
    background: "#C9A86A",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
};

const btnDel = {
    background: "#d9534f",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
};

