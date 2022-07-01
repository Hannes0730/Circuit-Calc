import {
  FormControl,
  TextField,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import self_bias from "../../images/BJT/self_bias.png";

function SelfBiasEmitter({ show, handleClose, title }) {
  const initialState = {
    Ib: 0,
    Ic: 0,
    Ie: 0,
    Ree: 0,
    Vce: 0,
  };
  const [vcc, setVcc] = useState(0.0);
  const [beta, setBeta] = useState(0.0);
  const [rc, setRc] = useState(0.0);
  const [rb, setRb] = useState(0.0);
  const [re, setRe] = useState(0.0);
  const [answer, setAnswer] = useState(initialState);

  const SelfBiasEmitter = (e) => {
    e.preventDefault();
    const ib = (vcc - 0.7) / (rb + (beta + 1) * re);
    const ic = beta * ib;
    const ie = (beta + 1) * ib;
    const ree = 26e-3 / ie;
    const vce = vcc - ic * rc - ie * re;

    setAnswer({
      Ib: ib,
      Ic: ic,
      Ie: ie,
      Ree: ree,
      Vce: vce,
    });
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
        <img src={self_bias} className="img-fluid shadow-4" alt="..." />
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
            label="RC"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setRc(parseFloat(parseFloat(e.target.value).toFixed(4)))
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
            label="RE"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setRe(parseFloat(parseFloat(e.target.value).toFixed(4)))
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
        <Button type="submit" variant="primary" onClick={SelfBiasEmitter}>
          Calculate
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SelfBiasEmitter;
