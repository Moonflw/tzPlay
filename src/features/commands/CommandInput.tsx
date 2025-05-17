import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { addHistoryItem } from "../history/historySlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { executeCommands } from "../manipulator/executeCommands";
import { useStore } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
type FormValues = {
  commands: string;
};

export const optimizeCommands = (input: string): string => {
  if (!input) return "";

  const isCompressible = (c: string) => ["Л", "П", "В", "Н"].includes(c);

  let result = "";
  let i = 0;

  while (i < input.length) {
    const char = input[i];
    if (isCompressible(char)) {
      let count = 1;
      while (i + 1 < input.length && input[i + 1] === char) {
        count++;
        i++;
      }
      result += `${count}${char}`;
    } else {
      result += char;
    }
    i++;
  }

  const pattern = /(\d+[ЛПВН]){2,}/g;
  result = result.replace(pattern, (match) => {
    const inner = match.match(/\d+[ЛПВН]/g)?.join("") ?? match;
    return `(${inner})`;
  });

  return result;
};

export const CommandInput = () => {
  const { control, handleSubmit, reset } = useForm<FormValues>();
  const [optimized, setOptimized] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const samplesBefore = useSelector((state: RootState) => state.grid.samples);
  const store = useStore<RootState>();

  const onSubmit = async (data: FormValues) => {
    const trimmed = data.commands.replace(/\s/g, "").toUpperCase();
    const optimized = optimizeCommands(trimmed);
    setOptimized(optimized);

    const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
    // const samplesBefore = useSelector((state: RootState) => state.grid.samples);

    dispatch(
      addHistoryItem({
        original: trimmed,
        optimized,
        timestamp,
        samplesBefore,
        samplesAfter: samplesBefore,
      })
    );

    await executeCommands(dispatch, store.getState, optimized);
    setSnackbarOpen(true);
    reset();
  };
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Ввод команд
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="commands"
          control={control}
          defaultValue=""
          rules={{
            pattern: {
              value: /^[ЛПВНОБ]+$/i,
              message: "Допустимы только ЛПВНОБ",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="Команды (например: ЛЛЛВВОБ)"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Оптимизировать
        </Button>
      </form>

      {optimized && (
        <Box mt={2}>
          <Typography>
            Оптимизировано: <strong>{optimized}</strong>
          </Typography>
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Команды успешно выполнены!
        </Alert>
      </Snackbar>
    </Box>
  );
};
