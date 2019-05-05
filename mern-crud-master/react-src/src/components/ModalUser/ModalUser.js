import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormUser from '../FormUser/FormUser';

const inlineStyle = {
  modal : {
    marginTop: '0px !important',
    marginLeft: '33%',
    marginRight: 'auto',
    display: 'flex !important'
  }
};

class ModalUser extends Component {
  render() {
    return (
      <Modal
        trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        style={inlineStyle.modal}
        size='tiny'
        closeIcon='close'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormUser
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            userID={this.props.userID}
            onUserAdded={this.props.onUserAdded}
            onUserUpdated={this.props.onUserUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalUser;
