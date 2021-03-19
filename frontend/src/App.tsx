import { FunctionComponent } from 'react'

import { useStyles } from './components/components/MuiStyles'
import Sidebar from './components/components/Sidebar'
import Routes from './components/components/Routes'
import './css/fontawesome/fontawesome.min.css'
import './css/fontawesome/duotone.min.css'

interface Props {
	window?: () => Window
}

const App: FunctionComponent<Props> = ({ window }) => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
            <Sidebar />
            <main className={classes.content}>
                <div className="App">
                    <Routes />
                </div>
            </main>
		</div>
  )
}

export default App
