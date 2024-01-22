import React from 'react'

function Alert(props) {
  return (<div style={{ height: '50px' }}>
    {props.Alert && <div className={`alert alert-${props.alert.type} alert-dismissible fadeshow`} role="alert">
      <strong>{props.alert.type}</strong>  :{props.alert.msg}
    </div>}</div>


  )
}

export default Alert

