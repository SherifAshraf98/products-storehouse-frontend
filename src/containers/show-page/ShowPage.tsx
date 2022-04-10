import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

interface ShowPageProps {
  product: {
    id: number;
    name: string;
    price: number;
  };
  category: {
    id: number;
    name: string;
  };
  open: boolean;
  setOpen: (value: boolean) => void;
  resetForm: () => void;
}

export default function ShowPage(props: ShowPageProps) {
  const { product, category, open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
    props.resetForm();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
    >
      <DialogTitle id="responsive-dialog-title">Order Summary</DialogTitle>
      <DialogContent>
        <Box
          display={"grid"}
          gridTemplateColumns={"1fr"}
          rowGap={1}
          color={"#488FB1"}
        >
          <DialogContentText color={"inherit"}>
            Category: {category?.name}
          </DialogContentText>
          <DialogContentText color={"#inherit"}>
            Product: {product?.name}
          </DialogContentText>
          <DialogContentText color={"inherit"}>
            Price: {product?.price}
          </DialogContentText>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} autoFocus variant={"outlined"}>
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
