import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  onClose,
  onConfirm,
  confirmText = 'Yes',
  cancelText = 'No',
  color = 'info',
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>{cancelText}</Button>
      <Button onClick={onConfirm} color={color} variant="contained">{confirmText}</Button>
    </DialogActions>
  </Dialog>
); 