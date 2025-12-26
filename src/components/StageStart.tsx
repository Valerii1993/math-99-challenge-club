import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { Stage } from "../helpers/Stage.ts";

export type TStageProps = {
  setStage: (level: number) => void;
  clubType: number;
};

type TProps = TStageProps & {
  setClubType: (clubType: number) => void;
};

const getClubTypeColor = (currentType: number, buttonType: number) =>
  currentType === buttonType ? "warning" : "info";

const StageStart = ({ setStage, clubType, setClubType }: TProps) => {
  const onStartClick = () => setStage(Stage.PROCESS);

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

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Ready to start challenge?
            </Typography>

            <Grid container spacing={2} mt={2}>
              {clubTypesJsx}
            </Grid>

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
