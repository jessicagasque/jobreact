import { Router } from "express"
import { clienteCreate, clienteIndex, clienteLogin } from "./controllers/clienteController.js"
import { livroCreate, livroDestaca, livroDestaques, livroIndex, livroShow } from "./controllers/livroController.js"
import { avaliacaoCreate, avaliacaoDestroy, avaliacaoLivro, avaliacaoGraphDias, avaliacaoGraphEstrelas, avaliacaoIndex, dadosGerais } from "./controllers/avaliacaoController.js"

const router = Router()

router.get('/clientes', clienteIndex)
      .post('/clientes', clienteCreate)
      .post('/login', clienteLogin)

router.get('/livros', livroIndex)
      .get('/livros/destaques', livroDestaques)
      .post('/livros', livroCreate)
      .get('/livros/:id', livroShow)
      .patch('/livros/destaca/:id', livroDestaca)

router.get('/avaliacoes', avaliacaoIndex)
      .post('/avaliacoes', avaliacaoCreate)
      .delete('/avaliacoes/:id', avaliacaoDestroy)
      .get('/avaliacoes/graph', avaliacaoGraphEstrelas)
      .get('/avaliacoes/graph_dias', avaliacaoGraphDias)
      .get('/avaliacoes/livro/:livro_id', avaliacaoLivro)

router.get('/dados_gerais', dadosGerais)

export default router