import { useEffect, useState } from "react";
import Alert from "./Components/Alert";
import ExpanseForm from "./Components/ExpanseForm";
import ExpanseList from "./Components/ExpanseList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [newExpanse, setNewExpanse] = useState({
    id: uuidv4(),
    charge: "",
    amount: "",
  });

  const [expanses, setExpanses] = useState(
    localStorage.getItem("expanses")
      ? JSON.parse(localStorage.getItem("expanses"))
      : []
  );
  // {
  //   id: uuidv4(),
  //   charge: "rent",
  //   amount: 1200,
  // },
  // {
  //   id: uuidv4(),
  //   charge: "car payment",
  //   amount: 400,
  // },
  // {
  //   id: uuidv4(),
  //   charge: "credit card bill",
  //   amount: 1500,
  // },

  useEffect(() => {
    localStorage.setItem("expanses", JSON.stringify(expanses));
  },[expanses]);

  const [alert, setAlert] = useState({ show: false });

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });

    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newExpanse.charge !== "" && newExpanse.amount > 0) {
      const index = expanses.findIndex(
        (expanse) => expanse.id === newExpanse.id
      );
      console.log(index);
      if (index >= 0) {
        expanses[index] = newExpanse;
        setExpanses([...expanses]);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpanse = {
          id: uuidv4(),
          charge: newExpanse.charge,
          amount: newExpanse.amount,
        };
        setExpanses([...expanses, singleExpanse]);
        handleAlert({ type: "success", text: "item added" });
      }

      setNewExpanse({ id: "", charge: "", amount: "" });
    } else {
      handleAlert({
        type: "danger",
        text: `charge cant be empty value and amount must be greater than 0`,
      });
    }
  };

  const handelEdit = (id) => {
    const editItem = expanses.find((expanse) => expanse.id === id);
    console.log(editItem);
    setNewExpanse(editItem);
  };

  const clearAll = () => {
    setExpanses([]);
    handleAlert({ type: "danger", text: "All items deleted" });
  };

  const handleDelete = (id) => {
    const index = expanses.findIndex((expanse) => expanse.id === id);
    console.log(index);
    if (index >= 0) expanses.splice(index, 1);
    setExpanses([...expanses]);
    handleAlert({ type: "danger", text: "item deleted" });

    // const listItems = expanses.filter((expanse) => expanse.id !== id);
    // setExpanses([...listItems])
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpanseForm
          newExpanse={newExpanse}
          setNewExpanse={setNewExpanse}
          handleSubmit={handleSubmit}
        />
        <ExpanseList
          expanses={expanses}
          handelEdit={handelEdit}
          handleDelete={handleDelete}
          clearAll={clearAll}
        />
      </main>
      <h1>
        Total Spending:
        <span className="total">
          $
          {expanses.reduce((acc, curr) => {
            acc = acc + parseInt(curr.amount);
            return acc;
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
