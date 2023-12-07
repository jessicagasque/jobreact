import Link from "next/link"

async function getLivro(id) {
  const response = await fetch("http://localhost:3004/livros/"+id)
  const dado = await response.json()
  // console.log("=".repeat(40))
  // console.log(dado)
  // console.log("=".repeat(40))
  return dado
}

export default async function Consulta({params}) {

  const livro = await getLivro(params.id)
  
  return (
    <div className="container">
      <h2 className="mt-2">Consulta de Livros</h2>
      <form>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="titulo" className="form-label">Título do Livro</label>
            <input type="text" className="form-control" id="titulo" value={livro.titulo} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="genero" className="form-label">Gênero</label>
            <input type="text" className="form-control" id="genero" value={livro.genero} readOnly />
          </div>
          <div className="col-sm-2">
            <label htmlFor="preco" className="form-label">Preço R$</label>
            <input type="number" step="0.10" className="form-control" id="preco" value={livro.preco} readOnly />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-3">
            <label htmlFor="pagina" className="form-label">Nº de páginas</label>
            <input type="text" className="form-control" id="pagina" value={livro.paginas} readOnly />
          </div>
          <div className="col-sm-3">
            <label htmlFor="data" className="form-label">Data Estreia:</label>
            <input type="date" className="form-control" id="data" value={livro.data} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="autor" className="form-label">Autor</label>
            <input id="autor" className="form-select" value={livro.autor} readOnly />
          </div>
          <div className="col-sm-2">
            <p>Status do Livro:</p>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" 
                id="destaque" 
                checked={livro.destaque}
                readOnly
                />
              <label className="form-check-label" htmlFor="destaque">Destaque</label>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          {/* <div className="col-sm-6">
            <label htmlFor="artista" className="form-label">Ator/Atriz Principa</label>
            <input type="text" className="form-control" id="artista" value={livro.artista} readOnly />
          </div> */}
          <div className="col-sm-6">
            <p className="form-label">Capa do Livro</p>
            <img src={livro.capa} alt={`Capa do livro ${livro.capa}`} width={150} height={210} className="mx-auto d-block"/>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="sinopse" className="form-label">Sinopse</label>
          <textarea className="form-control" id="sinopse" rows="3" value={livro.sinopse} readOnly></textarea>
        </div>

        <Link className="btn btn-success float-end" href="/listagem">Voltar</Link>

      </form>
    </div>
  )
}