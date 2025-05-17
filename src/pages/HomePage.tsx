import { Box, Button, Typography } from '@mui/material';
import { Grid } from '../features/grid/Grid';
import { useDispatch } from 'react-redux';
import { generateSamples, resetManipulator } from '../features/grid/gridSlice';
import { CommandInput } from '../features/commands/CommandInput';
import { HistoryTable } from '../features/history/HistoryTable';
import { SpeedControl } from '../features/manipulator/SpeedControl';

const HomePage = () => {
  const dispatch = useDispatch();

  const handleGenerate = () => {
    dispatch(resetManipulator());
    dispatch(generateSamples(5));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" style={{textAlign: 'center'}} gutterBottom>Управление манипулятором</Typography>
      <Button variant="contained" style={{margin: '0 auto' ,width: 'max-content',display: 'block', marginBottom: 16}} onClick={handleGenerate}>Сгенерировать образцы</Button>

      <Grid  />

      <CommandInput />
      <SpeedControl />
      <HistoryTable />
    </Box>
  );
};

export default HomePage;
