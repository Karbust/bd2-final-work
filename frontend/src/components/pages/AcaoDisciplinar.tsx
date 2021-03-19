import { FunctionComponent, useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSnackbar } from 'notistack'

import { useStyles } from '../components/MuiStyles'
import { backendUrl } from '../../configs'
import TypesServerResponse, { AcaoDisciplinarType } from '../types/serverResponse'
import { getUrl } from '../../functions'
import TableAcaoDisciplinarBody from '../tables/AcaoDisciplinar/TableAcaoDisciplinarBody'
import TableAcaoDisciplinarHeader from '../tables/AcaoDisciplinar/TableAcaoDisciplinarHeader'
import DialogManageDeletes from '../components/dialogManageDeletes'
import FormikAcaoDisciplinar from '../formik/formikAcaoDisciplinar'

const AcaoDisciplinar: FunctionComponent = () => {
	const classes = useStyles()

	const { enqueueSnackbar } = useSnackbar()

	const [loaded, setLoaded] = useState<boolean>(false)
	const [status, setStatus] = useState(false)
	const [acaoDisciplinar, setAcaoDisciplinar] = useState<AcaoDisciplinarType[]>([])

	const [update, setUpdate] = useState(false)
	const [selectedRow, setSelectedRow] = useState<AcaoDisciplinarType | undefined>(undefined)
	const [openAlert, setOpenAlert] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [selectedRowToDelete, setSelectedRowDownloadToDelete] = useState<AcaoDisciplinarType | undefined>(undefined)

	const handleClickClean = () => setSelectedRow(undefined)
	const handleClickEdit = (row: AcaoDisciplinarType | undefined) => setSelectedRow(row)
	const handleClickDelete = (row: AcaoDisciplinarType | undefined) => {
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
			.post<TypesServerResponse>(`${backendUrl()}acao_disciplinar_manage`, selectedRowToDelete, { headers: { 'x-methodoverride': 'DELETE' } })
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
		getUrl<AcaoDisciplinarType[]>('acao_disciplinar')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setAcaoDisciplinar(res.data.data)
					setLoaded(true)
					setStatus(true)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter as ações disciplinares.', {
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
				<FormikAcaoDisciplinar
					row={selectedRow}
					handleClickClean={handleClickClean}
					setUpdate={setUpdate}
				/>
			</Box>
			{
				loaded && !status ? (
					<Box className={classes.contentBoxCenter}>
						<Typography>Ocorreu um erro ao obter as ações disciplinares.</Typography>
					</Box>
				) : (
					loaded && status ? (
						acaoDisciplinar.length !== 0 ? (
							<Box className={classes.contentBoxTable}>
								<Table>
									<TableAcaoDisciplinarHeader />
									<TableAcaoDisciplinarBody
										acaoDisciplinar={acaoDisciplinar}
										handleClickEdit={handleClickEdit}
										handleClickDelete={handleClickDelete}
									/>
								</Table>
							</Box>
						) : (
							<Box className={classes.contentBoxCenter}>
								<Typography>Não foram encontradas ações disciplinares.</Typography>
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
export default AcaoDisciplinar
