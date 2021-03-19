import { FunctionComponent } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

interface Props {
    open: any,
    handleExit: any,
    handleClose: any,
    isDeleting: any
}

const DialogManageDeletes: FunctionComponent<Props> = ({ open, handleExit, handleClose, isDeleting }) => {
    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                Confirmação
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    É mesmo para apagar?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleExit}
                    color="primary"
                    disabled={isDeleting}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleClose}
                    color="primary"
                    disabled={isDeleting}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogManageDeletes
