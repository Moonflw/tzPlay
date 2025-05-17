import { Box, Slider, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { setSpeed } from './manipulatorSlice';

const GRID_SIZE = 5;

export const ManipulatorGrid = () => {
  const dispatch = useDispatch();
  const { x, y } = useSelector((state: RootState) => state.manipulator.position);
  const samples = useSelector((state: RootState) => state.grid.samples);
  const speed = useSelector((state: RootState) => state.manipulator.speed);

  const handleSpeedChange = (_: Event, value: number | number[]) => {
    dispatch(setSpeed(typeof value === 'number' ? value : value[0]));
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>Сетка с манипулятором</Typography>

      <Box
        display="grid"
        gridTemplateColumns={`repeat(${GRID_SIZE}, 40px)`}
        gridTemplateRows={`repeat(${GRID_SIZE}, 40px)`}
        gap={1}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const cx = index % GRID_SIZE;
          const cy = Math.floor(index / GRID_SIZE);
          const hasSample = samples.some(([sx, sy]) => sx === cx && sy === cy);
          const isManipulator = x === cx && y === cy;

          return (
            <Box
              key={index}
              width={40}
              height={40}
              bgcolor={isManipulator ? 'blue' : hasSample ? 'red' : 'grey.300'}
              border="1px solid black"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={12}
              color="white"
            >
              {isManipulator ? '🤖' : hasSample ? '🔴' : ''}
            </Box>
          );
        })}
      </Box>

      <Box mt={2}>
        <Typography gutterBottom>Скорость (мс на шаг): {speed}</Typography>
        <Slider
          value={speed}
          onChange={handleSpeedChange}
          min={100}
          max={2000}
          step={100}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
};
