import { useState, useRef, useEffect } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from '../components/Todoitems';

const Todo = () => {
    const [todoList, setTodoList] = useState([]);
    const inputRef = useRef();

    // Load todos from localStorage when the component mounts
    useEffect(() => {
        const storedTodos = localStorage.getItem("todo");
        if (storedTodos) {
            setTodoList(JSON.parse(storedTodos));
        }
    }, []); // This effect runs only once on component mount

    // Save todos to localStorage whenever todoList changes
    useEffect(() => {
        if (todoList.length > 0) {
            localStorage.setItem("todo", JSON.stringify(todoList));
        }
    }, [todoList]); // This effect runs every time todoList changes

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === "") return;

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };

        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    };

    const toggleComplete = (id) => {
        setTodoList((prev) =>
            prev.map(todo =>
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        );
    };

    // Function to delete a todo item
    const deleteTodo = (id) => {
        setTodoList((prev) => prev.filter(todo => todo.id !== id));
    };

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[500px] rounded-xl'>
            {/* Title */}
            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="Todo Icon" />
                <h1 className='text-3xl font-semibold'>To-Do-List</h1>
            </div>

            {/* Input Box */}
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input
                    ref={inputRef}
                    className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
                    type="text"
                    placeholder="Add your task"
                />
                <button
                    onClick={add}
                    className='border-none rounded-full bg-blue-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'
                >
                    ADD +
                </button>
            </div>

            {/* Todo List */}
            <div>
                {todoList.map((item) => (
                    <TodoItems
                        key={item.id}
                        text={item.text}
                        isComplete={item.isComplete}
                        toggleComplete={() => toggleComplete(item.id)}
                        deleteTodo={() => deleteTodo(item.id)} // Pass deleteTodo to TodoItems
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;
