import { FunctionComponent, useEffect, useState } from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSnackbar } from 'notistack'

import { getUrl } from '../../functions'
import { CampeonatoType, EpocaType, FormProps } from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'

const FormCampeonato: FunctionComponent<FormProps> = ({ action, row }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { setFieldValue, values } = useFormikContext<CampeonatoType>()

	const [epocas, setEpocas] = useState<EpocaType[]>([])

	useEffect(() => {
		getUrl<EpocaType[]>('epoca')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setEpocas(res.data.data)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter as épocas.', {
					variant: 'error',
				})
			})
	}, [enqueueSnackbar])

	return (
		<>
			<Grid container spacing={3}>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="NomeCampeonato"
					>
						{({ field }: FieldProps<CampeonatoType>) => (
							<TextField
								{...field}
								fullWidth
								id="NomeCampeonato"
								label="Nome"
								variant="outlined"
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="DescricaoCampeonato"
					>
						{({ field }: FieldProps<CampeonatoType>) => (
							<TextField
								{...field}
								fullWidth
								id="DescricaoCampeonato"
								label="Descrição"
								variant="outlined"
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="Epoca"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="Epoca"
								options={epocas}
								getOptionLabel={(option: EpocaType) => option.AnoInicial + '/' + option.AnoFinal}
								inputValue={(() => {
									if (values.Epoca === 0) {
										return ''
									}
									const epoc = epocas.find(epoca => epoca.id === values.Epoca)
									if (epoc === undefined) {
										return ''
									}
									return epoc.AnoInicial + '/' + epoc.AnoFinal
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Época"
										variant="outlined"
										value={values.Epoca}
									/>
								)}
								onChange={(event, newValue, reason) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('Epoca', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('Epoca', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('Epoca', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('Epoca', 0)
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
export default FormCampeonato
