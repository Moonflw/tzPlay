import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

const CELL_SIZE = 60;

export const Grid = () => {
  const rows = useSelector((state: RootState) => state.grid.rows);
const cols = useSelector((state: RootState) => state.grid.cols);
const samples = useSelector((state: RootState) => state.grid.samples);
const manipulatorPos = useSelector((state: RootState) => state.manipulator.position);

  const isSampleAt = (x: number, y: number) => samples.some(([sx, sy]) => sx === x && sy === y);

  const isManipulatorAt = (x: number, y: number) => manipulatorPos.x === x && manipulatorPos.y === y;

  return (
    <Box display="grid" justifyContent={"center"}  gridTemplateColumns={`repeat(${cols}, ${CELL_SIZE}px)`} gap={1}>
      {Array.from({ length: rows * cols }).map((_, i) => {
        const x = i % cols;
        const y = Math.floor(i / cols);
        const hasSample = isSampleAt(x, y);
        const hasManipulator = isManipulatorAt(x, y);

        return (
          <Box
            key={`${x}-${y}`}
            width={CELL_SIZE}
            height={CELL_SIZE}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={hasManipulator ? 'blue' : hasSample ? 'orange' : 'grey.200'}
            border="1px solid #ccc"
            borderRadius={1}
            marginLeft={'auto'}
          >
            {hasManipulator ? '🤖' : hasSample ? '🧪' : ''}
          </Box>
        );
      })}
    </Box>
  );
};
