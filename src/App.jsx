import React, { useState } from "react";
import "./App.css";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [lastInput, setLastInput] = useState("");

  const isOperator = (char) => /[+\-*/]/.test(char);

  const handleInput = (value) => {
    if (value === "clear") {
      setDisplay("0");
      setExpression("");
      setLastInput("");
    } else if (value === "=") {
      try {
        let result = eval(expression.replace(/--/g, "+"));
        result = Math.round(result * 10000) / 10000;
        setDisplay(result.toString());
        setExpression(result.toString());
        setLastInput("=");
      } catch {
        setDisplay("Error");
      }
    } else {
      let newDisplay = display;
      let newExpression = expression;

      if (lastInput === "=") {
        newExpression = isOperator(value) ? display : "";
        newDisplay = isOperator(value) ? display : "0";
      }

      if (value === ".") {
        if (!newDisplay.includes(".")) {
          newDisplay += value;
          newExpression += value;
        }
      } else if (isOperator(value)) {
        if (value === "-" && (lastInput === "" || isOperator(lastInput))) {
          newExpression += value;
        } else {
          newExpression = newExpression.replace(/[+\-*/]+$/, "") + value;
        }
        newDisplay = value;
      } else {
        // number
        if (newDisplay === "0" || isOperator(lastInput)) {
          newDisplay = value;
        } else {
          newDisplay += value;
        }
        newExpression += value;
      }

      setDisplay(newDisplay);
      setExpression(newExpression);
      setLastInput(value);
    }
  };

  const buttons = [
    "clear",
    "/",
    "*",
    "7",
    "8",
    "9",
    "-",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "=",
    "0",
    ".",
  ];

  return (
    <>
      <div className="calculator">
        <div id="display">{display}</div>
        {buttons.map((btn) => (
          <button
            key={btn}
            id={
              btn === "clear"
                ? "clear"
                : btn === "="
                ? "equals"
                : btn === "0"
                ? "zero"
                : btn === "1"
                ? "one"
                : btn === "2"
                ? "two"
                : btn === "3"
                ? "three"
                : btn === "4"
                ? "four"
                : btn === "5"
                ? "five"
                : btn === "6"
                ? "six"
                : btn === "7"
                ? "seven"
                : btn === "8"
                ? "eight"
                : btn === "9"
                ? "nine"
                : btn === "+"
                ? "add"
                : btn === "-"
                ? "subtract"
                : btn === "*"
                ? "multiply"
                : btn === "/"
                ? "divide"
                : btn === "."
                ? "decimal"
                : ""
            }
            onClick={() => handleInput(btn)}
          >
            {btn === "*" ? "×" : btn === "clear" ? "AC" : btn}
          </button>
        ))}
      </div>
      <p className="myName">Made by ❤️ Yash Junagade</p>
    </>
  );
};

export default Calculator;
