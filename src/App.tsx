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
    timeSpentMs: number;
  }[];
  totalAnswered: number;
  totalCorrect: number;
  totalMistakes: number;
  timeLeftS: number;
};

export const getDefaultResult = (): TResult => ({
  combinations: [],
  totalAnswered: 0,
  totalCorrect: 0,
  totalMistakes: 0,
  timeLeftS: 0,
});

function App() {
  const [stage, setStage] = useState(Stage.START);
  const [result, setResult] = useState<TResult>(getDefaultResult());
  const [clubType, setClubType] = useState(55);
  const [mainNums, setMainNums] = useState<number[]>([4, 6, 7, 8, 9]);
  const [durationS, setDurationS] = useState(5 * 60);

  return (
    // Forbidding touch actions/scrolling page while interacting with the app
    <Container maxWidth="md" sx={{ touchAction: "none" }}>
      {stage === Stage.START && (
        <StageStart
          setStage={setStage}
          clubType={clubType}
          setClubType={setClubType}
          mainNums={mainNums}
          setMainNums={setMainNums}
          durationS={durationS}
          setDurationS={setDurationS}
        />
      )}
      {stage === Stage.PROCESS && (
        <StageTest
          setStage={setStage}
          setResult={setResult}
          clubType={clubType}
          mainNums={mainNums}
          setMainNums={setMainNums}
          durationS={durationS}
          setDurationS={setDurationS}
        />
      )}
      {stage === Stage.RESULT && (
        <StageResult
          clubType={clubType}
          setStage={setStage}
          setResult={setResult}
          result={result}
          mainNums={mainNums}
          setMainNums={setMainNums}
          durationS={durationS}
          setDurationS={setDurationS}
        />
      )}
    </Container>
  );
}

export default App;
