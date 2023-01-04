import React from 'react'

export default function TodoItem(props) {
    return (
        <div className={`alert alert-${props.color} d-flex justify-content-between`} role="alert">
            <div> {props.description} </div>
            <button type="button" className="btn-close" onClick={()=>props.deleteTodo(props.id)}></button>
        </div>
    )
}

TodoItem.defaultProps = {
    color: "success",
    description: "Testing",
}