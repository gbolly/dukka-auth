import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert';

import Login from '../../components/Login';
import SignUp from "../../components/Signup";

const Authentication = ({ setActiveLink }) => {
  const [activeKey, setActiveKey] = useState("login");
  const [msg, setMsg] = useState("");

  return (
    <div>
      {msg && (
        <Alert
          variant="success"
          className='w-50 mx-auto'
          onClose={() => setMsg("")}
          dismissible
        >
          {msg}
        </Alert>
      )}
      <div
        className="mx-auto p-5"
        style={{ width: "80%", border: "1px solid #E97D80" }}
      >
        <Tabs
          defaultActiveKey={activeKey}
          activeKey={activeKey}
          className="mb-5"
          variant="pills"
          onSelect={(eventKey) => {
            setActiveKey(eventKey);
            setActiveLink(eventKey);
          }}
          justify
        >
          <Tab eventKey="login" title="Login" >
            <Login />
          </Tab>
          <Tab eventKey="signup" title="Create Account">
            <SignUp setActiveKey={setActiveKey} setMsg={setMsg} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Authentication;
