import React, { useState, useEffect } from 'react'
import TodoItem from './TodoItem';


export default function Todolist() {


    let todoListData = [
        {
            id: 1,
            todoItem: "First A simple primary alert—check it out!",
            color: "primary"
        },
        {
            id: 2,
            todoItem: "Second A simple primary alert—check it out!",
            color: "primary"
        },
        {
            id: 3,
            todoItem: "First A simple primary alert—check it out!",
            color: "success"
        },
        {
            id: 4,
            todoItem: "Second A simple primary alert—check it out!",
            color: "primary"
        },
        {
            id: 5,
            todoItem: "First A simple primary alert—check it out!",
            color: "success"
        },
    ];

    const [todoData, setTodoData] = useState([]);
    const [todoItem, setTodoItem] = useState('');
    const [todoColor, setTodoColor] = useState('');


    const addTodoItem = async (event) => {
        event.preventDefault();

        console.log(todoData.length + 1);
        console.log(todoItem);
        console.log(todoColor);
        if (todoItem !== "" && todoColor !== "") {
            let newTodoItem = todoData.concat([{ id: todoData.length + 1, todoItem: todoItem, color: todoColor }]);
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
            console.log("Set Localstorage")
            localStorage.setItem('todo', JSON.stringify(todoData));
        }
    }, [todoData]);

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('todo')));
        setTodoData(JSON.parse(localStorage.getItem('todo')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 my-3">
                    <form onSubmit={addTodoItem}>
                        <div className="mb-3">
                            <label htmlFor="todoItem" className="form-label">Todo Item</label>
                            <input type="text" value={todoItem} className="form-control" onChange={handleTodoItem} id="todoItem" />
                        </div>
                        <div className="mb-3">
                            <select className="form-select" value={todoColor} onChange={handleSelect} id='selecteColor'>
                                <option value="" selected>Select Color</option>
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="success">Success</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Item</button>
                    </form>
                </div>


                <div className="col-lg-4">
                    <div className="list-group my-3">
                        {todoData.filter(element => element.color === "primary")
                            .map((element) => <TodoItem key={element.id} description={element.todoItem} color={element.color} />)}
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="list-group my-3">
                        {todoData.filter(element => element.color === "success")
                            .map((element) => <TodoItem key={element.id} description={element.todoItem} color={element.color} />)}
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="list-group my-3">
                        {todoData.filter(element => element.color === "secondary")
                            .map((element) => <TodoItem key={element.id} description={element.todoItem} color={element.color} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
