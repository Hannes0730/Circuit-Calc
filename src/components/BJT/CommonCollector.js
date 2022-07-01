import {
  FormControl,
  TextField,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import common_collector from "../../images/BJT/common_collector.png";

function CommonCollector({ show, handleClose, title }) {
  const initialState = {
    Rinbase: 0,
    R2eq: 0,
    vth: 0,
    rth: 0,
    IB: 0,
    Ic: 0,
    Ie: 0,
    ree: 0,
    Vce: 0,
  };

  const initialState1 = {
    Zb: 0,
    Zi: 0,
    Zo: 0,
    Av: 0,
  };

  const [vcc, setVcc] = useState(0.0);
  const [beta, setBeta] = useState(0.0);
  const [re, setRe] = useState(0.0);
  const [rb1, setRb1] = useState(0.0);
  const [rb2, setRb2] = useState(0.0);
  const [answer, setAnswer] = useState(initialState);
  const [acAnal, setacAnal] = useState(initialState1);

  const commonCollector = (e) => {
    e.preventDefault();
    const Rinbase = (beta + 1) * re;
    const R2eq = (rb2 * Rinbase) / (rb2 + Rinbase);
    const vth = (vcc * R2eq) / (rb1 + R2eq);
    const rth = (rb1 * R2eq) / (rb1 + R2eq);
    const IB = (vth - 0.7) / (rth + (beta + 1) * re);
    const Ic = beta * IB;
    const Ie = (beta + 1) * IB;
    const ree = 26e-3 / Ie;
    const vce = vcc - Ie * re;

    //AC
    const Zb = beta * ree + (beta + 1) * re;
    const Zi = (1 / rb1 + 1 / rb2 + 1 / Zb) ** -1;
    const Zo = (re * ree) / (re + ree);
    const Av = ((beta + 1) * re) / Zb;

    //TODO: setAnswer

    setAnswer({
      Rinbase: Rinbase,
      R2eq: R2eq,
      vth: vth,
      rth: rth,
      IB: IB,
      Ic: Ic,
      Ie: Ie,
      ree: ree,
      Vce: vce,
    });

    setacAnal({
      Zb: Zb,
      Zi: Zi,
      Zo: Zo,
      Av: Av,
    });
  };

  const clearState = () => {
    handleClose();
    setAnswer(initialState);
    setacAnal(initialState1);
  };

  const showAnswer = Object.keys(answer).map((item, index) => (
    <Form.Group className="mb-3" key={index}>
      <Form.Label>{item}</Form.Label>
      <Form.Control placeholder={answer[item]} disabled />
    </Form.Group>
  ));

  const showAnswer1 = Object.keys(acAnal).map((item, index) => (
    <Form.Group className="mb-3" key={index}>
      <Form.Label>{item}</Form.Label>
      <Form.Control placeholder={acAnal[item]} disabled />
    </Form.Group>
  ));

  return (
    <Modal show={show} onHide={clearState} scrollable={true} size="lg">
      <Modal.Header closeButton onClick={clearState}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={common_collector} className="img-fluid shadow-4" alt="..." />

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
            label="RE"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setRe(parseFloat(parseFloat(e.target.value).toFixed(4)))
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
        </FormControl>
        <Divider sx={{ marginTop: "15px", marginBottom: "15px" }} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">Output (DC Analysis):</Typography>
          {showAnswer}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">Output (AC Analysis):</Typography>
          {showAnswer1}
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" variant="primary" onClick={commonCollector}>
          Calculate
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommonCollector;
