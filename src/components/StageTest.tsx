import type { TStageProps } from "./StageStart.tsx";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Check from "@mui/icons-material/Check";
import { STAGE, type TResult } from "../App.tsx";

const DURATION_SECONDS = 5 * 60;
// const DURATION_SECONDS = 30;
export const MAX_QUESTIONS = 55;
// export const MAX_QUESTIONS = 5;

const MAIN_NUMS = [4, 6, 7, 8, 9];
const SECOND_NUMS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

type PossibleCombination = [number, number];

const getCalculatedPossibleCombinations = () => {
  const possibleCombinations: PossibleCombination[] = [];

  for (let i = 0; i < MAIN_NUMS.length; i++) {
    for (let j = 0; j < SECOND_NUMS.length; j++) {
      possibleCombinations.push([MAIN_NUMS[i], SECOND_NUMS[j]]);
      possibleCombinations.push([SECOND_NUMS[j], MAIN_NUMS[i]]);
    }
  }

  return possibleCombinations;
};

const getRandomCombinationIndex = (
  possibleCombinations: PossibleCombination[]
) => Math.floor(Math.random() * possibleCombinations.length);

type TProps = TStageProps & {
  setResult: React.Dispatch<React.SetStateAction<TResult>>;
};

const StageTest = ({ setStage, setResult }: TProps) => {
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(DURATION_SECONDS); // in seconds
  const [possibleCombinations, setPossibleCombinations] = useState(
    getCalculatedPossibleCombinations()
  );
  const [combinationIndex, setCombinationIndex] = useState(
    getRandomCombinationIndex(possibleCombinations)
  );
  const [answerStr, setAnswerStr] = useState("");
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const durationMs = DURATION_SECONDS * 1000; // 5 minutes in milliseconds
  const minsLeft = Math.floor(timeLeft / 60);
  const secsLeft = timeLeft % 60;
  const isSubmitDisabled = answerStr.length === 0;

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedMs = Date.now() - startTime;

      // If time is still left, update the time left
      if (elapsedMs < durationMs) {
        setTimeLeft(DURATION_SECONDS - Math.floor(elapsedMs / 1000));
      } else {
        // Time's up
        clearInterval(interval);
        setStage(STAGE.RESULT);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [durationMs, setStage, startTime]);

  const onNumberClick = (numStr: string) => {
    setAnswerStr((prevAnswer) => {
      if (prevAnswer.length >= 3) return prevAnswer;

      // 0 cannot be the first digit
      if (numStr === "0" && prevAnswer.length === 0) return prevAnswer;

      return prevAnswer + numStr;
    });
  };

  const submitAnswer = () => {
    const answerNumber = parseInt(answerStr);
    const combination = possibleCombinations[combinationIndex];
    const correctAnswer = combination[0] * combination[1];
    const isCorrect = answerNumber === correctAnswer;

    setResult((prevResult) => {
      return {
        combinations: [
          ...prevResult.combinations,
          {
            combination,
            userAnswer: answerNumber,
            correctAnswer: correctAnswer,
            isCorrect: isCorrect,
          },
        ],
        totalAnswered: prevResult.totalAnswered + 1,
        totalCorrect: prevResult.totalCorrect + (isCorrect ? 1 : 0),
        totalMistakes: prevResult.totalMistakes + (!isCorrect ? 1 : 0),
      };
    });
    setAnswerStr("");
    setCurrentQuestionNumber((prevNumber) => prevNumber + 1);

    possibleCombinations.splice(combinationIndex, 1);
    setPossibleCombinations(possibleCombinations);
    setCombinationIndex(getRandomCombinationIndex(possibleCombinations));

    if (currentQuestionNumber === MAX_QUESTIONS) {
      setStage(STAGE.RESULT);
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      {/* Time left */}
      <Grid>
        <Card sx={{ py: 2 }}>
          <Typography component="div">
            Time left: {minsLeft}m {secsLeft}s
          </Typography>
        </Card>
      </Grid>

      {/* Current Question */}
      <Grid container direction="row">
        {/* Question Number */}
        <Grid size={1} justifyContent="center" alignItems="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // vertical center
              justifyContent: "center", // horizontal center (optional)
              height: "100%",
              fontSize: 24,
            }}
          >
            {currentQuestionNumber}:
          </Box>
        </Grid>

        {/* Question */}
        <Grid size={8}>
          <Card sx={{ minWidth: "100%" }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", fontSize: 26 }}
              >
                {possibleCombinations[combinationIndex][0]} x{" "}
                {possibleCombinations[combinationIndex][1]} ={" "}
                {answerStr || "..."}
              </Typography>
            </CardContent>
            {/* <CardActions> */}
            {/*   <Button size="small">Learn More</Button> */}
            {/* </CardActions> */}
          </Card>
        </Grid>

        {/* Submit */}
        <Grid size={3}>
          <Button
            disabled={isSubmitDisabled}
            variant="contained"
            sx={{ height: "100%", width: "100%" }}
            color="success"
            onClick={submitAnswer}
          >
            <Check fontSize="large" />
          </Button>
        </Grid>
      </Grid>

      {/* Number Buttons */}
      <Grid container direction="row">
        <Grid container direction="row" size={12}>
          <Grid size={4}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: 24 }}
              onClick={() => onNumberClick("1")}
            >
              1
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: 24 }}
              onClick={() => onNumberClick("2")}
            >
              2
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: 24 }}
              onClick={() => onNumberClick("3")}
            >
              3
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" size={12}>
          <Grid size={4}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: 24 }}
              onClick={() => onNumberClick("4")}
            >
              4
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: 24 }}
              onClick={() => onNumberClick("5")}
            >
              5
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: 24 }}
              onClick={() => onNumberClick("6")}
            >
              6
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" size={12}>
          <Grid size={4}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: 24 }}
              onClick={() => onNumberClick("7")}
            >
              7
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: 24 }}
              onClick={() => onNumberClick("8")}
            >
              8
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: 24 }}
              onClick={() => onNumberClick("9")}
            >
              9
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" size={12}>
          <Grid size={4}></Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: 24 }}
              onClick={() => onNumberClick("0")}
            >
              0
            </Button>
          </Grid>

          <Grid size={4}>
            <Button
              variant="contained"
              color="inherit"
              size="large"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: 24, height: "100%" }}
              onClick={() =>
                setAnswerStr((prevAnswer) => {
                  if (prevAnswer.length === 0) return prevAnswer;

                  return prevAnswer.slice(0, -1);
                })
              }
            >
              <BackspaceIcon fontSize="large" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StageTest;
