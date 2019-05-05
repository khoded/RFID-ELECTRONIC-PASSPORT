import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
  { key: 'o', text: 'Do Not Disclose', value: 'o' }
]

class FormUser extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      email: '',
      age: '',
      sex: '',
      status: '',
      pob: '',
      rfid: '',
      country: '',
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Fill in the form with the appropriate data if user id is provided
    if (this.props.userID) {
      axios.get(`${this.props.server}/api/users/${this.props.userID}`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          age: (response.data.age === null) ? '' : response.data.age,
          sex: response.data.sex,
          status: response.data.status,
          pob: response.data.pob,
          rfid: response.data.rfid,
          country: response.data.country,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSelectChange(e, data) {
    this.setState({ sex: data.value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,
      sex: this.state.gender,
      country: this.state.country,
      pob: this.state.pob,
      status: this.state.status,
      rfid: this.state.rfid
    }

    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.userID ? 'put' : 'post';
    const params = this.props.userID ? this.props.userID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/users/${params}`,
      data: user
    })
    .then((response) => {
      this.setState({
        formClassName: 'success',
        formSuccessMessage: response.data.msg
      });

      if (!this.props.userID) {
        this.setState({
          name: '',
          email: '',
          age: '',
          sex: '',
          pob: '',
          country: '',
          rfid:'',
          status: '',
        });
        this.props.onUserAdded(response.data.result);
        this.props.socket.emit('add', response.data.result);
      }
      else {
        this.props.onUserUpdated(response.data.result);
        this.props.socket.emit('update', response.data.result);
      }
      
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.data) {
          this.setState({
            formClassName: 'warning',
            formErrorMessage: err.response.data.msg
          });
        }
      }
      else {
        this.setState({
          formClassName: 'warning',
          formErrorMessage: 'Something went wrong. ' + err
        });
      }
    });
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Input
          label='Name'
          type='text'
          placeholder='Elon Musk'
          name='name'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Email'
          type='email'
          placeholder='elonmusk@tesla.com'
          name='email'
          maxLength='40'
          required
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Country'
          type='text'
          placeholder='Nigerian'
          name='country'
          maxLength='40'
          required
          value={this.state.country}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='State of Origin'
          type='text'
          placeholder='State'
          name='pob'
          maxLength='40'
          required
          value={this.state.pob}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Marital Status'
          type='text'
          placeholder='Marital Status'
          name='status'
          maxLength='40'
          required
          value={this.state.status}
          onChange={this.handleInputChange}
        />
         <Form.Input
          label='Passport Code'
          type='text'
          placeholder='Passport Code'
          name='rfid'
          maxLength='40'
          required
          value={this.state.rfid}
          onChange={this.handleInputChange}
        />
        <Form.Group widths='equal'>
          <Form.Input
            label='Age'
            type='number'
            placeholder='18'
            min={5}
            max={130}
            name='age'
            value={this.state.age}
            onChange={this.handleInputChange}
          />
          <Form.Field
            control={Select}
            label='Gender'
            options={genderOptions}
            placeholder='Gender'
            value={this.state.sex}
            onChange={this.handleSelectChange}
          />
        </Form.Group>

        <Message
          success
          color='green'
          header='Nice one!'
          content={formSuccessMessage}
        />
        <Message
          warning
          color='yellow'
          header='Woah!'
          content={formErrorMessage}
        />
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormUser;
