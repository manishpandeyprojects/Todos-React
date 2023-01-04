import React from 'react'

export default function TodoItem(props) {
    return (
        <div className={`alert alert-${props.color} d-flex justify-content-between`} role="alert">
            <div> {props.description} </div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

TodoItem.defaultProps = {
    color: "success",
    description: "Testing",
}