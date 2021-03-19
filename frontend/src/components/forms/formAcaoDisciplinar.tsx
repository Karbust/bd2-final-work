import { FunctionComponent, useEffect, useState } from 'react'
import { Field, useFormikContext } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSnackbar } from 'notistack'

import { getUrl } from '../../functions'
import {
	FormProps,
	AcaoDisciplinarType,
	TipoAcaoDisciplinarType,
	ParticipanteType
} from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'

const FormAcaoDisciplinar: FunctionComponent<FormProps> = ({ action, row }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { setFieldValue, values } = useFormikContext<AcaoDisciplinarType>()

	const [tiposAcaoDisciplinar, setTiposAcaoDisciplinar] = useState<TipoAcaoDisciplinarType[]>([])
	const [jogadores, setJogadores] = useState<ParticipanteType[]>([])

	useEffect(() => {
		getUrl<TipoAcaoDisciplinarType[]>('tipo_acao_disciplinar')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setTiposAcaoDisciplinar(res.data.data)
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

		getUrl<ParticipanteType[]>('participante')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setJogadores(res.data.data)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter os participantes.', {
					variant: 'error',
				})
			})
	}, [enqueueSnackbar])

	return (
		<>
			<Grid container spacing={3}>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="TipoAcaoDisciplinar"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="TipoAcaoDisciplinar"
								options={tiposAcaoDisciplinar}
								getOptionLabel={(option: TipoAcaoDisciplinarType) => option.TipoAcaoDisciplinar}
								inputValue={(() => {
									if (values.TipoAcaoDisciplinar === 0) {
										return ''
									}
									const tad = tiposAcaoDisciplinar.find(tad => tad.id === values.TipoAcaoDisciplinar)
									if (tad === undefined) {
										return ''
									}
									return tad.TipoAcaoDisciplinar
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Tipo de Ação Disciplinar"
										variant="outlined"
										value={values.TipoAcaoDisciplinar}
									/>
								)}
								onChange={(event, newValue, reason) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('TipoAcaoDisciplinar', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('TipoAcaoDisciplinar', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('TipoAcaoDisciplinar', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('TipoAcaoDisciplinar', 0)
									}
								}}
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="Participante"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="Participante"
								options={jogadores}
								getOptionLabel={(option: ParticipanteType) => option.Jogador + ' - ' + option.jogador_nome!}
								inputValue={(() => {
									if (values.Participante === 0) {
										return ''
									}
									return jogadores.find(jog => jog.id === values.Participante)!.jogador_nome
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Participante"
										variant="outlined"
									/>
								)}
								onChange={(event, newValue, reason, details) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('Participante', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('Participante', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('Participante', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('Participante', 0)
									}
								}}
							/>
						)}
					</Field>
				</Grid>
			</Grid>
			<BotoesAdicionarLimpar
				action={action}
				row={row}
			/>
		</>
	)
}
export default FormAcaoDisciplinar
