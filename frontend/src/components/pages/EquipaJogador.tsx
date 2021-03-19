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
import TypesServerResponse, { EquipaJogadorType } from '../types/serverResponse'
import TableEquipaJogadorBody from '../tables/EquipaJogador/TableEquipaJogadorBody'
import TableEquipaJogadorHeader from '../tables/EquipaJogador/TableEquipaJogadorHeader'
import DialogManageDeletes from '../components/dialogManageDeletes'
import FormikEquipaJogador from '../formik/formikEquipaJogador'

const EquipaJogador: FunctionComponent = () => {
	const classes = useStyles()

	const { enqueueSnackbar } = useSnackbar()

	const [loaded, setLoaded] = useState<boolean>(false)
	const [status, setStatus] = useState(false)
	const [equipasJogadores, setEquipasJogadores] = useState<EquipaJogadorType[]>([])

	const [update, setUpdate] = useState(false)
	const [selectedRow, setSelectedRow] = useState<EquipaJogadorType | undefined>(undefined)
	const [openAlert, setOpenAlert] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [selectedRowToDelete, setSelectedRowDownloadToDelete] = useState<EquipaJogadorType | undefined>(undefined)

	const handleClickClean = () => setSelectedRow(undefined)
	const handleClickEdit = (row: EquipaJogadorType | undefined) => setSelectedRow(row)
	const handleClickDelete = (row: EquipaJogadorType | undefined) => {
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
			.post<TypesServerResponse>(`${backendUrl()}equipa_jogador_manage`, selectedRowToDelete, { headers: { 'x-methodoverride': 'DELETE' } })
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
		getUrl<EquipaJogadorType[]>('equipa_jogador')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setEquipasJogadores(res.data.data)
					setLoaded(true)
					setStatus(true)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter as combinações de equipas jogadores.', {
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
				<FormikEquipaJogador
					row={selectedRow}
					handleClickClean={handleClickClean}
					setUpdate={setUpdate}
				/>
			</Box>
			{
				loaded && !status ? (
					<Box className={classes.contentBoxCenter}>
						<Typography>Ocorreu um erro ao obter as combinações de equipas jogadores.</Typography>
					</Box>
				) : (
					loaded && status ? (
						equipasJogadores.length !== 0 ? (
							<Box className={classes.contentBoxTable}>
								<Table>
									<TableEquipaJogadorHeader />
									<TableEquipaJogadorBody
										equipasJogadores={equipasJogadores}
										handleClickEdit={handleClickEdit}
										handleClickDelete={handleClickDelete}
									/>
								</Table>
							</Box>
						) : (
							<Box className={classes.contentBoxCenter}>
								<Typography>Não foram encontradas combinações de equipas jogadores.</Typography>
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
export default EquipaJogador
