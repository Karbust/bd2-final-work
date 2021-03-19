import { FunctionComponent } from 'react'
import axios from 'axios'
import { Formik, FormikHelpers } from 'formik'
import { useSnackbar } from 'notistack'

import { backendUrl } from '../../configs'
import TypesServerResponse, { FormikProps, JogadorType } from '../types/serverResponse'
import FormJogador from '../forms/formJogador'

const FormikJogador: FunctionComponent<FormikProps<JogadorType>> = ({ row, handleClickClean, setUpdate }) => {
	const { enqueueSnackbar } = useSnackbar()

	const onFormikSubmit = (values: JogadorType, formikActions: FormikHelpers<JogadorType>) => {
		values.id = row ? row.id : 0
		return axios
			.post<TypesServerResponse>(`${backendUrl()}jogador_manage`, values, { headers: { 'x-methodoverride': row ? 'PUT' : 'POST' } })
			.then((res) => {
				if (res.data.success) {
					formikActions.setStatus(1)
					formikActions.resetForm()
					handleClickClean()
					enqueueSnackbar(res.data.message, {
						variant: 'success',
					})
					setUpdate(true)
				} else {
					formikActions.setSubmitting(false)
					enqueueSnackbar(res.data.message, {
						variant: 'error',
					})
				}
			})
			.catch(() => {
				formikActions.setSubmitting(false)
				enqueueSnackbar('Ocorreu um erro ao enviar o pedido para o servidor.', {
					variant: 'error',
				})
			})
	}

	return (
		<Formik<JogadorType>
			onSubmit={onFormikSubmit}
			validateOnBlur={false}
			validateOnChange={false}
			enableReinitialize
			initialStatus={0}
			initialValues={{
				PrimeiroNome: row ? row.PrimeiroNome : '',
				UltimoNome: row ? row.UltimoNome : '',
				DataNascimento: row ? row.DataNascimento : '',
				Genero: row ? row.Genero : 0,
				Morada: row ? row.Morada : '',
				Telemovel: row ? row.Telemovel : '',
			}}
		>
			{({
				  submitForm,
				  status
			  }) => {
				return (
					<form onSubmit={(event) => {
						event.preventDefault()
						submitForm()
					}}
					>
						<FormJogador
							key={status}
							action={handleClickClean}
							row={row}
						/>
					</form>
				)
			}}
		</Formik>
	)
}
export default FormikJogador
