import React from 'react';

function EventDetail(props) {
   
  return (
  
     <div className="card " key={props.events.id}>
                  <img src={props.events.logo ? props.events.logo.original.url : 'logo.svg'} className="card-img-top" alt={props.events.name.text} />
                  <div className="card-body">
                    <h5 className="card-title">{props.events.name.text}</h5>
                    <p className="card-text">{props.events.summary}</p>
                  </div>
                  <div className="p-3">
                  <button className="btn btn-block  btn-color-item " onClick={()=>props.handleOpenModal(props.events)}>Ver más</button>
                  </div>

                

                </div>
    
  )
}

export default EventDetail