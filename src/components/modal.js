import React from 'react';

function Modal(props) {

  const showHideClassName = props.viewModal ? "display-block" : "display-none";
  
  return (
    
    <div className={`modal ${showHideClassName}`} >
  
    <div className="modal-dialog" >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{props.info.name.text}</h5>
          <button type="button" className="close" onClick={()=>props.handleCloseModal()} >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        <img className="card-img-top"  src={props.info.logo ? props.info.logo.original.url : '/logo.svg'}  alt={props.info.name.text} />
          <p>{props.info.description.text}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={()=>props.handleCloseModal()} >Close</button>
         
        </div>
      </div>
    </div>
  
  
  </div>
    
  )
}

export default Modal