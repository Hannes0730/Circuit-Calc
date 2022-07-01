import {
  FormControl,
  TextField,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import fixed_bias_fet from "../../images/JFET/fixed_bias_fet.png";

function FixedBiasFet({ show, handleClose, title }) {
  const initialState1 = {
    vgs: 0,
    idq: 0,
    vds: 0,
    vd: 0,
    vg: 0,
    vs: 0,
    gmo: 0,
    gm: 0,
    av: 0,
  };

  const [vdd, setVdd] = useState(0.0);
  const [rd, setRd] = useState(0.0);
  const [vgg, setVgg] = useState(0.0);
  const [idss, setIdss] = useState(0.0);
  const [vp, setVp] = useState(0.0);
  const [answer, setAnswer] = useState(initialState1);

  const calculate = (e) => {
    e.preventDefault();

    const vgs = vgg;
    const Idq = idss * (1 - vgs / vp) ** 2;
    const vds = vdd - Idq * rd;
    const vd = vds;
    const vg = vgs;
    const vs = 0;
    const gmo = (2 * idss) / -vp;
    const gm = gmo * (1 - vgs / vp);
    const av = -gm * rd;

    setAnswer({
      vgs: vgs,
      idq: Idq,
      vds: vds,
      vd: vd,
      vg: vg,
      vs: vs,
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
        <div className="text-center">
          <img src={fixed_bias_fet} className="img-fluid shadow-4" alt="..." />
        </div>
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
            label="RD"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setRd(parseFloat(parseFloat(e.target.value).toFixed(4)))
            }
          />
          <TextField
            required
            id="outlined-number"
            label="VGG"
            type="number"
            margin="normal"
            defaultValue={0}
            onChange={(e) =>
              setVgg(parseFloat(parseFloat(e.target.value).toFixed(4)))
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

export default FixedBiasFet;
