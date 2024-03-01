"use client";

import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Switch,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const ProductStock = () => {
  return (
    <Paper sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="stretch" spacing={2} p={2}>
        <Outlet />
        <TextField label="Has more than" />
        <TextField label="Has less than" />
        <FormControl sx={{ width: "100px" }}>
          <InputLabel shrink disableAnimation variant="standard">
            Out of stock
          </InputLabel>
          <Box flex={1} mt="16px" display="flex" alignItems="center">
            <Switch size="small" />
          </Box>
        </FormControl>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Outlet</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Sale</TableCell>
              <TableCell>Avg. Rating</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const Outlet = () => {
  return (
    <Autocomplete
      disablePortal
      options={[
        { label: "Admin", value: 1 },
        { label: "Manager", value: 2 },
      ]}
      renderInput={(params) => (
        <TextField {...params} label="Outlet" variant="standard" InputLabelProps={{ shrink: true }} />
      )}
      sx={{ width: "300px" }}
    />
  );
};

export default ProductStock;
