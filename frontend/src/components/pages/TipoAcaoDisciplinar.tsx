import { FunctionComponent, useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSnackbar } from 'notistack'

import { getUrl } from '../../functions'
import { backendUrl } from '../../configs'
import { useStyles } from '../components/MuiStyles'
import TypesServerResponse, { TipoAcaoDisciplinarType } from '../types/serverResponse'
import TableTipoAcaoDisciplinarBody from '../tables/TipoAcaoDisciplinar/TableTipoAcaoDisciplinarBody'
import TableTipoAcaoDisciplinarHeader from '../tables/TipoAcaoDisciplinar/TableTipoAcaoDisciplinarHeader'
import DialogManageDeletes from '../components/dialogManageDeletes'
import FormikTipoAcaoDisciplinar from '../formik/formikTipoAcaoDisciplinar'

const TipoAcaoDisciplinar: FunctionComponent = () => {
	const classes = useStyles()

	const { enqueueSnackbar } = useSnackbar()

	const [loaded, setLoaded] = useState<boolean>(false)
	const [status, setStatus] = useState(false)
	const [tiposAcaoDisciplinar, setTiposAcaoDisciplinar] = useState<TipoAcaoDisciplinarType[]>([])

	const [update, setUpdate] = useState(false)
	const [selectedRow, setSelectedRow] = useState<TipoAcaoDisciplinarType | undefined>(undefined)
	const [openAlert, setOpenAlert] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [selectedRowToDelete, setSelectedRowDownloadToDelete] = useState<TipoAcaoDisciplinarType | undefined>(undefined)

	const handleClickClean = () => setSelectedRow(undefined)
	const handleClickEdit = (row: TipoAcaoDisciplinarType | undefined) => setSelectedRow(row)
	const handleClickDelete = (row: TipoAcaoDisciplinarType | undefined) => {
		handleClickOpen()
		setSelectedRowDownloadToDelete(row)
	}
	const handleClickOpen = () => setOpenAlert(true)
	const handleExit = () => {
		setOpenAlert(false)
		setSelectedRowDownloadToDelete(undefined)
	}
	const handleClose = () => {
		setIsDeleting(true)
		axios
			.post<TypesServerResponse>(`${backendUrl()}tipo_acao_disciplinar_manage`, selectedRowToDelete, { headers: { 'x-methodoverride': 'DELETE' } })
			.then((res) => {
				if (res.data.success) {
					enqueueSnackbar(res.data.message, {
						variant: 'success',
					})
					setUpdate(true)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao enviar o pedido para o servidor.', {
					variant: 'error',
				})
			})
			.finally(() => {
				setIsDeleting(false)
				setOpenAlert(false)
				setSelectedRowDownloadToDelete(undefined)
			})
	}

	useEffect(() => {
		getUrl<TipoAcaoDisciplinarType[]>('tipo_acao_disciplinar')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setTiposAcaoDisciplinar(res.data.data)
					setLoaded(true)
					setStatus(true)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter os tipos de ação disciplinar.', {
					variant: 'error',
				})
			})
			.finally(() => {
				setLoaded(true)
				setUpdate(false)
			})
	}, [enqueueSnackbar, update])

	return (
		<>
			<DialogManageDeletes
				open={openAlert}
				handleExit={handleExit}
				handleClose={handleClose}
				isDeleting={isDeleting}
			/>
			<Box style={{ marginBottom: '20px' }}>
				<FormikTipoAcaoDisciplinar
					row={selectedRow}
					handleClickClean={handleClickClean}
					setUpdate={setUpdate}
				/>
			</Box>
			{
				loaded && !status ? (
					<Box className={classes.contentBoxCenter}>
						<Typography>Ocorreu um erro ao obter os tipos de ação disciplinar.</Typography>
					</Box>
				) : (
					loaded && status ? (
						tiposAcaoDisciplinar.length !== 0 ? (
							<Box className={classes.contentBoxTable}>
								<Table>
									<TableTipoAcaoDisciplinarHeader />
									<TableTipoAcaoDisciplinarBody
										tipos_acao_disciplinar={tiposAcaoDisciplinar}
										handleClickEdit={handleClickEdit}
										handleClickDelete={handleClickDelete}
									/>
								</Table>
							</Box>
						) : (
							<Box className={classes.contentBoxCenter}>
								<Typography>Não foram encontrados tipos de ação disciplinar.</Typography>
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
export default TipoAcaoDisciplinar
