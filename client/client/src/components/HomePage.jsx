import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';

class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <Card className="container">
        <CardTitle title="Nigeria Immigration Service" subtitle="E-PASSPORT APPLICATION AND ISSUANCE SYSTEM" />
          {Auth.isUserAuthenticated() ? (
            <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome! Please complete application or verify Approval.</CardText>
          ) : (
            <CardText style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</CardText>
          )}
      </Card>
    )
  }
};

export default HomePage;
