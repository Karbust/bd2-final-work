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
import TypesServerResponse, { TipoSubstituicaoType } from '../types/serverResponse'
import TableTipoSubstituicaoBody from '../tables/TipoSubstituicao/TableTipoSubstituicaoBody'
import TableTipoSubstituicaoHeader from '../tables/TipoSubstituicao/TableTipoSubstituicaoHeader'
import DialogManageDeletes from '../components/dialogManageDeletes'
import FormikTipoSubstituicao from '../formik/formikTipoSubstituicao'

const TipoSubstituicao: FunctionComponent = () => {
	const classes = useStyles()

	const { enqueueSnackbar } = useSnackbar()

	const [loaded, setLoaded] = useState<boolean>(false)
	const [status, setStatus] = useState(false)
	const [tiposSubstituicao, setTiposSubstituicao] = useState<TipoSubstituicaoType[]>([])

	const [update, setUpdate] = useState(false)
	const [selectedRow, setSelectedRow] = useState<TipoSubstituicaoType | undefined>(undefined)
	const [openAlert, setOpenAlert] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [selectedRowToDelete, setSelectedRowDownloadToDelete] = useState<TipoSubstituicaoType | undefined>(undefined)

	const handleClickClean = () => setSelectedRow(undefined)
	const handleClickEdit = (row: TipoSubstituicaoType | undefined) => setSelectedRow(row)
	const handleClickDelete = (row: TipoSubstituicaoType | undefined) => {
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
			.post<TypesServerResponse>(`${backendUrl()}tipo_substituicao_manage`, selectedRowToDelete, { headers: { 'x-methodoverride': 'DELETE' } })
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
		getUrl<TipoSubstituicaoType[]>('tipo_substituicao')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setTiposSubstituicao(res.data.data)
					setLoaded(true)
					setStatus(true)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter os tipos de substituição.', {
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
				<FormikTipoSubstituicao
					row={selectedRow}
					handleClickClean={handleClickClean}
					setUpdate={setUpdate}
				/>
			</Box>
			{
				loaded && !status ? (
					<Box className={classes.contentBoxCenter}>
						<Typography>Ocorreu um erro ao obter os tipos de substituição.</Typography>
					</Box>
				) : (
					loaded && status ? (
						tiposSubstituicao.length !== 0 ? (
							<Box className={classes.contentBoxTable}>
								<Table>
									<TableTipoSubstituicaoHeader />
									<TableTipoSubstituicaoBody
										tipos_substituicao={tiposSubstituicao}
										handleClickEdit={handleClickEdit}
										handleClickDelete={handleClickDelete}
									/>
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
export default TipoSubstituicao
