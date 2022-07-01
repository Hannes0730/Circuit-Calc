import {
  FormControl,
  TextField,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import common_drain from "../../images/JFET/common_drain.png";

function CommonDrain({ show, handleClose, title }) {
  const initialState1 = {
    vg: 0,
    vgs: 0,
    id: 0,
    vds: 0,
    gmo: 0,
    gm: 0,
    av: 0,
  };

  const [vdd, setVdd] = useState(0.0);
  const [rl, setRl] = useState(0.0);
  const [rs, setRs] = useState(0.0);
  const [r1, setR1] = useState(0.0);
  const [r2, setR2] = useState(0.0);
  const [idss, setIdss] = useState(0.0);
  const [vp, setVp] = useState(0.0);
  const [answer, setAnswer] = useState(initialState1);

  const calculate = (e) => {
    e.preventDefault();

    let vgs = 0;

    const vg = (vdd * r2) / (r1 + r2);

    const a = -(idss * rs) / vp ** 2;
    const b = (2 * idss * rs) / vp - 1;
    const c = vg - idss * rs;

    const d = b ** 2 - 4 * a * c;

    const sol1 = (-b - Math.sqrt(d)) / (2 * a);
    const sol2 = (-b + Math.sqrt(d)) / (2 * a);

    if (sol1 > vp) {
      vgs = sol1;
    } else {
      vgs = sol2;
    }

    const id = idss * (1 - vgs / vp) ** 2;
    const vds = vdd - id * rs;
    const gmo = (2 * idss) / -vp;
    const gm = gmo * (1 - vgs / vp);
    const Rs = (rs * rl) / (rs + rl);
    const av = (id * Rs) / (1 + gm * Rs);

    setAnswer({
      vg: vg,
      vgs: vgs,
      id: id,
      vds: vds,
      gmo: gmo,
      gm: gm,
      av: av,
    });
  };

  const clearState = () => {
    handleClose();
    setAnswer(initialState1);
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
        <img src={common_drain} className="img-fluid shadow-4" alt="..." />
        <FormControl fullWidth>
          <TextField
            required
            id="outlined-number"
            label="VDD"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setVdd(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
          <TextField
            required
            id="outlined-number"
            label="RL"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setRl(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
          <TextField
            required
            id="outlined-number"
            label="RS"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setRs(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
          <TextField
            required
            id="outlined-number"
            label="R1"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setR1(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
          <TextField
            required
            id="outlined-number"
            label="R2"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setR2(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
          <TextField
            required
            id="outlined-number"
            label="IDSS"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setIdss(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
          <TextField
            required
            id="outlined-number"
            label="VP"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setVp(parseFloat(parseFloat(e.target.value).toFixed(4)))
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
        <Button type="submit" variant="primary" onClick={calculate}>
          Calculate
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommonDrain;
