'use client'
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default function Alteracao() {
  const params = useParams()
  //  console.log(params)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    async function getLivro() {
      const response = await fetch("http://localhost:3004/livros/"+params.id)
      const dado = await response.json()
      reset({
        titulo: dado.titulo,
        genero: dado.genero,
        preco: dado.preco,
        paginas: dado.paginas,
        data: dado.data,
        autor: dado.autor,
        // artista: dado.artista,
        capa: dado.capa,
        sinopse: dado.sinopse,
        destaque: dado.destaque        
      })
    }
    getLivro()
  }, [])

  async function alteraDados(data) {    
    const livro = await fetch("http://localhost:3004/livros/"+params.id,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      },
    )
    if (livro.status == 200) {
      // alert("Ok! Livro cadastrado com sucesso")
      toast.success("Ok! Livro alterado com sucesso")
    } else {
      // alert("Erro...")
      toast.error("Erro... Não foi possível concluir a alteração")
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Alteração de Livros</h2>
      <form onSubmit={handleSubmit(alteraDados)}>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="titulo" className="form-label">Título do Livro</label>
            <input type="text" className="form-control" id="titulo" {...register("titulo")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="genero" className="form-label">Gênero</label>
            <input type="text" className="form-control" id="genero" {...register("genero")} required />
          </div>
          <div className="col-sm-2">
            <label htmlFor="preco" className="form-label">Preço R$</label>
            <input type="number" step="0.10" className="form-control" id="preco" {...register("preco")} required />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-3">
            <label htmlFor="paginas" className="form-label">Nº de páginas</label>
            <input type="text" className="form-control" id="paginas" {...register("paginas")} required />
          </div>
          <div className="col-sm-3">
            <label htmlFor="data" className="form-label">Data de Lançamento:</label>
            <input type="date" className="form-control" id="data" {...register("data")} required />
          </div>
          {/* <div className="col-sm-4">
            <label htmlFor="classif" className="form-label">Classif. Indicativa</label>
            <select id="classif" className="form-select" {...register("classif")} required>
              <option value="livre">Livre</option>
              <option value="10">10 anos</option>
              <option value="12">12 anos</option>
              <option value="14">14 anos</option>
              <option value="16">16 anos</option>
            </select>
          </div> */}
          <div className="col-sm-2">
            <p>Status do Livro:</p>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" 
                id="destaque" 
                {...register("destaque")} />
              <label className="form-check-label" htmlFor="destaque">Destaque</label>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          {/* <div className="col-sm-6">
            <label htmlFor="artista" className="form-label">Ator/Atriz Principal</label>
            <input type="text" className="form-control" id="artista" {...register("artista")} required />
          </div> */}
          <div className="col-sm-6">
            <label htmlFor="capa" className="form-label">Capa do Livro</label>
            <input type="url" className="form-control" id="capa" {...register("capa")} required />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="sinopse" className="form-label">Sinopse</label>
          <textarea className="form-control" id="sinopse" rows="3" {...register("sinopse")} required></textarea>
        </div>

        <input type="submit" value="Alterar" className="btn btn-success me-3" />
        <input type="button" value="Limpar" className="btn btn-danger"
          onClick={() => reset()} />

      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}