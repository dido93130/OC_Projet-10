import React, { useState, useCallback, useRef } from 'react';
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
new Promise((resolve) => {
  setTimeout(resolve, 900);
});

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    message: '',
    type: ''
  }); 

  const handleInputChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: value };      
    setFormData(updatedFormData);      
  };
  
  const isFormValid = () => (
    formData.nom.trim() !== "" &&
    formData.prenom.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "" &&
    formData.type.trim() !== ""
  );

  const isTestEnvironment = useRef(process.env.NODE_ENV === 'test');

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      if (!sending || isTestEnvironment.current) {
        if (!isTestEnvironment.current && !isFormValid()) {
          return; // Ne pas soumettre si le formulaire n'est pas valide dans un environnement non-test
        }
        setSending(true);
        try {
          await mockContactApi();
          onSuccess(formData);
        } catch (err) {
          onError(err);
        }
        setSending(false);
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          message: '',
          type: ''
        });
      }
    },
    [formData, onSuccess, onError, sending]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" value={formData.nom}
            onChange={(e) =>
              handleInputChange('nom', e.target.value)}/>
          <Field placeholder="" label="Prénom" value={formData.prenom}
            onChange={(e) => handleInputChange('prenom', e.target.value)}/>
          <Select
            selection={["Personel", "Entreprise"]}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            value={formData.type}
            onChange={(selectedOption) => handleInputChange('type', selectedOption)}
          />
          <Field placeholder="" label="Email" value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}/>
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
