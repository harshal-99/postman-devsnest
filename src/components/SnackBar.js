import {Alert, Snackbar} from "@mui/material";

import {useState} from "react";


const SnackBar = ({message}) => {
	const [open, setOpen] = useState(true)

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	return (
		<Snackbar
			anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
			open={open}
			onClose={handleClose}
			autoHideDuration={3000}
		>
			<Alert onClose={handleClose} severity="error">{message}</Alert>
		</Snackbar>
	)
}

export default SnackBar
