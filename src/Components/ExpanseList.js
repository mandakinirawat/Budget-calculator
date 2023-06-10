import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const ExpanseList = ({ expanses,  handelEdit, handleDelete, clearAll }) => {
  return (
    <main>
      {expanses?.length ? (
        <ul className="list">
          {expanses?.map((expanse) => (
            <li className="item" key={expanse.id}>
              <div className="info">
                <span className="expanse">{expanse.charge}</span>
                <span className="amount"> $ {expanse.amount}</span>
              </div>
              <div>
                <button
                  name="edit"
                  className="edit-btn"
                  aria-label="edit button"
                >
                  <MdEdit onClick={()=>  handelEdit(expanse.id)}/>
                </button>
                <button className="clear-btn">
                  <MdDelete onClick={()=>handleDelete(expanse.id)} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>List is Empty</p>
      )}
      {expanses.length > 0 && (
        <button className="btn" onClick={clearAll}>
          Clear expanses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </main>
  );
};

export default ExpanseList;
