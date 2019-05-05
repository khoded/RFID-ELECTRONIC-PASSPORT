import React from 'react';
import Auth from '../modules/Auth';
import { Card, CardTitle, CardText } from 'material-ui/Card';
//import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      secretData: '',
      user: {}
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }


  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message,
          user: xhr.response.user
        });
      }
    });
    xhr.send();


  }





  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:3000/${body.file}` });
      });
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
    <Card className="container">
    <CardTitle
      title="UPLOAD DOCUMENTS"
      subtitle="Upload passport photograph, birth certificate, Marriage certificate"
    />
    <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <br/>
        <div  >
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
      
      </form>
      </Card>

      );
    }
  }

export default DashboardPage;
