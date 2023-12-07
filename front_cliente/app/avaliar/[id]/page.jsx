'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Estrelas from '@/components/Estrelas'
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"

export default function Avaliar() {
  const params = useParams()
  const [livro, setLivro] = useState({})
  const { clienteId } = useContext(ClienteContext)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { estrelas: 3 }
  })

  useEffect(() => {
    async function getLivro() {
      const response = await fetch("http://localhost:3004/livros/" + params.id)
      const dado = await response.json()
      //      console.log(dado)
      setLivro({
        id: dado.id,
        titulo: dado.titulo,
        genero: dado.genero,
        preco: dado.preco,
        pagina: dado.pagina,
        data: dado.data,
        autor: dado.autor,
        // artista: dado.artista,
        capa: dado.capa,
        sinopse: dado.sinopse,
        soma: dado.soma,
        num: dado.num
      })
    }
    getLivro()
    //    console.log(livro)
  }, [])

  async function enviaComentario(data) {
//    const avaliacao = {...data, cliente_id: clienteId, livro_id: livro.id, data: new Date()}
    const avaliacao = {...data, cliente_id: clienteId, livro_id: livro.id}

    const avalia = await fetch("http://localhost:3004/avaliacoes",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(avaliacao)
      },
    )

    // const altera = {soma: Number(livro.soma) + Number(data.estrelas), num: Number(livro.num) + 1}
    // const atualiza_estrelas = await fetch("http://localhost:3004/livros/"+livro.id,
    //   {
    //     method: "PATCH",
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify(altera)
    //   },
    // )

    // if (avalia.status == 201 && atualiza_estrelas.status == 200) {
    if (avalia.status == 201) {      
      alert("Ok! Avaliação cadastrada com sucesso")
      reset()
    } else {
      alert("Erro no cadastro da avaliação...")
    }
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <div className="card">
            <img src={livro.capa} alt="Livro" width={300} className="mx-auto d-block mt-1" />
            <div className="card-body">
              <h5 className="card-title">
                {livro.titulo}
              </h5>
              <p className="card-text">
                {livro.genero} - {livro.pagina}
              </p>
              <p className="card-text small">
                Autor: {livro.autor}
              </p>
              <p className="card-text small">
                {livro.sinopse}
              </p>
              <Estrelas soma={livro.soma} num={livro.num} />
              <span className="ms-2">{livro.num} avaliações</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <form className="card-body" onSubmit={handleSubmit(enviaComentario)}>
              <h3 className="card-title">Cadastre o seu comentário sobre este livro</h3>
              <hr />
              <div className="my-4">
                <label for="comentario" className="form-label fs-5">Seu Comentário:</label>
                <textarea className="form-control form-control-lg" id="comentario" rows="3"
                  {...register("comentario")}></textarea>
              </div>
              <div className="mb-3">
                <label for="estrelas" className="form-label fs-5">Sua Avaliação (Estrelas)</label>
                <select className="form-select form-select-lg mb-3" {...register("estrelas")}>
                  <option value="1">1 Estrela</option>
                  <option value="2">2 Estrelas</option>
                  <option value="3">3 Estrelas</option>
                  <option value="4">4 Estrelas</option>
                  <option value="5">5 Estrelas</option>
                </select>
              </div>
              <div className="d-grid gap-2 col-6 ms-auto">
                <input type="submit" className="btn btn-primary btn-lg mt-3" value="Enviar" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}