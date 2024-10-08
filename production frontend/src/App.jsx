import Footer from "./components/global/Footer";
import Header from "./components/global/Header";
import MatrixCode from "./matrix/MatrixCode";
import Mint from "./pages/Mint";

function App() {
  return (
    <>
      <div className="relative z-10">
        <Header />
        <Mint />
        <Footer />
      </div>

      <MatrixCode />
    </>
  );
}

export default App;
