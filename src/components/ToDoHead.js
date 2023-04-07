import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiMoon, FiSun } from "react-icons/fi";

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: ${({ theme }) => theme.textColor};
  }
  .day {
    margin-top: 4px;
    color: ${({ theme }) => theme.textColor};
    font-size: 21px;
  }
  .tasks-left {
    color: #f999b7;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

const DarkToggle = styled.div`
  color: ${({ theme }) => theme.textColor};
  position: absolute;
  right: 20px;
  height: 30px;
  width: 30px;
  font-size: 30px;
  cursor: pointer;
`;

function TodoHead({ isDarkMode, toggleDarkMode }) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/todos/`)
      .then((res) => res)
      .then((data) => setTodos(data.data));
  }, []);
  const doneTasks = todos.filter((todo) => todo.done);

  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

  return (
    <TodoHeadBlock>
      <DarkToggle onClick={() => toggleDarkMode()}>
        {isDarkMode ? <FiSun /> : <FiMoon />}
      </DarkToggle>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">
        {todos && todos.length && doneTasks.length === todos.length
          ? " 완료"
          : `${doneTasks.length} / ${todos.length}`}
      </div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
