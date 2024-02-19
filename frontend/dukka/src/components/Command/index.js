import Alert from "react-bootstrap/Alert";
import ListGroup from 'react-bootstrap/ListGroup';

const CommandInstructions = ({ activeLink }) => {
  return (
    <Alert
      style={{ backgroundColor: "rgb(191 128 130 / 42%)" }}
      className="border-0 p-5"
    >
      <Alert.Heading>Commands to use speech-to-text functionality</Alert.Heading>
      <hr />
      <ListGroup variant="flush">
        {activeLink === 'login' ? (
          <div>
            <ListGroup.Item>
              For email field, start your speech with
              <b> my email is </b>[your email]
            </ListGroup.Item>
            <ListGroup.Item>
              For password field, start your speech with
              <b> my password is </b> [your password]
            </ListGroup.Item>
          </div>
        ) : (
          <div>
            <ListGroup.Item>
              For full name field, start your speech with
              <b> my full name is </b> [your email]
            </ListGroup.Item>
            <ListGroup.Item>
              For email field, start your speech with
              <b> my email is </b>[your email]
            </ListGroup.Item>
            <ListGroup.Item>
              For Phone number field, start your speech with
              <b> my phonenumber is </b>[your number]
            </ListGroup.Item>
            <ListGroup.Item>
              For password field, start your speech with
              <b> my password is </b>[your password]
            </ListGroup.Item>
            <ListGroup.Item>
              For confirm password field, start your speech with
              <b> my password confirmation is </b>[your password]
            </ListGroup.Item>
            <ListGroup.Item>
              For select gender field, start your speech with
              <b> my gender is </b>[your gender] options are male, female, other
            </ListGroup.Item>
            <ListGroup.Item>
              For select country field, start your speech with
              <b> my country is </b>[your country] options are Algeria, Canada, Ghana, Nigeria
            </ListGroup.Item>
          </div>
        )}
      </ListGroup>
    </Alert>
  );
};

export default CommandInstructions;
