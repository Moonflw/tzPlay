import  type{ AppDispatch, RootState } from '../../app/store';

import { setHolding, setPosition } from './manipulatorSlice';
import { addSample, removeSample } from '../grid/gridSlice';

const directionMap = {
  Л: { dx: -1, dy: 0 },
  П: { dx: 1, dy: 0 },
  В: { dx: 0, dy: -1 },
  Н: { dx: 0, dy: 1 },
};

const parseCommands = (input: string): string[] => {
  const result: string[] = [];
  const stack: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const c = input[i];

    if (c === '(') {
      stack.push(c);
    } else if (c === ')') {
      const group: string[] = [];
      while (stack.length && stack[stack.length - 1] !== '(') {
        group.unshift(stack.pop()!);
      }
      stack.pop(); // remove '('
      const repeat = parseInt(stack.pop() ?? '1', 10) || 1;
      for (let r = 0; r < repeat; r++) {
        result.push(...group);
      }
    } else if (/\d/.test(c)) {
      let num = c;
      while (i + 1 < input.length && /\d/.test(input[i + 1])) {
        num += input[++i];
      }
      stack.push(num);
    } else {
      const prev = stack[stack.length - 1];
      if (/\d/.test(prev)) {
        const count = parseInt(stack.pop()!, 10);
        for (let r = 0; r < count; r++) result.push(c);
      } else {
        result.push(c);
      }
    }
  }

  return result;
};

export const executeCommands = async (
  dispatch: AppDispatch,
  getState: () => RootState,
  commands: string
) => {
  const parsed = parseCommands(commands);
  for (const cmd of parsed) {
  const speed = getState().manipulator.speed;
  const { position, holding } = getState().manipulator;
  const samples = getState().grid.samples;

  if (cmd in directionMap) {
    const move = directionMap[cmd as keyof typeof directionMap];
    const newX = Math.max(0, Math.min(4, position.x + move.dx));
    const newY = Math.max(0, Math.min(4, position.y + move.dy));
    dispatch(setPosition({ x: newX, y: newY }));
  } else if (cmd === 'О') {
    const found = samples.find(([sx, sy]) => sx === position.x && sy === position.y);
    if (found && !holding) {
      dispatch(removeSample({ x: position.x, y: position.y }));
      dispatch(setHolding(true));
    }
  } else if (cmd === 'Б') {
    if (holding) {
      dispatch(addSample({ x: position.x, y: position.y }));
      dispatch(setHolding(false));
    }
  }

  await new Promise((res) => setTimeout(res, speed));
}
};
