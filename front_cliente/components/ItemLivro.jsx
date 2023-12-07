import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"
import Estrelas from "./Estrelas"
import Link from "next/link"

export default function ItemLivro(props) {

  const { clienteId } = useContext(ClienteContext)

  return (
    <div className="col">
      <div className="card">
        <img src={props.livro.capa} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.livro.titulo}</h5>
          <p className="card-text">
            {props.livro.genero} - {props.livro.duracao}
          </p>
          <p className="small">
            {props.livro.sinopse}
          </p>
        </div>
        {clienteId &&
          <div>
            <Estrelas soma={props.livro.soma} num={props.livro.num} />
            <div className="float-end">
              <Link href={"/avaliacoes/" + props.livro.id}>
                <i className="bi bi-chat-dots text-primary fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              </Link>
              <Link href={"/avaliar/" + props.livro.id}>
                <i className="bi bi-patch-plus text-danger fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              </Link>
            </div>
          </div>
        }
      </div>
    </div >
  )
}