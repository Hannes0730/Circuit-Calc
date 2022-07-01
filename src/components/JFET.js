import React, { useState } from "react";
import { Button, Container, Grid, ListItem, Typography } from "@mui/material";
import CommonDrain from "./JFET/CommonDrain";
import CommonSource from "./JFET/CommonSource";
import CommonGate from "./JFET/CommonGate";
import SelfBias from "./JFET/SelfBias";
import VoltageDividerFet from "./JFET/VoltageDividerFet";
import FixedBiasFet from "./JFET/FixedBiasFet";

function JFET() {
  const [commonDrainShow, setcommonDrainShow] = useState(false);
  const commonDrainHandleClose = () => setcommonDrainShow(false);
  const commonDrainHandleShow = () => setcommonDrainShow(true);

  const [commonSourceShow, setcommonSourceShow] = useState(false);
  const commonSourceHandleClose = () => setcommonSourceShow(false);
  const commonSourceHandleShow = () => setcommonSourceShow(true);

  const [commonGateShow, setcommonGateShow] = useState(false);
  const commonGateHandleClose = () => setcommonGateShow(false);
  const commonGateHandleShow = () => setcommonGateShow(true);

  const [selfBiasShow, setselfBiasShow] = useState(false);
  const selfBiasHandleClose = () => setselfBiasShow(false);
  const selfBiasHandleShow = () => setselfBiasShow(true);

  const [voltageDividerFetShow, setvoltageDividerFetShow] = useState(false);
  const voltageDividerFetHandleClose = () => setvoltageDividerFetShow(false);
  const voltageDividerFetHandleShow = () => setvoltageDividerFetShow(true);

  const [fixedBiasFetShow, setfixedBiasFetShow] = useState(false);
  const fixedBiasFetHandleClose = () => setfixedBiasFetShow(false);
  const fixedBiasFetHandleShow = () => setfixedBiasFetShow(true);

  return (
    <Grid item container>
      {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6}> */}
      <Typography variant="h5">Junction Field Effect Transistor</Typography>

      {/* JFET 3 */}
      <ListItem sx={{ display: "list-item" }}>
        <Button onClick={commonDrainHandleShow}>Common Drain</Button>
        <CommonDrain
          show={commonDrainShow}
          handleClose={commonDrainHandleClose}
          title={"Common Drain"}
        />
      </ListItem>

      {/* JFET 1 */}
      <ListItem sx={{ display: "list-item" }}>
        <Button onClick={commonSourceHandleShow}>Common Source</Button>
        <CommonSource
          show={commonSourceShow}
          handleClose={commonSourceHandleClose}
          title={"Common Source"}
        />
      </ListItem>

      {/* JFET 4 */}
      <ListItem sx={{ display: "list-item" }}>
        <Button onClick={commonGateHandleShow}>Common Gate</Button>
        <CommonGate
          show={commonGateShow}
          handleClose={commonGateHandleClose}
          title={"Common Gate"}
        />
      </ListItem>

      {/* JFET 5 */}
      <ListItem sx={{ display: "list-item" }}>
        <Button onClick={selfBiasHandleShow}>Self-Bias</Button>
        <SelfBias
          show={selfBiasShow}
          handleClose={selfBiasHandleClose}
          title={"Self-Bias"}
        />
      </ListItem>

      {/* JFET 1 */}
      <ListItem sx={{ display: "list-item" }}>
        <Button onClick={voltageDividerFetHandleShow}>Voltage Divider</Button>
        <VoltageDividerFet
          show={voltageDividerFetShow}
          handleClose={voltageDividerFetHandleClose}
          title={"Voltage Divider"}
        />
      </ListItem>

      {/* JFET 6 */}
      <ListItem sx={{ display: "list-item" }}>
        <Button onClick={fixedBiasFetHandleShow}>Fixed Bias</Button>
        <FixedBiasFet
          show={fixedBiasFetShow}
          handleClose={fixedBiasFetHandleClose}
          title={"Fixed Bias"}
        />
      </ListItem>
      {/* </Grid> */}

      {/* <Grid
        item
        container
        md={6}
        lg={6}
        xl={6}
        sx={{
          justifyContent: "center",
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        <Typography variant="h5">Images</Typography>
      </Grid> 
     */}
    </Grid>
  );
}

export default JFET;
