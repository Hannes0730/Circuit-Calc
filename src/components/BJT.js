import { Container, ListItem, Typography, Grid, Button } from "@mui/material";
import React, { useState } from "react";
import CollectorFeedback from "./BJT/CollectorFeedback";
import EmitterFollower from "./BJT/EmitterFollower";
import FixedBias from "./BJT/FixedBias";
import SelfBiasEmitter from "./BJT/SelfBiasEmitter";
import VoltageDivider from "./BJT/VoltageDivider";
import Bypass from "./BJT/Bypass";
import CommonCollector from "./BJT/CommonCollector";
import CommonBase from "./BJT/CommonBase";

function BJT() {
  const [collectorFeedbackShow, setcollectorFeedbackShow] = useState(false);
  const collectorFeedbackHandleClose = () => setcollectorFeedbackShow(false);
  const collectorFeedbackHandleShow = () => setcollectorFeedbackShow(true);

  const [emitterFollowerShow, setemitterFollowerShow] = useState(false);
  const emitterFollowerHandleClose = () => setemitterFollowerShow(false);
  const emitterFollowerHandleShow = () => setemitterFollowerShow(true);

  const [fixedBiasShow, setfixedBiasShow] = useState(false);
  const fixedBiasHandleClose = () => setfixedBiasShow(false);
  const fixedBiasHandleShow = () => setfixedBiasShow(true);

  const [selfBiasShow, setselfBiasShow] = useState(false);
  const selfBiasShowHandleClose = () => setselfBiasShow(false);
  const selfBiasShowHandleShow = () => setselfBiasShow(true);

  const [voltageDividerShow, setvoltageDividerShow] = useState(false);
  const voltageDividerHandleClose = () => setvoltageDividerShow(false);
  const voltageDividerHandleShow = () => setvoltageDividerShow(true);

  const [bypassShow, setbypassShow] = useState(false);
  const bypassHandleClose = () => setbypassShow(false);
  const bypassHandleShow = () => setbypassShow(true);

  const [cCollectorShow, setcCollector] = useState(false);
  const cCollectorHandleClose = () => setcCollector(false);
  const cCollectorHandleShow = () => setcCollector(true);

  const [cBaseShow, setcBase] = useState(false);
  const cBaseHandleClose = () => setcBase(false);
  const cBaseHandleShow = () => setcBase(true);

  return (
    <>
      <Grid item container>
        {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6}> */}
        <Typography variant="h5">Bipolar Junction Transistor</Typography>

        <ListItem sx={{ display: "list-item" }}>
          <Button onClick={collectorFeedbackHandleShow}>
            Collector Feedback
          </Button>
          <CollectorFeedback
            show={collectorFeedbackShow}
            handleClose={collectorFeedbackHandleClose}
            title={"Collector Feedback"}
          />
        </ListItem>

        <ListItem sx={{ display: "list-item" }}>
          <Button onClick={emitterFollowerHandleShow}>Emitter Follower</Button>
          <EmitterFollower
            show={emitterFollowerShow}
            handleClose={emitterFollowerHandleClose}
            title={"Emitter Follower"}
          />
        </ListItem>

        <ListItem sx={{ display: "list-item" }}>
          <Button onClick={fixedBiasHandleShow}>Fixed Bias</Button>
          <FixedBias
            show={fixedBiasShow}
            handleClose={fixedBiasHandleClose}
            title={"Fixed Bias"}
          />
        </ListItem>

        <ListItem sx={{ display: "list-item" }}>
          <Button onClick={selfBiasShowHandleShow}>
            Self-Bias or Voltage Divider Bias
          </Button>
          <SelfBiasEmitter
            show={selfBiasShow}
            handleClose={selfBiasShowHandleClose}
            title={"Self-Bias or Voltage Divider Bias"}
          />
        </ListItem>

        <ListItem sx={{ display: "list-item" }}>
          <Button onClick={voltageDividerHandleShow}>Voltage Divider</Button>
          <VoltageDivider
            show={voltageDividerShow}
            handleClose={voltageDividerHandleClose}
            title={"Voltage Divider"}
          />
        </ListItem>

        <ListItem sx={{ display: "list-item" }}>
          <Button onClick={bypassHandleShow}>
            Common Emitter with and without Bypass Capacitor
          </Button>
          <Bypass
            show={bypassShow}
            handleClose={bypassHandleClose}
            title={"Common Emitter with and without Bypass Capacitor"}
          />
        </ListItem>

        <ListItem sx={{ display: "list-item" }}>
          <Button onClick={cCollectorHandleShow}>Common Collector</Button>
          <CommonCollector
            show={cCollectorShow}
            handleClose={cCollectorHandleClose}
            title={"Common Collector"}
          />
        </ListItem>

        <ListItem sx={{ display: "list-item" }}>
          <Button onClick={cBaseHandleShow}>Common Base</Button>
          <CommonBase
            show={cBaseShow}
            handleClose={cBaseHandleClose}
            title={"Common Base"}
          />
        </ListItem>
        {/* </Grid> */}
      </Grid>
    </>
  );
}

export default BJT;
