import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack'

import './index.css'
import App from './App'

ReactDOM.render(
    <>
        <CssBaseline />
        <BrowserRouter>
            <SnackbarProvider
                maxSnack={10}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </>,
  document.getElementById('root')
)
