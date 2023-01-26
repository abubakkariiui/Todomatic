import {
  TodoItem,
  TodoId,
  ReducerAction,
  BaseTodoItem,
  AddAction,
  RemoveAction,
} from "./types";

function addTodoItem(state: TodoItem[], partialTodoItem: AddAction["payload"]) {
  const id = Date.now().toString();
  const todoItem = { ...partialTodoItem, id };

  const updatedTodoItemsList = [todoItem, ...state];
  return updatedTodoItemsList;
}

function removeTodoItem(state: TodoItem[], id: RemoveAction["payload"]) {
  // Filter out the todo item to remove
  return state.filter((todoItem) => todoItem.id !== id);
}

function editTodoItem(
  state: TodoItem[],
  id: TodoId,
  editedTodoItemCallback: (targetTodoItem: TodoItem) => Partial<BaseTodoItem>
) {
  return state.map((todoItem) => {
    // If current todoItem is the target, merge the updated
    // partial todo item with current todo item
    if (todoItem.id === id) {
      // Retrive computed todo item
      const partialTodoItem = editedTodoItemCallback(todoItem);

      // Merge the old todo item with edited one
      const updatedTodoItem = {
        ...todoItem,
        ...partialTodoItem,
      };

      return updatedTodoItem;
    }

    return todoItem;
  });
}

export default function reducer(state: TodoItem[], action: ReducerAction) {
  switch (action.type) {
    case "add":
      const todoItem = action.payload;
      return addTodoItem(state, todoItem);

    case "remove":
      const removeId = action.payload;
      return removeTodoItem(state, removeId);

    case "edit":
      const editPayload = action.payload;
      const editId = editPayload.id;

      return editTodoItem(state, editId, () => ({
        todo: editPayload.todo,
      }));

    case "toggleCompletion":
      const toggleId = action.payload;

      return editTodoItem(state, toggleId, (todoItem) => ({
        complete: !todoItem.complete,
      }));

    default:
      return state;
  }
}
