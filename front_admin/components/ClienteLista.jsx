import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2'

export default function ClienteLista(props) {

  function confirmaExclusao(id, nome,) {
    // if (confirm(`Confirma Exclusão do álbum "${titulo}"?`)) {
    //   props.exclui(id)
    // }
    Swal.fire({
      title: `Confirma Exclusão do cliente "${nome}"?`,
      text: "Esta operação não poderá ser desfeita",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
        props.exclui(id)
        Swal.fire(
          'Excluído!',
          'Cliente excluído com sucesso',
          'success'
        )
      }
    })
  }

  return (
    <tr>
      <td className={props.cliente.nome ? "fw-bold" : ""}>{props.cliente.nome}</td>
      <td className={props.cliente.nome ? "fw-bold" : ""}>{props.cliente.email}</td>
      <td>
        <i className="bi bi-x-circle text-danger" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={() => confirmaExclusao(props.cliente.id, props.cliente.email)}
           title="Excluir"
        ></i>
        {/* <i className="bi bi-pencil-square text-warning ms-2" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={props.altera}
           title="Alterar"
        ></i>
        <i className="bi bi-search text-success ms-2" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={props.consulta}
           title="Consultar"
        ></i> */}
        {/* <i className="bi bi-house-check text-primary ms-2" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={props.destaca}
           title="Destacar"
        ></i> */}
      </td>
    </tr>    
  )
}
