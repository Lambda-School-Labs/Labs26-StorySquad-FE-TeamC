// see README.md in components/common dir for more info

import React, { useState } from 'react';
import { Modal } from 'antd';

// components
import UserForm from './UserForm';
import PINForm from './PINForm';
import { useHistory } from 'react-router-dom';
import { LoadingComponent } from '../LoadingComponent';

const AccountPinModal = props => {
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const loggedInUser = JSON.parse(
    window.localStorage.getItem('okta-token-storage')
  );
  const history = useHistory();

  const [formVisibility, setFormVisibility] = useState({
    userForm: true,
    pinForm: false,
  });

  // from back-end pin validation
  const [validationError, setValidationError] = useState(
    'Pin and account type validation errors'
  );

  // stores 'formdata' from each form in form sequence til ready for submission. formsubmissionData ex:
  const [formSubmissionData, setFormSubmissionData] = useState({
    // pin: {'1234'},
    // userForm: {'child'}
  });

  const handleCancel = () => {
    history.push('/login');
    setShowModal(false);
  };

  // called from the pinForm on submit
  const mainSubmit = () => {
    // axios call here to verify account and PIN
    // if errors display errors
    // else, submit form
    // render loader
    // close modal, redirect to dash
    history.push('/login');
  };

  return (
    <div className="modal" data-testid="formModalCont">
      <Modal
        data-testid="formModal"
        style={{
          width: '100%',
        }}
        destroyOnClose
        closable
        // displayed 'label' text for the modal header
        visible={showModal}
        footer={null}
        onCancel={handleCancel}
      >
        {formVisibility.userForm && (
          <UserForm
            loggedInUser={loggedInUser}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            formVisibility={formVisibility}
            setFormVisibility={setFormVisibility}
            formSubmissionData={formSubmissionData}
            setFormSubmissionData={setFormSubmissionData}
          />
        )}
        {formVisibility.pinForm && (
          <PINForm
            loggedInUser={loggedInUser}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            mainSubmit={mainSubmit}
            setShowModal={setShowModal}
            formVisibility={formVisibility}
            setFormVisibility={setFormVisibility}
            formSubmissionData={formSubmissionData}
            setFormSubmissionData={setFormSubmissionData}
          />
        )}
        {validationError && (
          <div className="pinFormError">{validationError}</div>
        )}
      </Modal>
      {console.log('loggedInUser: ', loggedInUser)}
    </div>
  );
};

export default AccountPinModal;
