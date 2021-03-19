import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const drawerWidth = 240

const breakpoints = createBreakpoints({})

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		drawer: {
			[breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0,
			},
		},
		appBar: {
			[breakpoints.up('sm')]: {
				width: `calc(100% - ${drawerWidth}px) !important`,
				marginLeft: drawerWidth,
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[breakpoints.up('sm')]: {
				display: 'none',
			},
		},
		toolbar: theme.mixins.toolbar,
		drawerPaper: {
			width: drawerWidth,
		},
		content: {
			flexGrow: 1,
			padding: '64px 30px',
		},
		contentBox: {
			margin: '25px 40px',
			display: 'flex',
			justifyContent: 'space-between',
			paddingBottom: '30px',
		},
		contentBoxCenter: {
			right: '0',
			left: '0',
			width: '100%',
			textAlign: 'center'
		},
		contentBoxTable: {
			width: '100%',
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'center',
		},
		popover: {
			pointerEvents: 'none'
		},
		paper: {
			padding: theme.spacing(1),
		},
		textField: {
			marginBottom: theme.spacing(2),
			marginTop: theme.spacing(0),
		},
	}),
)
