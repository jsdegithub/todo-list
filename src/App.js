import React, { useState } from "react";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([
        { text: "8:00 吃饭", isCompleted: true },
        { text: "9:00-12:00 工作", isCompleted: false },
        { text: "13:00 午休", isCompleted: false },
    ]);

    function Todo({ todo, index }) {
        return (
            <div class="todo-item">
                <span>
                    <input
                        type="checkbox"
                        checked={todo.isCompleted ? "checked" : ""}
                        onClick={() => {
                            completeTodo(index);
                        }}
                    ></input>
                    <span style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
                        {todo.text}
                    </span>
                </span>
                <span>
                    <button
                        onClick={() => {
                            updateTodo(index);
                        }}
                    >
                        修改
                    </button>
                    <button
                        onClick={() => {
                            removeTodo(index);
                        }}
                    >
                        删除
                    </button>
                </span>
            </div>
        );
    }

    function TodoForm({ addTodo }) {
        const [value, setValue] = useState("");
        const handleSubmit = (e) => {
            e.preventDefault();
            if (!value) return;
            addTodo(value);
            setValue("");
        };
        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="添加待办项，以回车结束"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>
        );
    }

    function UpdateModal({ updateTodo }) {
        const [value, setValue] = useState("");
        const handleSubmit = (e) => {
            e.preventDefault();
            if (!value) return;
            updateTodo(value);
            setValue("");
            // 关闭 modal
            document.getElementsByTagName("form")[1].style.top = `-100%`;
        };
        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="在这里修改待办事项"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>
        );
    }

    const addTodo = (text) => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };
    const completeTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    };
    const removeTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };
    const updateTodo = (index) => {
        // 控制 modal 显示出来
        document.getElementsByTagName("form")[1].style.top = `200px`;
        // 把 index记录下来
        window.index = index;
        /* return function anonymous() {
            updateModalCopeFn(text, index);
        }; */
    };
    const updateModalCopeFn = (text) => {
        const newTodos = [...todos];
        newTodos[window.index].text = text;
        setTodos(newTodos);
    };
    return (
        <div className="App">
            <h1 class="title">To Do List</h1>
            <div className="todo-list">
                {todos.map((todo, index) => {
                    return (
                        <Todo
                            key={index}
                            todo={todo}
                            index={index}
                            completeTodo={completeTodo}
                            removeTodo={removeTodo}
                        ></Todo>
                    );
                })}
                <TodoForm addTodo={addTodo}></TodoForm>
                {/* 这里如果把 UpdateModal 放在 todo-list 外面则样式不会生效 */}
                <UpdateModal
                    class="updateModal"
                    id="updateModal"
                    updateTodo={updateModalCopeFn}
                ></UpdateModal>
            </div>
        </div>
    );
}

export default App;
