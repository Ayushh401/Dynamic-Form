import React from 'react';

const DataTable = ({ data, setSubmittedData, onEdit }) => {
  const handleDelete = (id) => {
    setSubmittedData(data.filter(item => item.id !== id));
  };

  return (
    <div className="data-table-container">
      <h2>Submitted Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Card Number</th>
            <th>Expiry Date</th>
            <th>CVV</th>
            <th>Cardholder Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>{item.street}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.zipCode}</td>
              <td>{item.cardNumber}</td>
              <td>{item.expiryDate}</td>
              <td>{item.cvv}</td>
              <td>{item.cardholderName}</td>
              <td>
                <button onClick={() => onEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
