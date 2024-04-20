import React from "react";
import "../App.css";
import { IoMdClose } from "react-icons/io";
const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}>
          <IoMdClose />
        </div>
        <label htmlFor="firstNAme">FirstName</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={handleOnChange}
          value={rest.firstName}
        />
        <br />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          onChange={handleOnChange}
          value={rest.lastName}
        />
        <label htmlFor="empId">Employee ID</label>
        <input
          type="number"
          id="empId"
          name="employeeId"
          onChange={handleOnChange}
          value={rest.employeeId}
        />

        <label htmlFor=" email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleOnChange}
          value={rest.email}
        />

        <label htmlFor="contactNumber">ContactNo.</label>
        <input
          type="number"
          id="contactNumber"
          name="contactNumber"
          onChange={handleOnChange}
          value={rest.contactNumber}
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Formtable;
