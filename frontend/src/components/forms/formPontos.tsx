import { FunctionComponent, useEffect, useState } from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSnackbar } from 'notistack'

import { getUrl } from '../../functions'
import { FormProps, ParticipanteType, PontosType, TipoPontuacaoType } from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'

const FormPontos: FunctionComponent<FormProps> = ({ action, row }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { setFieldValue, values } = useFormikContext<PontosType>()

	const [tiposPontuacao, setTiposPontuacao] = useState<TipoPontuacaoType[]>([])
	const [participantes, setParticipantes] = useState<ParticipanteType[]>([])

	useEffect(() => {
		getUrl<TipoPontuacaoType[]>('tipo_pontuacao')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setTiposPontuacao(res.data.data)
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
						name="Pontos"
					>
						{({ field }: FieldProps<PontosType>) => (
							<TextField
								{...field}
								fullWidth
								id="Pontos"
								label="Pontos"
								variant="outlined"
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="TipoPontuacao"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="TipoPontuacao"
								options={tiposPontuacao}
								getOptionLabel={(option: TipoPontuacaoType) => option.TipoPontuacao!}
								inputValue={(() => {
									if (values.TipoPontuacao === 0) {
										return ''
									}
									const tp = tiposPontuacao.find(tipoPontuacao => tipoPontuacao.id === values.TipoPontuacao)
									if (tp === undefined) {
										return ''
									}
									return tp.TipoPontuacao
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Tipo Pontuação"
										variant="outlined"
										value={values.TipoPontuacao}
									/>
								)}
								onChange={(event, newValue, reason) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('TipoPontuacao', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('TipoPontuacao', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('TipoPontuacao', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('TipoPontuacao', 0)
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
export default FormPontos
