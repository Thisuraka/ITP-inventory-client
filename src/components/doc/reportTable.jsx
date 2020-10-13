import React from "react";

const RecordTable = ({ record }) => {
  return (
    <div className="container">
      {record.length === 0 ? (
        "You currently have no records created"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Supplier Name</th>
              <th scope="col">Date</th>
              <th scope="col">Cost</th>
              <th scope="col">Quantity</th>
              <th scope="col">Breed</th>
            </tr>
          </thead>
          <tbody>
            {record.map((record) => (
              <tr key={record.id}>
                <td>{record.supplierName}</td>
                <td>{record.date}</td>
                <td>{record.cost}</td>
                <td>{record.quantity}</td>
                <td>{record.breed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecordTable;
