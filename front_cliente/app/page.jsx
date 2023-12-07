'use client'

import ItemLivro from "@/components/ItemLivro"
import { useEffect, useState } from "react"

export default function Home() {
  const [livros, setLivros] = useState([])

  useEffect(() => {
    async function getLivros() {
//      const response = await fetch("http://localhost:3004/livros?destaque=true")
      const response = await fetch("http://localhost:3004/livros/destaques")
      const dados = await response.json()
      setLivros(dados)
    }
    getLivros()
  }, [])

  const listaLivros = livros.map(livro => (
    <ItemLivro key={livro.id}
      livro={livro}
    />
  ))

  return (
    <div className="container mt-3">
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4">
        {listaLivros}
      </div>
    </div>
  )
}
