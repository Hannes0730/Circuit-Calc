import {
  FormControl,
  TextField,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import withbypass from "../../images/BJT/withbypass.png";
import withoutbypass from "../../images/BJT/withoutbypass.png";

function Bypass({ show, handleClose, title }) {
  const initialState1 = {
    Rinbase: 0,
    R2eq: 0,
    vth: 0,
    rth: 0,
    IB: 0,
    Ic: 0,
    Ie: 0,
    ree: 0,
    vce: 0,
    Zi: 0,
    Zo: 0,
    Av: 0,
  };

  const initialState2 = {
    bc_Zb: 0,
    bc_Zi: 0,
    bc_Zo: 0,
    bc_Av: 0,
  };

  const [vcc, setVcc] = useState(0.0);
  const [beta, setBeta] = useState(0.0);
  const [rc, setRc] = useState(0.0);
  const [re, setRe] = useState(0.0);
  const [rb1, setRb1] = useState(0.0);
  const [rb2, setRb2] = useState(0.0);
  const [answer, setAnswer] = useState(initialState1);
  const [answer1, setAnswer1] = useState(initialState2);

  const bypass = (e) => {
    e.preventDefault();

    const Rinbase = (beta + 1) * re;
    const R2eq = (rb2 * Rinbase) / (rb2 + Rinbase);
    const vth = (vcc * R2eq) / (rb1 + R2eq);
    const rth = (rb1 * R2eq) / (rb1 + R2eq);
    const IB = (vth - 0.7) / (rth + (beta + 1) * re);
    const Ic = beta * IB;
    const Ie = (beta + 1) * IB;
    const ree = 26e-3 / Ie;
    const vce = vcc - Ic * rc - Ie * rc;

    //AC Analysis w/ bypass capacitor
    const Zi = (1 / rb1 + 1 / rb2 + 1 / (beta * ree)) ** -1;
    const Zo = rc;
    const Av = -rc / ree;

    //AC Analysis w/o bypass capacitor
    const bc_Zb = beta * ree + (beta + 1) * re;
    const bc_Zi = (1 / rb1 + 1 / rb2 + 1 / bc_Zb) ** -1;
    const bc_Zo = rc;
    const bc_Av = (-beta * rc) / (beta * ree + (beta + 1) * re);

    //With Bypass
    setAnswer({
      Rinbase: Rinbase,
      R2eq: R2eq,
      vth: vth,
      rth: rth,
      IB: IB,
      Ic: Ic,
      Ie: Ie,
      ree: ree,
      vce: vce,
      Zi: Zi,
      Zo: Zo,
      Av: Av,
    });

    //Without Bypass
    setAnswer1({
      bc_Zb: bc_Zb,
      bc_Zi: bc_Zi,
      bc_Zo: bc_Zo,
      bc_Av: bc_Av,
    });
  };

  const clearState = () => {
    handleClose();
    setAnswer(initialState1);
    setAnswer1(initialState2);
  };

  const showAnswer = Object.keys(answer).map((item, index) => (
    <Form.Group className="mb-3" key={index}>
      <Form.Label>{item}</Form.Label>
      <Form.Control placeholder={answer[item]} disabled />
    </Form.Group>
  ));

  const showAnswer1 = Object.keys(answer1).map((item, index) => (
    <Form.Group className="mb-3" key={index}>
      <Form.Label>{item}</Form.Label>
      <Form.Control placeholder={answer1[item]} disabled />
    </Form.Group>
  ));

  return (
    <Modal show={show} onHide={clearState} scrollable={true} size="lg">
      <Modal.Header closeButton onClick={clearState}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={withbypass} className="img-fluid shadow-4 mb-4" alt="..." />
        <img src={withoutbypass} className="img-fluid shadow-4" alt="..." />
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
          <Typography variant="h6">
            Output (<span style={{ color: "red" }}>With</span> Bypass
            Capacitor):
          </Typography>
          {showAnswer}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">
            Output (<span style={{ color: "red" }}>Without</span> Bypass
            Capacitor):
          </Typography>
          {showAnswer1}
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" variant="primary" onClick={bypass}>
          Calculate
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Bypass;
