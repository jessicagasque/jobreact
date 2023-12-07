'use client'
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"

import Link from "next/link"

export default function Titulo() {
  const { clienteNome, mudaId, mudaNome } = useContext(ClienteContext)

  function logout() {
    if (confirm("Confirma a saída do sistema? ")) {
      mudaId(null)
      mudaNome("")
      localStorage.removeItem("cliente_logado")
    }
  }

  return (
    <nav className="navbar bg-warning">
      <div className="container-fluid">
        <div className="col">
          <Link className="navbar-brand text-white" href="/">
            <img src="./livrolivro.png" alt="Logo"
              width="40" height="48" className="float-start d-inline-block align-text-top" />
            <h3 className="float-start mt-2 ms-2">Livro Vivo</h3>
          </Link>
        </div>
        <div className="col input-group my-3">
          <input type="text" className="form-control" placeholder="Título ou gênero" />
          <button className="btn btn-warning text-white" type="button">Pesquisar</button>
        </div>
        <div className="col">
          <h5 className="text-white text-end">
          {clienteNome ? clienteNome : "Identifique-se"}
          {
            clienteNome ?
              <i className="ms-2 fs-4 bi bi-person-fill-down" style={{cursor: 'pointer'}} onClick={logout}></i> :
              <Link href="/login"><i className="ms-2 fs-4 bi bi-person-fill-up text-white"></i></Link>
          }
          </h5>
        </div>

      </div>
    </nav>
  )
}