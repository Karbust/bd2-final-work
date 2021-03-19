import { FunctionComponent, useState } from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import List from '@material-ui/core/List'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import ListItem from '@material-ui/core/ListItem'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import ListItemText from '@material-ui/core/ListItemText'
import { useTheme } from '@material-ui/core/styles'

import { useStyles } from './MuiStyles'
import { removeDiacritics } from '../../functions'

interface Props {
	window?: () => Window
}

const Sidebar: FunctionComponent<Props> = ({ window }) => {
	const classes = useStyles()
	const theme = useTheme()
	const { url } = useRouteMatch()

	const [mobileOpen, setMobileOpen] = useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{
					['Ação Disciplinar', 'Campeonato', 'Época', 'Equipa', 'Equipa Jogador', 'Faixa Etária', 'Género', 'Jogador', 'Jogo', 'Modalidade', 'Participante', 'Pontos', 'Substituição', 'Tipo Ação Disciplinar', 'Tipo Pontuação', 'Tipo Substituição', 'Vista Estatísticas']
						.map((text, index) => (
							<ListItem
								button
								key={index}
								component={NavLink}
								to={`${url}${removeDiacritics(text).split(' ').join('')}`}
								activeStyle={{ color: 'white', backgroundColor: theme.palette.primary.main }}
								exact
							>
								<ListItemText primary={text} />
							</ListItem>
						))
				}
			</List>
		</div>
	)

	const container = window !== undefined ? () => window().document.body : undefined

	return (
		<>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Hidden smUp implementation="css">
						<IconButton
							color="inherit"
							edge="start"
							onClick={handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
					</Hidden>
					<Typography variant="h6" noWrap>
						Responsive drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer}>
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true,
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</>
	)
}
export default Sidebar
