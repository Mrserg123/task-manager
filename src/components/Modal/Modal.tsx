import React from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { addTask } from "../../redux/slices/taskSlice";
import "../Modal/styles.scss";

export interface Props {
  close?: (item: boolean) => void;
  date: string;
}
const Modal: React.FC<Props> = ({ close, date }: Props) => {
  const [description, setDescription] = React.useState("");
  const login = localStorage.login;
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="blackout" onClick={() => close(false)}></div>
      <div className="modal">
        <h2 className="title_text">Add new task</h2>
        <hr />
        <textarea
          className="textarea_modal"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        ></textarea>
        <div style={{ display: "flex" }}>
          <button onClick={() => close(false)} className="button_modal">
            Close
          </button>
          {description && (
            <button
              onClick={() => {
                dispatch(addTask({ date, login, description }));
                close(false);
              }}
              style={{ background: "#77b077" }}
              className="button_modal"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default Modal;
