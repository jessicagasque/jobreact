'use client'
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function Home() {
  const [livros, setLivros] = useState([])
  const [geral, setGeral] = useState({})

  const options = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
  };

  useEffect( () => {
    async function getDadosGrafico() {
      const response = await fetch("http://localhost:3004/avaliacoes/graph")
      const dados = await response.json()
      setLivros(dados)
    }
    getDadosGrafico()

    async function getDadosGerais() {
      const response = await fetch("http://localhost:3004/dados_gerais")
      const dados = await response.json()
      setGeral(dados)
    }
    getDadosGerais()
  }, [])

  const dados = [
    ["Estrelas", "Avaliação dos Clientes", "Meta de Vendas"],
    ["1", 0, 5],
    ["2", 0, 15],
    ["3", 0, 10],
    ["4", 0, 20],
    ["5", 0, 16],
  ];

  let somaAvaliacoes = 0
  livros.forEach(livro => {
    somaAvaliacoes += livro.num
  })

  livros.forEach(livro => {
    dados[livro.estrelas][1] = (livro.num / somaAvaliacoes) * 100
  })

  return (
    <div className="container">
      <h2 className="mt-3 mb-4">Dados Estatísticos</h2>

      <span className="btn btn-outline-secondary btn-lg">
        <p className="badge bg-success">{geral.clientes}</p>
        <p>Nº de Clientes Cadastrados</p>
      </span>
      <span className="btn btn-outline-secondary btn-lg mx-2">
        <p className="badge bg-success">{geral.livros}</p>
        <p>Nº de Livros Cadastrados</p>
      </span>
      <span className="btn btn-outline-secondary btn-lg me-2">
        <p className="badge bg-success">
          R$ {geral.media && Number(geral.media.preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}
        </p>
        <p>Preço Médio dos Livros</p>
      </span>
      <span className="btn btn-outline-secondary btn-lg">
        <p className="badge bg-success">{geral.avaliacoes}</p>
        <p>Nº Total de Avaliações</p>
      </span>
      <span className="btn btn-outline-secondary btn-lg ms-2">
        <p className="badge bg-success">{geral.avaliacoes_dia}</p>
        <p>Nº de Avaliações do Dia</p>
      </span>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={dados}
        options={options}
      />

    </div>
  )
}
