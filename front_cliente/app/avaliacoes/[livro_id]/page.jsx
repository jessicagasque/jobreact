'use client'
import Estrelas from "@/components/Estrelas"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Avaliacoes() {
  const params = useParams()
  const [avaliacoes, setAvaliacoes] = useState([])
  const [livro, setLivro] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getAvalia() {
      const response = await fetch("http://localhost:3004/avaliacoes/livro/" + params.livro_id)
      const dados = await response.json()
      setAvaliacoes(dados)
    }
    getAvalia()

    async function getLivro() {
      const response = await fetch("http://localhost:3004/livros/" + params.livro_id)
      const dado = await response.json()
      setLivro(dado)
      setIsLoading(false)
    }
    getLivro()
  }, [])

  function AjustaData(data) {
    const anoMesDia = data.split("T")[0]
    const partes = anoMesDia.split("-")
    return partes[2] + "/" + partes[1] + "/" + partes[0]
  }

  const listaAvaliacoes = avaliacoes.map(avalia => (
    <tr key={avalia.id}>
      <td>{avalia.cliente.nome}</td>
      <td>{AjustaData(avalia.data)}</td>
      <td>{avalia.estrelas} estrelas</td>
      <td>{avalia.comentario}</td>
    </tr>
  ))

  if (isLoading) {
    return (
      <div className="container">
        <h2>Listagem das Avaliações do Livro</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 className="mt-2">
        <img src={livro.capa} alt="Capa" width={100} />
        <span className="ms-3">
          Avaliações dos Clientes do CineClube
        </span>
      </h2>
      <h3>
        <Estrelas soma={livro.soma} num={livro.num} />
        <span className="ms-3">
          Livro: {livro.titulo}
        </span>
      </h3>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Data</th>
            <th>Avaliação</th>
            <th>Comentário</th>
          </tr>
        </thead>
        <tbody>
          {listaAvaliacoes}
        </tbody>
      </table>
    </div>
  )
}