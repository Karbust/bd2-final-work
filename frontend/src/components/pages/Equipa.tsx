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
import TypesServerResponse, { EquipaType } from '../types/serverResponse'
import TableEquipaBody from '../tables/Equipa/TableEquipaBody'
import TableEquipaHeader from '../tables/Equipa/TableEquipaHeader'
import DialogManageDeletes from '../components/dialogManageDeletes'
import FormikEquipa from '../formik/formikEquipa'

const Equipa: FunctionComponent = () => {
	const classes = useStyles()

	const { enqueueSnackbar } = useSnackbar()

	const [loaded, setLoaded] = useState<boolean>(false)
	const [status, setStatus] = useState(false)
	const [equipas, setEquipas] = useState<EquipaType[]>([])

	const [update, setUpdate] = useState(false)
	const [selectedRow, setSelectedRow] = useState<EquipaType | undefined>(undefined)
	const [openAlert, setOpenAlert] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [selectedRowToDelete, setSelectedRowDownloadToDelete] = useState<EquipaType | undefined>(undefined)

	const handleClickClean = () => setSelectedRow(undefined)
	const handleClickEdit = (row: EquipaType | undefined) => setSelectedRow(row)
	const handleClickDelete = (row: EquipaType | undefined) => {
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
			.post<TypesServerResponse>(`${backendUrl()}equipa_manage`, selectedRowToDelete, { headers: { 'x-methodoverride': 'DELETE' } })
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
		getUrl<EquipaType[]>('equipa')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setEquipas(res.data.data)
					setLoaded(true)
					setStatus(true)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter as equipas.', {
					variant: 'error',
				})
			})
			.finally(() => setLoaded(true))
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
				<FormikEquipa
					row={selectedRow}
					handleClickClean={handleClickClean}
					setUpdate={setUpdate}
				/>
			</Box>
			{
				loaded && !status ? (
					<Box className={classes.contentBoxCenter}>
						<Typography>Ocorreu um erro ao obter as equipas.</Typography>
					</Box>
				) : (
					loaded && status ? (
						equipas.length !== 0 ? (
							<Box className={classes.contentBoxTable}>
								<Table>
									<TableEquipaHeader />
									<TableEquipaBody
										equipas={equipas}
										handleClickEdit={handleClickEdit}
										handleClickDelete={handleClickDelete}
									/>
								</Table>
							</Box>
						) : (
							<Box className={classes.contentBoxCenter}>
								<Typography>N??o foram encontradas equipas.</Typography>
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
export default Equipa
