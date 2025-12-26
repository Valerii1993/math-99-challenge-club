import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { STAGE } from "../App.tsx";

export type TStageProps = {
  setStage: (level: number) => void;
};

const StageStart = ({ setStage }: TStageProps) => {
  const onStartClick = () => setStage(STAGE.PROCESS);

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
