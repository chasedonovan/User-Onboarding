import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as yup from 'yup'

const Form = () =>{
  const [formState, setFormState] = useState({
    fname:'',
    lname:'',
    email:'',
    password:'',
    terms:'',
  });

  const [errors, setErrors] = useState({
    fname:'',
    lname:'',
    email:'',
    password:'',
    terms:'',
  });

  const [btnDisabled, setBtnDisabled] = useState('');

  const [post, setPost] = useState([])

  const validForm = yup.object().shape({
    fname: yup
        .string()
        .trim()
        .min(2, "First name must be 2+ characters")
        .required("First name is a required fireld"),
        lname: yup
        .string()
        .trim()
        .min(2, "Last name must be 2+ characters")
        .required("Last name is a required fireld"),
        password: yup
        .string()
        .trim()
        .min(5, "Password must be 5+ characters")
        .max(25, "Password must be 25 or less characters")
        .required("Password is a required fireld"),
        email: yup
        .string()
        .email('Must be a valid email')
        .trim()
        .required("Email is required"),
        terms: yup.boolean().oneOf([true], 'You must accept the Terms of Service'),
  });

useEffect (() =>{
  console.log('form state changed')
  validForm.isValid(formState).then((valid) => {
    setBtnDisabled(!valid);
  });
});

const validateChange = e => {
  yup
  .reach(validForm, e.target.name)
  .validate(e.target.value)
  .then(valid => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  })
  .catch((err) => {
    setErrors({
      ...errors,
      [e.target.name]: err.errors[0],
    });
  });
};

const inputChange = e => {
  e.persist();

  const newFormData = {
    ...formState,
    [e.target.name]:e.target.type==='checkbox' ? e.target.checked : e.target.value,
  };
  validateChange(e);
  setFormState(newFormData);
};

const formSubmit = (e) => {
  e.preventDefault();
  axios
  .post('https://reqres.in/api/users', formState)
  .then(res => {
    setPost(res.data)
    setTimeout(() => { console.log("success", post)}, 1000);  setFormState({
    fname:'',
    lname:'',
    email:'',
    password:'',
    terms:'',
    });
  })
  .catch((err) => {
    console.log('error in form submit fn', err.response);
  })
};

  return (
    /*form goes here*/
    <form className="form-container" onSubmit={formSubmit}>
      <div className="all-center">
        <h2>Fill out the form G</h2>

        {/* // Text Input // */}
        <label htmlFor="first-name">
          First Name:&nbsp;
          <input
            value={formState.fname}
            onChange={inputChange}
            id="first-name"
            name='fname'
            type='text'
            placeholder='FIRST'
          />
        </label>

        <label htmlFor="last-name">
          Last Name:&nbsp;
          <input
            value={formState.lname}
            onChange={inputChange}
            id="last-name"
            name='lname'
            type='text'
            placeholder='LAST'
          />
        </label>

        <label htmlFor="emailInput">
          Email:&nbsp;
          <input
            value={formState.email}
            onChange={inputChange}
            id="email"
            name='email'
            type='text'
            placeholder='youremail@email.com'
          />
        </label>

        <label htmlFor="passwordInput">
          Password:&nbsp;
          <input
            value={formState.password}
            onChange={inputChange}
            id="passwordInput"
            name='password'
            type='password'
            placeholder='Password'
          />
        </label>

        {/* ERRORS */}
        <div className="alert">
          <div>{errors.fname}</div>
          <div>{errors.lname}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
        </div>

        <div className="form-checkbox">
          <label htmlFor="termsInput">
            <h4> Do you agree to the Terms of Service foo?</h4> &nbsp;
            <input
              type="checkbox"
              name="terms"
              id="termsInput"
              checked={formState.terms}
              onChange={inputChange}
              />
          </label>
      </div>

      {/* Submit Button */}
      <div className="submit-btn">
        {/* disable until form is complete */}
        <button className="btn" disabled={btnDisabled} type="submit">
          Submit
        </button>
        </div>
        {/* ends form submit div */}
      </div>
      {/* ends form text div */}
    </form>
  );
};

export default Form;