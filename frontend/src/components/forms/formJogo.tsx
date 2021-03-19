import { FunctionComponent, useEffect, useState } from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSnackbar } from 'notistack'

import { getUrl } from '../../functions'
import { FormProps, CampeonatoType, JogoType } from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'

const FormJogo: FunctionComponent<FormProps> = ({ action, row }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { setFieldValue, values } = useFormikContext<JogoType>()

	const [campeonatos, setCampeonatos] = useState<CampeonatoType[]>([])

	useEffect(() => {
		getUrl<CampeonatoType[]>('campeonato')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setCampeonatos(res.data.data)
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
	}, [enqueueSnackbar])

	return (
		<>
			<Grid container spacing={3}>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="Campeonato"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="Campeonato"
								options={campeonatos}
								getOptionLabel={(option: CampeonatoType) => option.NomeCampeonato + ' ' + option.epoca_anos}
								inputValue={(() => {
									if (values.Campeonato === 0) {
										return ''
									}
									const camp = campeonatos.find(campeonato => campeonato.id === values.Campeonato)
									if (camp === undefined) {
										return ''
									}
									return camp.NomeCampeonato + ' ' + camp.epoca_anos
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Campeonato"
										variant="outlined"
										value={values.Campeonato}
									/>
								)}
								onChange={(event, newValue, reason) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('Campeonato', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('Campeonato', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('Campeonato', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('Campeonato', 0)
									}
								}}
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="DataJogo"
					>
						{({ field }: FieldProps<JogoType>) => (
							<TextField
								{...field}
								fullWidth
								id="DataJogo"
								label="Data do Jogo"
								variant="outlined"
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
export default FormJogo
