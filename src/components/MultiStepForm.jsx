import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Button, FormControl, FormLabel, FormErrorMessage, Checkbox, Box, Stack, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from './FormDataContext';
import './multistepform.css';


const stepOneSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  firstName: yup.string().required('First name is required'),
});

const stepTwoSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  zipCode: yup.string().required('ZIP code is required'),
  place: yup.string().required('Place is required'),
  phone: yup.string().required('Phone is required'),
  privacyPolicy: yup.boolean().oneOf([true], 'You must accept the privacy policy'),
});

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [schema, setSchema] = useState(stepOneSchema);
  const navigate = useNavigate();
  const { updateFormData } = useFormData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    updateFormData(data);
    console.log(data);
    if (step === 1) {
      setStep(2);
      setSchema(stepTwoSchema);
    } else if (step === 2) {
      navigate('/result');
    }
  };

  const handleContinue = () => {
    handleSubmit(onSubmit)();
  };

return (
<form>
{step === 1 && (
<>
<FormControl isInvalid={errors.name}>
<FormLabel>Last name</FormLabel>
<Input {...register('name')} />
<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
</FormControl>
<FormControl isInvalid={errors.firstName}>
        <FormLabel>First Name</FormLabel>
        <Input {...register('firstName')} />
        <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
      </FormControl>

      {/* Add other fields for step 1 */}
      
      <Button mt={4} colorScheme="teal" type="button" onClick={handleContinue}>
        Continue
      </Button>
    </>
  )}

  {step === 2 && (
    <>
      <FormControl isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Input {...register('email')} />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.address}>
        <FormLabel>Address</FormLabel>
        <Input {...register('address')} />
        <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.zipCode}>
        <FormLabel>ZIP Code</FormLabel>
        <Input {...register('zipCode')} />
        <FormErrorMessage>{errors.zipCode && errors.zipCode.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.place}>
        <FormLabel>City</FormLabel>
        <Input {...register('place')} />
        <FormErrorMessage>{errors.place && errors.place.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.phone}>
        <FormLabel>Phone</FormLabel>
        <Input {...register('phone')} />
        <FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.privacyPolicy}>
        <Checkbox {...register('privacyPolicy')}>
          I accept the privacy policy
        </Checkbox>
        <FormErrorMessage>
          {errors.privacyPolicy && errors.privacyPolicy.message}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="teal" type="button" onClick={handleContinue}>
        Continue
      </Button>
    </>
  )}
</form>
);
};

export default MultiStepForm;