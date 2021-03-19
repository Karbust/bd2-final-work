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
import TypesServerResponse, { TipoPontuacaoType } from '../types/serverResponse'
import TableTipoPontuacaoBody from '../tables/TipoPontuacao/TableTipoPontuacaoBody'
import TableTipoPontuacaoHeader from '../tables/TipoPontuacao/TableTipoPontuacaoHeader'
import DialogManageDeletes from '../components/dialogManageDeletes'
import FormikTipoPontuacao from '../formik/formikTipoPontuacao'

const TipoPontuacao: FunctionComponent = () => {
	const classes = useStyles()

	const { enqueueSnackbar } = useSnackbar()

	const [loaded, setLoaded] = useState<boolean>(false)
	const [status, setStatus] = useState(false)
	const [tiposPontuacao, setTiposPontuacao] = useState<TipoPontuacaoType[]>([])

	const [update, setUpdate] = useState(false)
	const [selectedRow, setSelectedRow] = useState<TipoPontuacaoType | undefined>(undefined)
	const [openAlert, setOpenAlert] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [selectedRowToDelete, setSelectedRowDownloadToDelete] = useState<TipoPontuacaoType | undefined>(undefined)

	const handleClickClean = () => setSelectedRow(undefined)
	const handleClickEdit = (row: TipoPontuacaoType | undefined) => setSelectedRow(row)
	const handleClickDelete = (row: TipoPontuacaoType | undefined) => {
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
			.post<TypesServerResponse>(`${backendUrl()}tipo_pontuacao_manage`, selectedRowToDelete, { headers: { 'x-methodoverride': 'DELETE' } })
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
		getUrl<TipoPontuacaoType[]>('tipo_pontuacao')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setTiposPontuacao(res.data.data)
					setLoaded(true)
					setStatus(true)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter os tipos de pontuação.', {
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
				<FormikTipoPontuacao
					row={selectedRow}
					handleClickClean={handleClickClean}
					setUpdate={setUpdate}
				/>
			</Box>
			{
				loaded && !status ? (
					<Box className={classes.contentBoxCenter}>
						<Typography>Ocorreu um erro ao obter os tipos de pontuação.</Typography>
					</Box>
				) : (
					loaded && status ? (
						tiposPontuacao.length !== 0 ? (
							<Box className={classes.contentBoxTable}>
								<Table>
									<TableTipoPontuacaoHeader />
									<TableTipoPontuacaoBody
										tipos_pontuacao={tiposPontuacao}
										handleClickEdit={handleClickEdit}
										handleClickDelete={handleClickDelete}
									/>
								</Table>
							</Box>
						) : (
							<Box className={classes.contentBoxCenter}>
								<Typography>Não foram encontrados tipos de pontuação.</Typography>
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
export default TipoPontuacao
