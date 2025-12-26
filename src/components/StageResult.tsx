import type { TStageProps } from "./StageStart.tsx";
import { getDefaultResult, STAGE, type TResult } from "../App.tsx";
import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { MAX_QUESTIONS } from "./StageTest.tsx";
import Button from "@mui/material/Button";

type TProps = TStageProps & {
  result: TResult;
  setResult: React.Dispatch<React.SetStateAction<TResult>>;
};

const StageResult = ({ setStage, result, setResult }: TProps) => {
  return (
    <div>
      <div>
        <Button
          variant="contained"
          sx={{ mb: 5 }}
          onClick={() => {
            setResult(getDefaultResult());
            setStage(STAGE.START);
          }}
        >
          Start Again
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">User Answer</TableCell>
            <TableCell align="right">Correct Answer</TableCell>
            <TableCell align="right">Is Correct</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.combinations.map((combinationItem) => (
            <TableRow
              key={`${combinationItem.combination[0]}x${combinationItem.combination[1]}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${combinationItem.combination[0]} x ${combinationItem.combination[1]}`}
              </TableCell>
              <TableCell align="right">{combinationItem.userAnswer}</TableCell>
              <TableCell align="right">
                {combinationItem.correctAnswer}
              </TableCell>
              <TableCell align="right">
                {combinationItem.isCorrect ? (
                  <Check color="success" />
                ) : (
                  <Clear color="error" />
                )}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={2} align="left">
              <Typography color="info">Total questions answered:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="info">{result.totalAnswered}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={2} align="left">
              <Typography color="success">Correctly answered:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="success">{result.totalCorrect}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={2} align="left">
              <Typography color="error">Mistakes:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="error">{result.totalMistakes}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={2} align="left">
              <Typography color="warning">Questions left:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="warning">
                {MAX_QUESTIONS - result.totalAnswered}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default StageResult;
