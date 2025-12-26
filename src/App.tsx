import "./App.css";
import Container from "@mui/material/Container";
import { useState } from "react";
import StageStart from "./components/StageStart.tsx";
import StageTest from "./components/StageTest.tsx";
import StageResult from "./components/StageResult.tsx";
import { Stage } from "./helpers/Stage.ts";

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
  const [stage, setStage] = useState(Stage.START);
  const [result, setResult] = useState<TResult>(getDefaultResult());
  const [clubType, setClubType] = useState(55);

  return (
    <Container maxWidth="sm">
      {stage === Stage.START && (
        <StageStart
          setStage={setStage}
          clubType={clubType}
          setClubType={setClubType}
        />
      )}
      {stage === Stage.PROCESS && (
        <StageTest
          setStage={setStage}
          setResult={setResult}
          clubType={clubType}
        />
      )}
      {stage === Stage.RESULT && (
        <StageResult
          clubType={clubType}
          setStage={setStage}
          setResult={setResult}
          result={result}
        />
      )}
    </Container>
  );
}

export default App;
