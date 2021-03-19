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
import TypesServerResponse, { FaixaEtariaType } from '../types/serverResponse'
import TableFaixaEtariaBody from '../tables/FaixaEtaria/TableFaixaEtariaBody'
import TableFaixaEtariaHeader from '../tables/FaixaEtaria/TableFaixaEtariaHeader'
import DialogManageDeletes from '../components/dialogManageDeletes'
import FormikFaixaEtaria from '../formik/formikFaixaEtaria'

const FaixaEtaria: FunctionComponent = () => {

	const classes = useStyles()

	const { enqueueSnackbar } = useSnackbar()

	const [loaded, setLoaded] = useState<boolean>(false)
	const [status, setStatus] = useState(false)
	const [faixasEtarias, setFaixasEtarias] = useState<FaixaEtariaType[]>([])

	const [update, setUpdate] = useState(false)
	const [selectedRow, setSelectedRow] = useState<FaixaEtariaType | undefined>(undefined)
	const [openAlert, setOpenAlert] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [selectedRowToDelete, setSelectedRowDownloadToDelete] = useState<FaixaEtariaType | undefined>(undefined)

	const handleClickClean = () => setSelectedRow(undefined)
	const handleClickEdit = (row: FaixaEtariaType | undefined) => setSelectedRow(row)
	const handleClickDelete = (row: FaixaEtariaType | undefined) => {
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
			.post<TypesServerResponse>(`${backendUrl()}faixa_etaria_manage`, selectedRowToDelete, { headers: { 'x-methodoverride': 'DELETE' } })
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
		getUrl<FaixaEtariaType[]>('faixa_etaria')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setFaixasEtarias(res.data.data)
					setLoaded(true)
					setStatus(true)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter as faixas etárias.', {
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
				<FormikFaixaEtaria
					row={selectedRow}
					handleClickClean={handleClickClean}
					setUpdate={setUpdate}
				/>
			</Box>
			{
				loaded && !status ? (
					<Box className={classes.contentBoxCenter}>
						<Typography>Ocorreu um erro ao obter as faixas etárias.</Typography>
					</Box>
				) : (
					loaded && status ? (
						faixasEtarias.length !== 0 ? (
							<Box className={classes.contentBoxTable}>
								<Table>
									<TableFaixaEtariaHeader />
									<TableFaixaEtariaBody
										faixasEtarias={faixasEtarias}
										handleClickEdit={handleClickEdit}
										handleClickDelete={handleClickDelete}
									/>
								</Table>
							</Box>
						) : (
							<Box className={classes.contentBoxCenter}>
								<Typography>Não foram encontradas faixas etárias.</Typography>
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
export default FaixaEtaria
