import { ReducerAction } from "./types";
import { Dispatch, createContext } from "react";
import { TodoItem } from "utils/types";

interface TodoContextShape {
  todoItems: TodoItem[];
  dispatch: Dispatch<ReducerAction>;
}

const TodoContext = createContext<TodoContextShape>({
  todoItems: [],
  dispatch: () => {},
});

export default TodoContext;
