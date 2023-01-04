import React, { useState, useEffect } from 'react'
import TodoItem from './TodoItem';
import uuid from 'react-uuid';


export default function Todolist() {

    const [todoData, setTodoData] = useState([]);
    const [todoItem, setTodoItem] = useState('');
    const [todoColor, setTodoColor] = useState('');


    const addTodoItem = async (event) => {
        event.preventDefault();
        if (todoItem !== "" && todoColor !== "") {
            let newTodoItem = todoData.concat([{ id: uuid(), todoItem: todoItem, color: todoColor }]);
            setTodoData(newTodoItem);
            setTodoItem("");
            setTodoColor("");
        }
    }

    const handleTodoItem = (event) => {
        setTodoItem(event.target.value);
    }

    const handleSelect = (event) => {
        setTodoColor(event.target.value)
    }

    useEffect(() => {
        if (todoData.length > 0) {
            localStorage.setItem('todo', JSON.stringify(todoData));
        }
    }, [todoData]);

    useEffect(() => {
        setTodoData(JSON.parse(localStorage.getItem('todo')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteTodoItem = (id)=>{
        let afterRemoveTodo = todoData.filter((element)=>{
            return element.id !== id;
        })
        setTodoData(afterRemoveTodo);
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 my-3">
                    <h2 className='text-center'>Schedule your work for today</h2>
                    <form onSubmit={addTodoItem}>
                        <div className="mb-3">
                            <label htmlFor="todoItem" className="form-label">Todo Item</label>
                            <input type="text" value={todoItem} className="form-control" onChange={handleTodoItem} id="todoItem" />
                        </div>
                        <div className="mb-3">
                            <select className="form-select" value={todoColor} onChange={handleSelect} id='selecteColor'>
                                <option value="" disabled>Select Color</option>
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="success">Success</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={!todoItem || !todoColor}>Add Item</button>
                    </form>
                </div>


                <div className="col-lg-4">
                    <div className="list-group my-3">
                        {todoData.filter(element => element.color === "primary")
                            .map((element) => <TodoItem key={element.id} id={element.id} deleteTodo={deleteTodoItem} description={element.todoItem} color={element.color} />)}
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="list-group my-3">
                        {todoData.filter(element => element.color === "success")
                            .map((element) => <TodoItem key={element.id} id={element.id} deleteTodo={deleteTodoItem} description={element.todoItem} color={element.color} />)}
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="list-group my-3">
                        {todoData.filter(element => element.color === "secondary")
                            .map((element) => <TodoItem key={element.id} id={element.id} deleteTodo={deleteTodoItem} description={element.todoItem} color={element.color} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
