import {
  FormControl,
  TextField,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import voltage_divider from "../../images/BJT/voltage_divider.png";

function VoltageDivider({ show, handleClose, title }) {
  const initialState = {
    Rinbase: 0,
    R2eq: 0,
    vth: 0,
    rth: 0,
    IB: 0,
    ic: 0,
    ie: 0,
    ree: 0,
    vce: 0,
  };
  const [vcc, setVcc] = useState(0.0);
  const [beta, setBeta] = useState(0.0);
  const [rb1, setRb1] = useState(0.0);
  const [rb2, setRb2] = useState(0.0);
  const [rc, setRc] = useState(0.0);
  const [re, setRe] = useState(0.0);
  const [answer, setAnswer] = useState(initialState);

  const voltageDivider = (e) => {
    e.preventDefault();
    const Rinbase = (beta + 1) * re;
    const R2eq = (rb2 * Rinbase) / (rb2 + Rinbase);
    const vth = (vcc * R2eq) / (rb1 + R2eq);
    const rth = (rb1 * R2eq) / (rb1 + R2eq);
    const IB = (vth - 0.7) / (rth + (beta + 1) * re);
    const ic = beta * IB;
    const ie = (beta + 1) * IB;
    const ree = 26e-3 / ie;
    const vce = vcc - ic * rc - ie * re;
    setAnswer({
      Rinbase: Rinbase,
      R2eq: R2eq,
      vth: vth,
      rth: rth,
      IB: IB,
      ic: ic,
      ie: ie,
      ree: ree,
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
        <div className="text-center">
          <img
            src={voltage_divider}
            className="img-fluid shadow-4 text-center"
            alt="..."
          />
        </div>
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
            label="RB1"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setRb1(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
          <TextField
            required
            id="outlined-number"
            label="RB2"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setRb2(parseFloat(parseFloat(e.target.value).toFixed(4)))
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
        <Button type="submit" variant="primary" onClick={voltageDivider}>
          Calculate
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VoltageDivider;
