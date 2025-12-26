import type { TStageProps } from "./StageStart.tsx";
import { getDefaultResult, type TResult } from "../App.tsx";
import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Button from "@mui/material/Button";
import { Stage } from "../helpers/Stage.ts";
import Alert from "@mui/material/Alert";
import Mood from "@mui/icons-material/Mood";
import { Grade } from "@mui/icons-material";
import { yellow } from "@mui/material/colors";

type TProps = TStageProps & {
  result: TResult;
  setResult: React.Dispatch<React.SetStateAction<TResult>>;
};

const StageResult = ({ setStage, result, setResult, clubType }: TProps) => {
  return (
    <div>
      <div>
        <Button
          variant="contained"
          sx={{ mb: 5 }}
          onClick={() => {
            setResult(getDefaultResult());
            setStage(Stage.START);
          }}
        >
          Start Again
        </Button>
      </div>

      {clubType === result.totalCorrect && (
        <Alert
          variant="filled"
          severity="success"
          sx={{
            mb: 2,
            alignItems: "center",
            "& .MuiAlert-icon": { alignItems: "center", py: 0 }, // remove extra vertical padding
            "& .MuiAlert-message": {
              display: "flex",
              alignItems: "center",
              py: 0,
            },
            color: yellow[400],
            fontWeight: "bold",
            fontSize: 24,
            justifyContent: "center",
          }}
          icon={false}
        >
          <Mood sx={{ color: yellow[400], display: "inline-block" }} />
          <Grade sx={{ color: yellow[400] }} />
          YOU DID IT!!!
          <Grade sx={{ color: yellow[400] }} />
          <Mood sx={{ color: yellow[400] }} />
        </Alert>
      )}

      <Alert
        variant="filled"
        severity={result.timeLeftS > 0 ? "success" : "warning"}
      >
        Time Left: {Math.floor(result.timeLeftS / 60)}m {result.timeLeftS % 60}s
      </Alert>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Question</TableCell>
            <TableCell align="right">User Answer</TableCell>
            <TableCell align="right">Correct Answer</TableCell>
            <TableCell align="right">Is Correct</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.combinations.map((combinationItem, index) => (
            <TableRow
              key={`${combinationItem.combination[0]}x${combinationItem.combination[1]}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{index + 1}</TableCell>
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
            <TableCell colSpan={2}></TableCell>
            <TableCell colSpan={2} align="left">
              <Typography color="info">Total questions answered:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="info">{result.totalAnswered}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell colSpan={2} align="left">
              <Typography color="success">Correctly answered:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="success">{result.totalCorrect}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell colSpan={2} align="left">
              <Typography color="error">Mistakes:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="error">{result.totalMistakes}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell colSpan={2} align="left">
              <Typography color="warning">Questions left:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="warning">
                {clubType - result.totalAnswered}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default StageResult;
