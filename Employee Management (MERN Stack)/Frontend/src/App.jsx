import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Formtable from "./components/Formtable";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
  const [addSection, setAddsection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    email: "",
    contactNumber: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    email: "",
    contactNumber: "",
  });

  const [dataList, setDataList] = useState([]);
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((perve) => {
      return {
        ...perve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddsection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        firstName: "",
        lastName: "",
        employeeId: "",
        email: "",
        contactNumber: "",
      });
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
      // alert(data.data.message);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  const handledelete = async (id) => {
    const data = await axios.delete("/delete/" + id);

    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update/", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };
  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((perve) => {
      return {
        ...perve,
        [name]: value,
      };
    });
  };
  const handleEdit = async (e1) => {
    setFormDataEdit(e1);
    setEditSection(true);
  };
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddsection(true)}>
          ADD
        </button>
        {addSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddsection(false)}
            rest={formData}
          />
        )}
        {editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Employee_ID</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((e1) => {
                  return (
                    <tr>
                      <td>{e1.firstName}</td>
                      <td>{e1.lastName}</td>
                      <td>{e1.employeeId}</td>
                      <td>{e1.email}</td>
                      <td>{e1.contactNumber}</td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(e1)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handledelete(e1._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p>No Data Found!</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
