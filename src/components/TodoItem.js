import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import axios from "axios";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckBox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 3px;
  border: 1px solid #fee3ec;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    border: 1px solid #f2789f;
  }
  ${(props) =>
    props.done &&
    css`
      color: #f2789f;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: ${({ theme }) => theme.textColor};
  ${(props) =>
    props.done &&
    css`
      text-decoration: line-through;
      color: #ced4da;
    `}
`;

function TodoItem({ id, done, text }) {
  const onToggle = () => {
    let patchData = { done: !done };
    axios
      .patch(`http://localhost:3001/todos/${id}`, patchData)
      .then((res) => res)
      .then((data) => window.location.reload());
  };
  const onRemove = () => {
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then((res) => res)
      .then((data) => window.location.reload());
  };
  return (
    <TodoItemBlock>
      <CheckBox done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckBox>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
