import { FunctionComponent, useEffect, useState } from 'react'
import { Field, useFormikContext } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSnackbar } from 'notistack'

import { getUrl } from '../../functions'
import { EquipaType, FormProps, JogadorType, JogoType, ParticipanteType } from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'

const FormParticipante: FunctionComponent<FormProps> = ({ action, row }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { setFieldValue, values } = useFormikContext<ParticipanteType>()

	const [jogos, setJogos] = useState<JogoType[]>([])
	const [equipas, setEquipas] = useState<EquipaType[]>([])
	const [jogadores, setJogadores] = useState<JogadorType[]>([])

	useEffect(() => {
		getUrl<JogoType[]>('jogo')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setJogos(res.data.data)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter os campeonatos.', {
					variant: 'error',
				})
			})
		getUrl<EquipaType[]>('equipa')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setEquipas(res.data.data)
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
		getUrl<JogadorType[]>('jogador')
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
						name="Jogador"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="Jogador"
								options={jogadores}
								getOptionLabel={(option: JogadorType) => option.PrimeiroNome + ' ' + option.UltimoNome}
								inputValue={(() => {
									if (values.Jogador === 0) {
										return ''
									}
									const jog = jogadores.find(jogador => jogador.id === values.Jogador)
									if (jog === undefined) {
										return ''
									}
									return jog.PrimeiroNome + ' ' + jog.UltimoNome
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Jogador"
										variant="outlined"
										value={values.Jogador}
									/>
								)}
								onChange={(event, newValue, reason) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('Jogador', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('Jogador', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('Jogador', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('Jogador', 0)
									}
								}}
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="Equipa"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="Equipa"
								options={equipas}
								getOptionLabel={(option: EquipaType) => option.NomeEquipa}
								inputValue={(() => {
									if (values.Equipa === 0) {
										return ''
									}
									const equip = equipas.find(equipa => equipa.id === values.Equipa)
									if (equip === undefined) {
										return ''
									}
									return equip.NomeEquipa
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Equipa"
										variant="outlined"
										value={values.Equipa}
									/>
								)}
								onChange={(event, newValue, reason, details) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('Equipa', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('Equipa', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('Equipa', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('Equipa', 0)
									}
								}}
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="Jogo"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="Jogo"
								options={jogos}
								getOptionLabel={(option: JogoType) => option.jogo_campeonato!}
								inputValue={(() => {
									if (values.Jogo === 0) {
										return ''
									}
									const jog = jogos.find(jogo => jogo.id === values.Jogo)
									if (jog === undefined) {
										return ''
									}
									return jog.jogo_campeonato
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Jogo"
										variant="outlined"
										value={values.Jogo}
									/>
								)}
								onChange={(event, newValue, reason, details) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('Jogo', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('Jogo', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('Jogo', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('Jogo', 0)
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
export default FormParticipante
