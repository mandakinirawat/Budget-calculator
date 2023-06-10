import React from "react";
import { MdSend } from "react-icons/md";

const ExpanseForm = ({ newExpanse, setNewExpanse, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">Charge</label>
          <input
            className="form-control"
            id="charge"
            type="text"
            name="charge"
            autoComplete="off"
            placeholder="e.g. rent"
            value={newExpanse.charge}
            onChange={(e) =>
              setNewExpanse({ ...newExpanse, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input className="form-control"
            type="number"
            name="amount"
            autoComplete="off"
            placeholder="e.g.100"
            value={newExpanse.amount}
            onChange={(e) =>
              setNewExpanse({ ...newExpanse, [e.target.name]: e.target.value })
            }
          />
        </div>
      </div>

      <button type="submit" className="btn">Submit <MdSend className="btn-icon"/></button>
    </form>
  );
};

export default ExpanseForm;
