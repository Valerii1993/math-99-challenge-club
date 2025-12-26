import "./App.css";
import Container from "@mui/material/Container";
import { useState } from "react";
import StageStart from "./components/StageStart.tsx";
import StageTest from "./components/StageTest.tsx";
import StageResult from "./components/StageResult.tsx";

export const STAGE = {
  START: 1,
  PROCESS: 2,
  RESULT: 3,
};

export type TResult = {
  combinations: {
    combination: [number, number];
    userAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
  }[];
  totalAnswered: number;
  totalCorrect: number;
  totalMistakes: number;
};

export const getDefaultResult = (): TResult => ({
  combinations: [],
  totalAnswered: 0,
  totalCorrect: 0,
  totalMistakes: 0,
});

function App() {
  const [stage, setStage] = useState(STAGE.START);
  const [result, setResult] = useState<TResult>(getDefaultResult());

  return (
    <Container maxWidth="sm">
      {stage === STAGE.START && <StageStart setStage={setStage} />}
      {stage === STAGE.PROCESS && (
        <StageTest setStage={setStage} setResult={setResult} />
      )}
      {stage === STAGE.RESULT && (
        <StageResult
          setStage={setStage}
          setResult={setResult}
          result={result}
        />
      )}
    </Container>
  );
}

export default App;
