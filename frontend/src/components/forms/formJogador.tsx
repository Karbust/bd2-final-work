import { FunctionComponent, useEffect, useState } from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSnackbar } from 'notistack'

import { getUrl } from '../../functions'
import { FormProps, GeneroType, JogadorType } from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'

const FormJogador: FunctionComponent<FormProps> = ({ action, row }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { setFieldValue, values } = useFormikContext<JogadorType>()

	const [generos, setGeneros] = useState<GeneroType[]>([])

	useEffect(() => {
		getUrl<GeneroType[]>('generos')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setGeneros(res.data.data)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter os géneros.', {
					variant: 'error',
				})
			})
	}, [enqueueSnackbar])

	return (
		<>
			<Grid container spacing={3}>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="PrimeiroNome"
					>
						{({ field }: FieldProps<JogadorType>) => (
							<TextField
								{...field}
								fullWidth
								id="PrimeiroNome"
								label="Primeiro Nome"
								variant="outlined"
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="UltimoNome"
					>
						{({ field }: FieldProps<JogadorType>) => (
							<TextField
								{...field}
								fullWidth
								id="UltimoNome"
								label="Último Nome"
								variant="outlined"
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="DataNascimento"
					>
						{({ field }: FieldProps<JogadorType>) => (
							<TextField
								{...field}
								fullWidth
								id="DataNascimento"
								label="DataNascimento"
								variant="outlined"
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="Genero"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="Genero"
								options={generos}
								getOptionLabel={(option: GeneroType) => option.GeneroDescricao}
								inputValue={(() => {
									if (values.Genero === 0) {
										return ''
									}
									const gen = generos.find(genero => genero.id === values.Genero)
									if (gen === undefined) {
										return ''
									}
									return gen.GeneroDescricao
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Genero"
										variant="outlined"
										value={values.Genero}
									/>
								)}
								onChange={(event, newValue, reason) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('Genero', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('Genero', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('Genero', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('Genero', 0)
									}
								}}
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="Morada"
					>
						{({ field }: FieldProps<JogadorType>) => (
							<TextField
								{...field}
								fullWidth
								id="Morada"
								label="Morada"
								variant="outlined"
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="Telemovel"
					>
						{({ field }: FieldProps<JogadorType>) => (
							<TextField
								{...field}
								fullWidth
								id="Telemovel"
								label="Telemóvel"
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
export default FormJogador
