'use client'
// import { useEffect, useState } from "react"
// import ClienteLista from "@/components/ClienteLista.jsx"
// import { useRouter } from "next/navigation"
// // import Pesquisa from "@/components/Pesquisa"
// // import Swal from 'sweetalert2'

// export default function Listagem() {
//   const [clientes, setClientes] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   const router = useRouter()

//   useEffect(() => {
//     async function getClientes() {
//       const response = await fetch("http://localhost:3004/clientes")
//       const dados = await response.json()
//       setClientes(dados)
//       setIsLoading(false)
//     }
//     getClientes()
//   }, [])

//   async function excluiCliente(id) {
//     const response = await fetch("http://localhost:3004/clientes/" + id, {
//       method: "DELETE"
//     })
//     const novosDados = clientes.filter(cliente => cliente.id != id)
//     setClientes(novosDados)
//   }


//   const listaClientes = clientes.map(cliente => (
//     <ClienteLista key={cliente.id}
//       cliente={cliente}
//       exclui={() => excluiCliente(cliente.id)}
//       consulta={() => router.push('consulta/' + cliente.id)}
//     />
//   ))}


// Listagem.jsx
import React, { useEffect, useState } from "react";
import ClienteLista from "@/components/ClienteLista.jsx";
import { useRouter } from "next/navigation";

export default function Listagem() {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getClientes() {
      const response = await fetch("http://localhost:3004/clientes");
      const dados = await response.json();
      setClientes(dados);
      setIsLoading(false);
    }
    getClientes();
  }, []);

  async function excluiCliente(id) {
    const response = await fetch("http://localhost:3004/clientes/" + id, {
      method: "DELETE"
    });
    const novosDados = clientes.filter(cliente => cliente.id !== id);
    setClientes(novosDados);
  }

  const listaClientes = clientes.map(cliente => (
    <ClienteLista
      key={cliente.id}
      cliente={cliente}
      exclui={() => excluiCliente(cliente.id)}
      consulta={() => router.push('consulta/' + cliente.id)}
    />
  ));

  return <div>{listaClientes}</div>;
}
