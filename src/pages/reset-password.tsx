import { useState, useEffect } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/router";
import {
  confirmPasswordReset,
  getAuth,
  verifyPasswordResetCode,
} from "firebase/auth";

const ResetPassword = () => {
  const router = useRouter();
  const { oobCode } = router.query; 
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!oobCode) {
      setError("Invalid reset code");
    } else {
      verifyPasswordResetCode(getAuth(), oobCode as string)
        .then(() => {
        })
        .catch((err) => {
          setError("Invalid or expired reset code");
        });
    }
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      if (oobCode) {
        await confirmPasswordReset(getAuth(), oobCode as string, newPassword); 
        setSuccess("Password successfully reset!");
      }
    } catch (err: any) {
      setError(err.message); 
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Confirm New Password"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Reset Password
        </Button>
      </form>

      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          open={Boolean(success)}
          autoHideDuration={6000}
          onClose={() => setSuccess(null)}
        >
          <Alert severity="success">{success}</Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default ResetPassword;
