import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import axios from "axios";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto; /* 사이즈 조정이 잘 되고 있는지 확인하기 위한 임시 스타일 */
`;

function TodoList() {
  const [todos, setTodos] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/todos/`)
      .then((res) => res)
      .then((data) => setTodos(data.data));
  }, []);
  console.log(todos);

  return (
    <TodoListBlock>
      {todos &&
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            done={todo.done}
          />
        ))}
    </TodoListBlock>
  );
}

export default TodoList;
