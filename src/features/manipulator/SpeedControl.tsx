import { Box, Slider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { setSpeed } from './manipulatorSlice';

export const SpeedControl = () => {
  const dispatch = useDispatch();
  const speed = useSelector((state: RootState) => state.manipulator.speed);

  const handleChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      dispatch(setSpeed(value));
    }
  };

  return (
    <Box mt={4}>
      <Typography gutterBottom>Скорость анимации (мс)</Typography>
      <Slider
        value={speed}
        min={100}
        max={2000}
        step={100}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};
