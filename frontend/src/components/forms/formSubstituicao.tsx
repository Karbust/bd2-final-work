import { FunctionComponent, useEffect, useState } from 'react'
import { Field, useFormikContext } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSnackbar } from 'notistack'

import { getUrl } from '../../functions'
import { FormProps, ParticipanteType, SubstituicaoType, TipoSubstituicaoType } from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'

const FormSubstituicao: FunctionComponent<FormProps> = ({ action, row }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { setFieldValue, values } = useFormikContext<SubstituicaoType>()

	const [tiposSubstituicao, setTiposSubstituicao] = useState<TipoSubstituicaoType[]>([])
	const [participantes, setParticipantes] = useState<ParticipanteType[]>([])

	useEffect(() => {
		getUrl<TipoSubstituicaoType[]>('tipo_substituicao')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setTiposSubstituicao(res.data.data)
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
		getUrl<ParticipanteType[]>('participante')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setParticipantes(res.data.data)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter os jogadores.', {
					variant: 'error',
				})
			})
	}, [enqueueSnackbar])

	return (
		<>
			<Grid container spacing={3}>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="TipoSubstituicao"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="TipoSubstituicao"
								options={tiposSubstituicao}
								getOptionLabel={(option: TipoSubstituicaoType) => option.TipoSubstituicao}
								inputValue={(() => {
									if (values.TipoSubstituicao === 0) {
										return ''
									}
									const ts = tiposSubstituicao.find(tipoSubstituicao => tipoSubstituicao.id === values.TipoSubstituicao)
									if (ts === undefined) {
										return ''
									}
									return ts.TipoSubstituicao
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Tipo Substituição"
										variant="outlined"
										value={values.TipoSubstituicao}
									/>
								)}
								onChange={(event, newValue, reason) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('TipoSubstituicao', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('TipoSubstituicao', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('TipoSubstituicao', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('TipoSubstituicao', 0)
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
								options={participantes}
								getOptionLabel={(option: ParticipanteType) => option.jogador_nome!}
								inputValue={(() => {
									if (values.Participante === 0) {
										return ''
									}
									const parti = participantes.find(participante => participante.id === values.Participante)
									if (parti === undefined) {
										return ''
									}
									return parti.jogador_nome
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Participante"
										variant="outlined"
										value={values.Participante}
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
export default FormSubstituicao
