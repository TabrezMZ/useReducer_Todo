import "./styles.css";
import { useState, useReducer } from "react";

function todoReduceFn(state, action) {
  switch (action.type) {
    case "Add_Todo":
      if (action.payload === "") {
        return state;
      }
      return [
        ...state,
        {
          id: state.length === 0 ? 1 : state[state.length - 1].id + 1,
          title: action.payload,
          isDone: false
        }
      ];
    case "Mark_Todo":
      return state.map((tod) =>
        tod.id === +action.payload ? { ...tod, isDone: true } : tod
      );
    case "Remove_Todo":
      return state.filter((tod) => tod.id !== action.payload);
    case "Toggle_Todo":
      return state.map((tod) =>
        tod.id === +action.payload ? { ...tod, isDone: !tod.isDone } : tod
      );
    default:
      console.log("something went wrong");
  }
}

export default function App() {
  const [todo, dispach] = useReducer(todoReduceFn, [
    { id: 1, title: "Buy groceries", isDone: false },
    { id: 2, title: "Do laundry", isDone: true },
    { id: 3, title: "Finish project", isDone: false },
    { id: 4, title: "Go for a run", isDone: true },
    { id: 5, title: "Read book", isDone: false }
  ]);
  const [text, setText] = useState("");
  // console.log(todo);
  // console.log(text);
  // const [todo, setTodo] = useState([
  //   { id: 1, title: "Buy groceries", isDone: false },
  //   { id: 2, title: "Do laundry", isDone: true },
  //   { id: 3, title: "Finish project", isDone: false },
  //   { id: 4, title: "Go for a run", isDone: true },
  //   { id: 5, title: "Read book", isDone: false }
  // ]);

  // const addTodo = () => {
  //   setTodo([
  //     ...todo,
  //     {
  //       id: todo.length === 0 ? 1 : todo[todo.length - 1].id + 1,
  //       title: text,
  //       isDone: false
  //     }
  //   ]);
  // };

  // const markDone = (id) => {
  //   setTodo(
  //     todo.map((tod) => (tod.id === +id ? { ...tod, isDone: true } : tod))
  //   );
  // };
  // const Toogle = (id) => {
  //   setTodo(
  //     todo.map((tod) =>
  //       tod.id === +id ? { ...tod, isDone: !tod.isDone } : tod
  //     )
  //   );
  // };
  // const remove = (id) => {
  //   setTodo(todo.filter((tod) => tod.id !== id));
  // };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <hr />
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={() => {
          dispach({
            type: "Add_Todo",
            payload: text
          });
          setText("");
        }}
      >
        Add Todo
      </button>
      <ul>
        {todo.map((todo) => (
          <li style={{ color: todo.isDone ? "green" : "red" }} key={todo.id}>
            <p>{todo.title}</p>
            <button
              onClick={() => dispach({ type: "Mark_Todo", payload: todo.id })}
            >
              Mark as Done
            </button>
            <button
              onClick={() => dispach({ type: "Remove_Todo", payload: todo.id })}
            >
              remove
            </button>
            <button
              onClick={() => dispach({ type: "Toggle_Todo", payload: todo.id })}
            >
              Toogle Todo As Done
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
