import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { FiX } from "react-icons/fi";
import axios from "axios";

const CircleButton = styled.button`
  background: #f2789f;
  &:hover {
    background: #f999b7;
  }
  &:active {
    background: #f2789f;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 85%;
  bottom: 80px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      display: none;
    `}
`;

const InsertFormPositioner = styled.div`
  border-radius: 16px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InsertForm = styled.form`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.popupColor};
  padding-left: 32px;
  padding-top: 50px;
  padding-right: 32px;
  padding-bottom: 32px;
  border: 1px solid #e9ecef;
  border-radius: 20px;
`;

const Input = styled.input`
  padding: 12px;
  background-color: ${({ theme }) => theme.inputColor};
  color: ${({ theme }) => theme.textColor};
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 368px;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

const Submit = styled.button`
  margin-top: 30px;
  padding: 10px;
  background-color: #f999b7;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #fee3ec;
    color: white;
  }
`;

const Exit = styled.button`
  position: absolute;
  font-size: large;
  top: -10px;
  right: -10px;
  background-color: #fee3ec;
  padding: 5px;
  border-radius: 3px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: #f999b7;
  }
`;

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const onToggle = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    axios.post("http://localhost:3001/todos/", {
      text: value,
      done: false,
    });
    setValue("");
    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Exit type="button" onClick={onToggle}>
              <FiX />
            </Exit>
            <Input
              required
              autoFocus
              placeholder="오늘은 뭐할거야 ?"
              onChange={onChange}
              value={value}
            />
            <Submit type="button" onClick={onSubmit}>
              Submit
            </Submit>
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default TodoCreate;
