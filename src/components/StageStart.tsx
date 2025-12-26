import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { Stage } from "../helpers/Stage.ts";
import { Stack } from "@mui/material";

export type TStageProps = {
  setStage: (level: number) => void;
  clubType: number;
  mainNums: number[];
  setMainNums: (nums: number[]) => void;
  durationS: number;
  setDurationS: (durationS: number) => void;
};

type TProps = TStageProps & {
  setClubType: (clubType: number) => void;
};

const getClubTypeColor = (currentType: number, buttonType: number) =>
  currentType === buttonType ? "warning" : "info";

const StageStart = ({
  setStage,
  clubType,
  setClubType,
  mainNums,
  setMainNums,
  durationS,
  setDurationS,
}: TProps) => {
  const onStartClick = () => {
    if (mainNums.length < clubType / 11) {
      alert(
        `Please select at least ${
          clubType / 11
        } main numbers for the selected club type of ${clubType}.`
      );
      return;
    }

    setStage(Stage.PROCESS);
  };

  const clubTypesJsx: React.JSX.Element[] = [];
  for (let i = 1; i <= 9; i++) {
    clubTypesJsx.push(
      <Grid key={i} size={4}>
        <Button
          variant="contained"
          color={getClubTypeColor(clubType, i * 11)}
          sx={{ width: "100%", height: 30 }}
          onClick={() => setClubType(i * 11)}
        >
          {i * 11}
        </Button>
      </Grid>
    );
  }

  const practiceNumbersJsx: React.JSX.Element[] = [];
  for (let i = 2; i <= 12; i++) {
    practiceNumbersJsx.push(
      <Button
        key={i}
        variant="contained"
        color={mainNums.includes(i) ? "warning" : "info"}
        onClick={() => {
          if (mainNums.includes(i)) {
            setMainNums(mainNums.filter((num) => num !== i));
          } else {
            setMainNums([...mainNums, i]);
          }
        }}
      >
        {i}
      </Button>
    );
  }

  const timeDurationJsx: React.JSX.Element[] = [];
  for (let i = 1; i <= 5; i++) {
    timeDurationJsx.push(
      <Button
        key={i}
        variant="contained"
        color={durationS === i * 60 ? "warning" : "info"}
        onClick={() => setDurationS(i * 60)}
        sx={{ textTransform: "none" }}
      >
        {i}m
      </Button>
    );
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Ready to start challenge?
            </Typography>

            <Grid container spacing={2} mt={2}>
              {clubTypesJsx}
            </Grid>

            <Card sx={{ mt: 3, p: 2 }}>
              <Typography variant="h5" component="div">
                Main Numbers Practice:
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                justifyContent="center"
              >
                {practiceNumbersJsx}
              </Stack>
            </Card>

            <Card sx={{ mt: 1, pb: 2 }}>
              <Typography variant="h5" component="div">
                Time:
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                justifyContent="center"
              >
                {timeDurationJsx}
              </Stack>
            </Card>

            <Button
              sx={{ mt: 3 }}
              variant="contained"
              size="large"
              onClick={onStartClick}
            >
              Start Challenge
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StageStart;
