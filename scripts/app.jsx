import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import '../styles/main.scss'
import Field from './components/Field'
import { connect } from "react-redux";
import {
  getCountries,
  updateValues,
  errorData
} from "./store/actions";
import { bindActionCreators } from "redux";

class App extends Component {
  state = {
    errors: {
      name: '',
      code: 0,
      mobile: '',
      email: '',
      country: 0,
      password: '',
      passwordConfirmation: '',
    },
    isActive: false
  }

  validateFields = () => {
    const { values } = this.props
    const errors = {}

    if (values.username.length < 5) {
      errors.username = 'Must be more 5 characters'
    }

    if (values.mobile.length < 3) {
      errors.mobile = 'Must be more 3 characters'
    }

    const validateEmail = email => {
      let valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return valid.test(String(email).toLowerCase())
    }

    if (!validateEmail(values.email)) {
      errors.email = 'Enter valid email'
    }

    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = 'Your passwords do not match'
    }

    if (values.password.length <=  0) {
      errors.password = 'Required'
    }

    return errors
  }

  onSubmit = () => {
    const errors = this.validateFields()
  //   if (Object.keys(errors).length > 0) {
  //     this.props.errorData(errors);
  //   } else {
  //     this.onRegister() 
  //   }
    this.onRegister() 
  }

  onRegister = () => { 
    const { values } = this.props;
    const errors  = {}
    return fetch( 'http://localhost:3002/register', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: values.username,
        dialCode: + values.code,
        mobile: values.mobile,
        email: values.email,
        country: "UK",
        password: values.password,
        passwordConfirmation: values.repeatPassword,
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.errors) {
          console.log("error", response)
          let errors = {}
          response.errors.forEach(item => {
            errors[item.param] = item.msg
          })
          console.log(errors)
          this.setState(prevState => ({
            errors: {
              ...prevState.errors,
              ...errors
            }
          }))
        } else {
          console.log("Not error", response)
        }
       }
      )
      .catch(error => console.error('Error:', error));
  }

  
  componentDidMount() {
    this.props.getCountries()
  }


  getOptionsCode = items => {
    // if (this.state.values.country.length > 0) {
    //   let countryArray = []

    //   for (let key in items) {
    //     if (items[key].id === Number(this.state.values.country)) {
    //       countryArray.push({ id: key, dial_code: items[key].dial_code, name: items[key].name })
    //     }
    //   }

    //   return countryArray.map(item => (
    //     <option key={item.id} value={item.id}>
    //       +{item.dial_code}  {item.name}
    //     </option>
    //   ))
    // }
    return items.map(item => (
        <option key={item.id} value={item.id}>
          +{item.dial_code}  {item.name}
        </option>
    ))
  }


  // getOptionsCountry = items => {
  //   if(this.state.values.code.length > 0) {
  //     let countryArray = []

  //     for (let key in items) {
  //       if (items[key].id === Number(this.state.values.code)) {
  //         countryArray.push({ id: key, name: items[key].name })
  //       }
  //     }

  //     return countryArray.map(item => (
  //       <option key={item.id} value={item.id}>
  //         {item.name}
  //       </option>
  //     ))
  //   }
  //   return items.map(item => (
  //     <option key={item.id} value={item.id}>
  //       {item.name}
  //     </option>
  //   ))
  // }

  getCodes = () => {
    return this.props.countries.map(item => (
      <option key={item.id} value={item.id}>
        +{item.dial_code}  {item.name}
      </option>
    ))
  }

  getCountries = () =>{
    return this.props.countries.map(item => (
      <option key={item.id} value="UK">
        {item.name}
      </option>
    ))
  }

  render() {
    const { isActive, errors}  = this.state;
    const { onChangeValues, values} = this.props;
    console.log(errors)
    return (
      <div className="app">
        <div className="form-container">
          <h1>Sign up</h1>
          <form className="form-login">
            <Field
              id="username"
              labelText="Name"
              type="text"
              name="username"
              value={values.username}
              error={errors.name}
              isActive={isActive}
              handleFocus={this.handleFocus}
            />
            <div className="d-flex">
              <div className="form-group">
                <label htmlFor="code">Code</label>
                <select className="form-control"
                  name="code"
                  value={values.code}
                  onChange={onChangeValues}>
                  <option value="0"></option>
                  {this.getCodes()}
                </select>
              </div>
              <Field
                id="mobile"
                labelText="Phone number"
                type="text"
                name="mobile"
                value={values.mobile}
                error={errors.mobile}
                isActive={isActive}
                handleFocus={this.handleFocus}
              />
            </div>
            <Field
              id="email"
              labelText="Email address"
              type="email"
              name="email"
              value={values.email}
              error={errors.email}
              isActive={isActive}
              handleFocus={this.handleFocus}
            />
            <div className="form-group">
              <label htmlFor="country">Select country</label>
              <select className="form-control" 
                      name="country"
                      value={values.country}
                      onChange={onChangeValues}>
                <option value="0"></option>
                {this.getCountries()}
              </select>
            </div>
            <Field
              id="password"
              labelText="Password"
              type="password"
              name="password"
              value={values.password}
              error={errors.password}
              isActive={isActive}
              handleFocus={this.handleFocus}
            />
            <Field
              id="repeatPassword"
              labelText="Password сonfirmation"
              type="password"
              name="repeatPassword"
              value={values.repeatPassword}
              error={errors.repeatPassword}
              isActive={isActive}
              handleFocus={this.handleFocus}
            />
            <div className="form-group">
              <input
                type="checkbox"
                name="agree" />
              <label > Yes, I'd like to recieve the very occasional email with information on new services and discounts</label>
            </div>
            <button type="button"
              className="form-button"
              onClick={this.onSubmit}> create an account </button>
            <div className="form-description"> Already have a 24Slides account? Click here to log in to your existing account and join a company team</div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isActive: state.isActive,
    countries: state.countries,
    values: state.values,
    errors: state.errors,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCountries,
      onChangeValues: updateValues,
      errorData
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);