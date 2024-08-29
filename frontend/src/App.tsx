import React, { useState } from 'react';
import { Button, Container, Grid, Paper, TextField, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from 'declarations/backend';

const CalculatorButton = styled(Button)(({ theme }) => ({
  fontSize: '1.25rem',
  padding: theme.spacing(2),
}));

const Display = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    fontSize: '2rem',
    textAlign: 'right',
  },
}));

const App: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNumberClick = (num: string) => {
    setDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperationClick = (op: string) => {
    setFirstOperand(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperation(null);
  };

  const handleEquals = async () => {
    if (firstOperand !== null && operation) {
      setLoading(true);
      try {
        const result = await backend.calculate(operation, firstOperand, parseFloat(display));
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      } finally {
        setLoading(false);
      }
      setFirstOperand(null);
      setOperation(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Display
              fullWidth
              variant="outlined"
              value={display}
              InputProps={{
                readOnly: true,
                endAdornment: loading && <CircularProgress size={20} />,
              }}
            />
          </Grid>
          {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map((num) => (
            <Grid item xs={3} key={num}>
              <CalculatorButton
                fullWidth
                variant="contained"
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </CalculatorButton>
            </Grid>
          ))}
          <Grid item xs={3}>
            <CalculatorButton
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => handleOperationClick('add')}
            >
              +
            </CalculatorButton>
          </Grid>
          <Grid item xs={3}>
            <CalculatorButton
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => handleOperationClick('subtract')}
            >
              -
            </CalculatorButton>
          </Grid>
          <Grid item xs={3}>
            <CalculatorButton
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => handleOperationClick('multiply')}
            >
              ×
            </CalculatorButton>
          </Grid>
          <Grid item xs={3}>
            <CalculatorButton
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => handleOperationClick('divide')}
            >
              ÷
            </CalculatorButton>
          </Grid>
          <Grid item xs={6}>
            <CalculatorButton
              fullWidth
              variant="contained"
              color="error"
              onClick={handleClear}
            >
              C
            </CalculatorButton>
          </Grid>
          <Grid item xs={6}>
            <CalculatorButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleEquals}
            >
              =
            </CalculatorButton>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;