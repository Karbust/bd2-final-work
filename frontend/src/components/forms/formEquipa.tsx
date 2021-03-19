import { FunctionComponent, useEffect, useState } from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSnackbar } from 'notistack'

import { getUrl } from '../../functions'
import {
	FormProps,
	EquipaType,
	FaixaEtariaType,
	ModalidadeType
} from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'

const FormEquipa: FunctionComponent<FormProps> = ({ action, row }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { setFieldValue, values } = useFormikContext<EquipaType>()

	const [faixasEtarias, setFaixasEtarias] = useState<FaixaEtariaType[]>([])
	const [modalidades, setModalidades] = useState<ModalidadeType[]>([])

	useEffect(() => {
		getUrl<FaixaEtariaType[]>('faixa_etaria')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setFaixasEtarias(res.data.data)
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

		getUrl<ModalidadeType[]>('modalidade')
			.then((res) => {
				if(res.data.success && res.data.data) {
					setModalidades(res.data.data)
				} else {
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				enqueueSnackbar('Ocorreu um erro ao obter as modalidades.', {
					variant: 'error',
				})
			})
	}, [enqueueSnackbar])

	return (
		<>
			<Grid container spacing={3}>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="NomeEquipa"
					>
						{({ field }: FieldProps<EquipaType>) => (
							<TextField
								{...field}
								fullWidth
								id="NomeEquipa"
								label="Nome"
								variant="outlined"
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="Descricao"
					>
						{({ field }: FieldProps<EquipaType>) => (
							<TextField
								{...field}
								fullWidth
								id="Descricao"
								label="Descrição"
								variant="outlined"
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="Modalidade"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="Modalidade"
								options={modalidades}
								getOptionLabel={(option: ModalidadeType) => option.Modalidade}
								inputValue={(() => {
									if (values.Modalidade === 0) {
										return ''
									}
									return modalidades.find(mod => mod.id === values.Modalidade)!.Modalidade
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Modalidade"
										variant="outlined"
									/>
								)}
								onChange={(event, newValue, reason) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('Modalidade', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('Modalidade', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('Modalidade', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('Modalidade', 0)
									}
								}}
							/>
						)}
					</Field>
				</Grid>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="FaixaEtaria"
					>
						{() => (
							<Autocomplete
								freeSolo
								id="FaixaEtaria"
								options={faixasEtarias}
								getOptionLabel={(option: FaixaEtariaType) => option.FaixaEtaria}
								inputValue={(() => {
									if (values.FaixaEtaria === 0) {
										return ''
									}
									return faixasEtarias.find(mod => mod.id === values.FaixaEtaria)!.FaixaEtaria
								})()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="FaixaEtaria"
										variant="outlined"
									/>
								)}
								onChange={(event, newValue, reason, details) => {
									if (reason === 'select-option') {
										// @ts-ignore
										setFieldValue('FaixaEtaria', newValue.id)
									} else if (reason === 'clear') {
										setFieldValue('FaixaEtaria', 0)
									} else if (reason === 'remove-option') {
										setFieldValue('FaixaEtaria', 0)
									}
								}}
								onInputChange={(event, value, reason) => {
									if (reason === 'clear') {
										setFieldValue('FaixaEtaria', 0)
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
export default FormEquipa
