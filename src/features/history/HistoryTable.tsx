import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

export const HistoryTable = () => {
  const items = useSelector((state: RootState) => state.history.items);

  if (items.length === 0) return <Typography mt={4}>История пуста</Typography>;

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>История выполненных команд</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата/время</TableCell>
              <TableCell>Исходная</TableCell>
              <TableCell>Оптимизированная</TableCell>
              <TableCell>До</TableCell>
              <TableCell>После</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.timestamp}</TableCell>
                <TableCell>{item.original}</TableCell>
                <TableCell>{item.optimized}</TableCell>
                <TableCell>
                  {item.samplesBefore.map(([x, y]) => `[${x},${y}]`).join(', ')}
                </TableCell>
                <TableCell>
                  {item.samplesAfter.map(([x, y]) => `[${x},${y}]`).join(', ')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};
