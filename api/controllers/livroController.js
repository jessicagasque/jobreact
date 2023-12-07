import { Livro } from '../models/Livro.js'

export const livroIndex = async (req, res) => {
  try {
    const livros = await Livro.findAll()
    res.status(200).json(livros)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const livroDestaques = async (req, res) => {
  try {
    const livros = await Livro.findAll({ where: { destaque: true } })
    res.status(200).json(livros)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const livroDestaca = async (req, res) => {
  const { id } = req.params

  try {
    // posiciona no registro para obter o status atual do campo destaque
    const livro = await Livro.findByPk(id)
    // altera com o contrário do atual
    await Livro.update({ destaque: !livro.destaque }, { where: { id } })
    res.status(200).json(livro)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const livroCreate = async (req, res) => {
  const { titulo, genero, preco, duracao, data, classif, artista, capa, sinopse } = req.body

  // se não informou estes atributos
  if (!titulo || !genero || !preco || !duracao || !data || !classif || !artista || !capa || !sinopse) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const livro = await Livro.create({
      titulo, genero, preco, duracao, data, classif, artista, capa, sinopse
    });
    res.status(201).json(livro)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const livroDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await Livro.destroy({ where: { id } });
    res.status(200).json({ msg: "Ok! Removido com Sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const livroShow = async (req, res) => {
  const { id } = req.params

  try {
    const livro = await Livro.findByPk(id)
    res.status(200).json(livro)
  } catch (error) {
    res.status(400).send(error)
  }
}