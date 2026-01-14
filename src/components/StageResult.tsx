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
import { Box, Divider, Grid, Paper } from "@mui/material";

type TProps = TStageProps & {
  result: TResult;
  setResult: React.Dispatch<React.SetStateAction<TResult>>;
};

const StageResult = ({ setStage, result, setResult, clubType }: TProps) => {
  const resultsSummary = [
    {
      label: "Total questions answered",
      value: result.totalAnswered,
      color: "info",
    },
    {
      label: "Correctly answered",
      value: result.totalCorrect,
      color: "success",
    },
    {
      label: "Mistakes",
      value: result.totalMistakes,
      color: "error",
    },
    {
      label: "Questions left",
      value: clubType - result.totalAnswered,
      color: "warning",
    },
  ];

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

      <Grid container my={2}>
        <Grid offset={{ md: 6, xs: 0 }} size={{ md: 6, xs: 12 }}>
          <Paper>
            {resultsSummary.map((summaryItem) => (
              <React.Fragment key={summaryItem.label}>
                <Grid container>
                  <Grid size={9}>
                    <Box p={1} textAlign="left">
                      <Typography color={summaryItem.color}>
                        {summaryItem.label}:
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={3}>
                    <Box p={1} textAlign="right">
                      <Typography color={summaryItem.color}>
                        {summaryItem.value}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Divider />
              </React.Fragment>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Question</TableCell>
            <TableCell align="right">User Answer</TableCell>
            <TableCell align="right">Correct Answer</TableCell>
            <TableCell align="right">Time Spent</TableCell>
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
                {(combinationItem.timeSpentMs / 1000).toFixed(1)}s
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
        </TableBody>
      </Table>
    </div>
  );
};

export default StageResult;
