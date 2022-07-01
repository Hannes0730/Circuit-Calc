import {
  FormControl,
  TextField,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import collector_feedback from "../../images/BJT/collector_feedback.png";

function CollectorFeedback({ show, handleClose, title }) {
  const initialState = {
    IB: 0,
    ic: 0,
    ie: 0,
    re: 0,
    vce: 0,
  };
  const [vcc, setVcc] = useState(0.0);
  const [beta, setBeta] = useState(0.0);
  const [rb, setRb] = useState(0.0);
  const [rc, setRc] = useState(0.0);
  const [answer, setAnswer] = useState(initialState);

  const collectorFeedback = (e) => {
    e.preventDefault();

    const ib = (vcc - 0.7) / (rb + rc * (beta + 1));
    const ic = beta * ib;
    const ie = (beta + 1) * ib;
    const re = 26e-3 / ie;
    const vce = vcc - (ib + ic) * rc;

    setAnswer({
      IB: ib,
      ic: ic,
      ie: ie,
      re: re,
      vce: vce,
    });

    console.log(answer);
  };

  const clearState = () => {
    handleClose();
    setAnswer(initialState);
  };

  const showAnswer = Object.keys(answer).map((item, index) => (
    <Form.Group className="mb-3" key={index}>
      <Form.Label>{item}</Form.Label>
      <Form.Control placeholder={answer[item]} disabled />
    </Form.Group>
  ));

  return (
    <Modal show={show} onHide={clearState} scrollable={true} size="lg">
      <Modal.Header closeButton onClick={clearState}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={collector_feedback}
          className="img-fluid shadow-4"
          alt="Collector Feedback"
        />
        <FormControl fullWidth>
          <TextField
            required
            id="outlined-number"
            label="VCC"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setVcc(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
          <TextField
            required
            id="outlined-number"
            label="BETA"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setBeta(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
          <TextField
            required
            id="outlined-number"
            label="RB"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setRb(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
          <TextField
            required
            id="outlined-number"
            label="RC"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setRc(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
        </FormControl>
        <Divider sx={{ marginTop: "15px", marginBottom: "15px" }} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">Output:</Typography>
          {showAnswer}
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" variant="primary" onClick={collectorFeedback}>
          Calculate
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CollectorFeedback;
