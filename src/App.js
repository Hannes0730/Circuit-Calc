import Nav_Bar from "./components/Nav_Bar";
import BJT from "./components/BJT";
import { Container, Divider } from "@mui/material";
import JFET from "./components/JFET";
import "./App.css";

function App() {
  return (
    <>
      <Nav_Bar />
      <Container
        sx={{
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <BJT />
        <Divider sx={{ marginTop: "50px", marginBottom: "50px" }} />
        <JFET />
      </Container>
    </>
  );
}

export default App;
