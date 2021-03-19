import { FunctionComponent, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSnackbar } from 'notistack'

import { getUrl } from '../../functions'
import { useStyles } from '../components/MuiStyles'
import { VistaEstatisticasType } from '../types/serverResponse'
import TableTipoSubstituicaoBody from '../tables/VistaEstatisticas/TableVistaEstatisticasBody'
import TableTipoSubstituicaoHeader from '../tables/VistaEstatisticas/TableVistaEstatisticasHeader'

const VistaEstatisticas: FunctionComponent = () => {
	const classes = useStyles()

	const { enqueueSnackbar } = useSnackbar()

	const [loaded, setLoaded] = useState<boolean>(false)
	const [status, setStatus] = useState(false)
	const [vistaObjetos, setVistaObjetos] = useState<VistaEstatisticasType[]>([])

	useEffect(() => {
		getUrl<VistaEstatisticasType[]>('vista_estatisticas')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setVistaObjetos(res.data.data)
					setLoaded(true)
					setStatus(true)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter a vista.', {
					variant: 'error',
				})
			})
			.finally(() => setLoaded(true))
	}, [enqueueSnackbar])

	return (
		<>
			{
				loaded && !status ? (
					<Box className={classes.contentBoxCenter}>
						<Typography>Ocorreu um erro ao obter os tipos de substituição.</Typography>
					</Box>
				) : (
					loaded && status ? (
						vistaObjetos.length !== 0 ? (
							<Box className={classes.contentBoxTable}>
								<Table>
									<TableTipoSubstituicaoHeader />
									<TableTipoSubstituicaoBody vistaObjetos={vistaObjetos}/>
								</Table>
							</Box>
						) : (
							<Box className={classes.contentBoxCenter}>
								<Typography>Não foram encontrados tipos de substituição.</Typography>
							</Box>
						)
					) : (
						<Box className={classes.contentBoxCenter}>
							<CircularProgress />
						</Box>
					)
				)
			}
		</>
	)
}
export default VistaEstatisticas
