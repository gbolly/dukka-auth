import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';

import { removeFromStore } from "../../utils/storage-helpers";
import { userWelcome } from "../../services/api";

const Dashboard = () => {
  const [audioData, setAudioData] = useState("");
  const [audioText, setAudioText] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const getWelcomeMsg = async () => {
      try {
        const response = await userWelcome();
        if (response.status === 200) {
          setAudioData(response.data.audio_data_base64);
          setAudioText(response.data.text);
        } else if (response.status === 401) {
          await removeFromStore("accessToken", true);
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching audio data:", error);
      }
    }
    getWelcomeMsg();
  }, [navigate]);

  const logout = async () => {
    await removeFromStore("accessToken", true);
    navigate("/");
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary justify-content-between" bg="dark"  data-bs-theme="dark">
        <Container>
          {audioData && (
            <audio controls autoPlay className="p-2">
              <source src={`data:audio/mpeg;base64,${audioData}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
          <Button
            onClick={logout}
            style={{ backgroundColor: "#E97D80" }}
            className="px-5 border-0"
          >
            Logout
          </Button>
        </Container>
      </Navbar>
      {audioText && <h3 className="mt-5">{audioText}</h3>}
    </div>
  )
};
  
export default Dashboard;
