import { FunctionComponent } from 'react'
import axios from 'axios'
import { Formik, FormikHelpers } from 'formik'
import { useSnackbar } from 'notistack'

import { backendUrl } from '../../configs'
import TypesServerResponse, { FormikProps, PontosType } from '../types/serverResponse'
import FormPontos from '../forms/formPontos'

const FormikPontos: FunctionComponent<FormikProps<PontosType>> = ({ row, handleClickClean, setUpdate }) => {
	const { enqueueSnackbar } = useSnackbar()

	const onFormikSubmit = (values: PontosType, formikActions: FormikHelpers<PontosType>) => {
		values.id = row ? row.id : 0
		return axios
			.post<TypesServerResponse>(`${backendUrl()}pontos_manage`, values, { headers: { 'x-methodoverride': row ? 'PUT' : 'POST' } })
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
		<Formik<PontosType>
			onSubmit={onFormikSubmit}
			validateOnBlur={false}
			validateOnChange={false}
			enableReinitialize
			initialStatus={0}
			initialValues={{
				Pontos: row ? row.Pontos : '',
				TipoPontuacao: row ? row.TipoPontuacao : 0,
				Participante: row ? row.Participante : 0,
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
						<FormPontos
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
export default FormikPontos
