import { useEffect, useState } from "react";
import "./MatrixCode.scss";

const DEFAULT_COLUMNS = 100;
const CHARACTERS = 50;

function getCharCode() {
  let code = Math.floor(Math.random() * 94 + 33);
  return code === 64 ? 47 : code;
}

function getCharCodes() {
  return Array.from(new Array(CHARACTERS), () =>
    String.fromCharCode(getCharCode())
  );
}

function createCharCodes(column) {
  let codes = getCharCodes();
  let size = Math.floor(Math.random() * 13);

  if (size < 10) size = 25;
  else if (size < 12) size = 12;
  else size = 60;

  setCharCodes(column, codes, size);
  return size;
}

function setCharCodes(column, codes, size) {
  codes.forEach((code, index) => {
    let char = document.createElement("span");
    char.className = `char-${index} code-size-${size}`;
    char.textContent = code;
    column.appendChild(char);
  });
}

function createRain(container, columns) {
  container.innerHTML = ""; // Clear previous rain
  for (let i = 0; i < columns; i++) {
    let column = document.createElement("p");
    let size = createCharCodes(column);
    column.className = `code-column column-size-${size} code-${i}`;
    container.appendChild(column);
  }
}

const MatrixCode = () => {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);

  useEffect(() => {
    const handleResize = () => {
      let newColumns;

      if (window.innerWidth <= 575) {
        newColumns = Math.floor(DEFAULT_COLUMNS / 4);
      } else if (window.innerWidth <= 1440) {
        newColumns = Math.floor(DEFAULT_COLUMNS / 2);
      } else {
        newColumns = DEFAULT_COLUMNS;
      }
      setColumns(newColumns);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set on mount

    const container = document.getElementById("matrix-code");
    createRain(container, columns);

    return () => window.removeEventListener("resize", handleResize);
  }, [columns]);

  return (
    <div className="matrix-bg-animation opacity-30 fixed top-0 left-0">
      <div className="code-container">
        <div id="matrix-code" className="flex justify-between"></div>
      </div>
    </div>
  );
};

export default MatrixCode;
