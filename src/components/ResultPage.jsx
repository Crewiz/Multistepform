import React from 'react';
import { useFormData } from './FormDataContext';

const ResultPage = () => {
  const { formData } = useFormData();

  return (
    <div>
      <h2>Form Data</h2>
      <p>Last Name: {formData.name}</p>
      <p>First Name: {formData.firstName}</p>
      <p>Email: {formData.email}</p>
      <p>Address: {formData.address}</p>
      <p>ZIP Code: {formData.zipCode}</p>
      <p>City: {formData.place}</p>
      <p>Phone: {formData.phone}</p>
      <p>Privacy Policy Accepted: {formData.privacyPolicy ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default ResultPage;
