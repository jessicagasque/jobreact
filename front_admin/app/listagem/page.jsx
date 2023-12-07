'use client'
import { useEffect, useState } from "react"
import ItemLista from "@/components/ItemLista"
import { useRouter } from "next/navigation"
import Pesquisa from "@/components/Pesquisa"
import Swal from 'sweetalert2'

export default function Listagem() {
  const [livros, setLivros] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    async function getLivros() {
      const response = await fetch("http://localhost:3004/livros")
      const dados = await response.json()
      setLivros(dados)
      setIsLoading(false)
    }
    getLivros()
  }, [])

  async function excluiLivro(id) {
    const response = await fetch("http://localhost:3004/livros/" + id, {
      method: "DELETE"
    })
    const novosDados = livros.filter(livro => livro.id != id)
    setLivros(novosDados)
  }

  async function destacaLivro(id, status_atual) {
    await fetch("http://localhost:3004/livros/destaca/" + id, { method: "PATCH" })
    const indiceAlterado = livros.findIndex(livro => livro.id == id)
    const novosDados = [...livros]
    novosDados[indiceAlterado].destaque = !status_atual
    setLivros(novosDados)
  }

  const listaLivros = livros.map(livro => (
    <ItemLista key={livro.id}
      livro={livro}
      exclui={() => excluiLivro(livro.id)}
      altera={() => router.push('altera/' + livro.id)}
      consulta={() => router.push('consulta/' + livro.id)}
      destaca={() => destacaLivro(livro.id, livro.destaque)}
    />
  ))

  async function filtraDados(data) {
    if (data.pesq.length < 2) {
      Swal.fire("Digite, no mínimo, 2 caracteres")
      return
    }

    // busca todos os dados e aplica o filtro no vetor
    // -----------------------------------------------
    const pesquisa = data.pesq.toUpperCase()

    const response = await fetch("http://localhost:3004/livros")
    const dados = await response.json()

    const novosDados = dados.filter(livro =>
      livro.titulo.toUpperCase().includes(pesquisa) || livro.genero.toUpperCase().includes(pesquisa)
    )

    if (novosDados.length == 0) {
      Swal.fire("Não há livros com a palavra chave informada...")
      return
    }

    setLivros(novosDados)

  }

  async function mostraTodos() {
    const response = await fetch("http://localhost:3004/livros")
    const dados = await response.json()
    setLivros(dados)
  }

  if (isLoading) {
    return (
      <div className="container">
        <h2>Listagem de Livros</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-sm-7">
          <h2 className="mt-2 text-info">Listagem de Livros</h2>
        </div>
        <div className="col-sm-5 d-flex">
          <Pesquisa filtra={filtraDados} mostra={mostraTodos} />
          <button className="btn btn-danger ms-3 my-2" 
            onClick={() => router.push("/cadastro")}>
              Novo
          </button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Capa</th>
            <th>Título do Livro</th>
            <th>Gênero</th>
            <th>Autor</th>
            <th>Nº de Páginas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaLivros}
        </tbody>
      </table>
    </div>
  )
}