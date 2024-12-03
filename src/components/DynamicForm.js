import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ProgressBar from "./ProgressBar";
import FormField from "./FormField";
import DataTable from "./DataTable";

const DynamicForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue, trigger, reset } = useForm();
  const [formFields, setFormFields] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [formType, setFormType] = useState("");
  const [sectionStatus, setSectionStatus] = useState({});
  const [progress, setProgress] = useState(0);
  const [selectedEntryId, setSelectedEntryId] = useState(null);  // Track which entry is being edited
  const [isEditing, setIsEditing] = useState(false);  // Track if we are in edit mode

  const apiResponses = {
    "User Information": [
      { name: "firstName", type: "text", label: "First Name", required: true, pattern: /^[A-Za-z]+$/ },
      { name: "lastName", type: "text", label: "Last Name", required: true, pattern: /^[A-Za-z]+$/ },
      { name: "age", type: "number", label: "Age", required: false },
    ],
    "Address Information": [
      { name: "street", type: "text", label: "Street", required: true },
      { name: "city", type: "text", label: "City", required: true },
      { name: "state", type: "dropdown", label: "State", options: ["California", "Texas", "New York"], required: true },
      { name: "zipCode", type: "text", label: "Zip Code", required: false },
    ],
    "Payment Information": [
      { name: "cardNumber", type: "text", label: "Card Number", required: true, pattern: /^[0-9]+$/ },
      { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
      { name: "cvv", type: "password", label: "CVV", required: true, pattern: /^[0-9]{3,4}$/ },
      { name: "cardholderName", type: "text", label: "Cardholder Name", required: true, pattern: /^[A-Za-z ]+$/ },
    ],
  };

  const handleFormTypeChange = (e) => {
    const selectedForm = e.target.value;
    setFormType(selectedForm);
    setFormFields(apiResponses[selectedForm] || []);
    setProgress(0);
    reset();  // Reset the form when form type changes
  };

  useEffect(() => {
    const totalFields = formFields.length;
    const filledFields = formFields.filter(field => watch(field.name)).length;
    const sectionComplete = filledFields === totalFields;
    setProgress((filledFields / totalFields) * 100);

    setSectionStatus(prevStatus => ({
      ...prevStatus,
      [formType]: sectionComplete,
    }));
  }, [watch(), formFields]);

  const allSectionsCompleted = Object.values(sectionStatus).every(status => status);

  const handleEdit = (id) => {
    const selectedEntry = submittedData.find(item => item.id === id);
    setSelectedEntryId(id);
    setIsEditing(true); // Set to edit mode
    setFormType("User Information"); // Change form type based on the entry type
    Object.keys(selectedEntry).forEach(field => {
      setValue(field, selectedEntry[field]);
    });
  };

  const onSubmit = (data) => {
    if (!allSectionsCompleted) {
      alert("Please complete all sections before submitting.");
      return;
    }

    if (isEditing) {
      // Update the existing entry in the submittedData
      const updatedData = submittedData.map(item =>
        item.id === selectedEntryId ? { ...item, ...data } : item
      );
      setSubmittedData(updatedData);
      setSelectedEntryId(null); // Reset the editing state
      setIsEditing(false); // Reset edit mode
      alert("Form updated successfully!");
    } else {
      // Add a new entry
      setSubmittedData(prevData => [...prevData, { id: Date.now(), ...data }]);
      alert("Form submitted successfully!");
    }

    reset(); // Clear form fields after submission
  };

  return (
    <div className="dynamic-form-container">
      <h1>Dynamic Form</h1>
      <div className="form-layout">
        <ProgressBar completed={progress} />
        <div className="form-section">
          <select onChange={handleFormTypeChange}>
            <option value="">Select Form Type</option>
            <option value="User Information">User Information</option>
            <option value="Address Information">Address Information</option>
            <option value="Payment Information">Payment Information</option>
          </select>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formFields.map((field, index) => (
              <FormField
                key={index}
                field={field}
                register={register}
                errors={errors}
                trigger={trigger}
              />
            ))}
            <button type="submit" disabled={!allSectionsCompleted}>
              {isEditing ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <DataTable data={submittedData} setSubmittedData={setSubmittedData} onEdit={handleEdit} />
    </div>
  );
};

export default DynamicForm;
