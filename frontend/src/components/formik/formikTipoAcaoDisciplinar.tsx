import { FunctionComponent } from 'react'
import axios from 'axios'
import { Formik, FormikHelpers } from 'formik'
import { useSnackbar } from 'notistack'

import { backendUrl } from '../../configs'
import TypesServerResponse, { FormikProps, TipoAcaoDisciplinarType } from '../types/serverResponse'
import FormTipoAcaoDisciplinar from '../forms/formTipoAcaoDisciplinar'

const FormikTipoAcaoDisciplinar: FunctionComponent<FormikProps<TipoAcaoDisciplinarType>> = ({ row, handleClickClean, setUpdate }) => {
	const { enqueueSnackbar } = useSnackbar()

	const onFormikSubmit = (values: TipoAcaoDisciplinarType, formikActions: FormikHelpers<TipoAcaoDisciplinarType>) => {
		values.id = row ? row.id : 0
		return axios
			.post<TypesServerResponse>(`${backendUrl()}tipo_acao_disciplinar_manage`, values, { headers: { 'x-methodoverride': row ? 'PUT' : 'POST' } })
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
		<Formik<TipoAcaoDisciplinarType>
			onSubmit={onFormikSubmit}
			validateOnBlur={false}
			validateOnChange={false}
			enableReinitialize
			initialStatus={0}
			initialValues={{
				TipoAcaoDisciplinar: row ? row.TipoAcaoDisciplinar : '',
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
						<FormTipoAcaoDisciplinar
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
export default FormikTipoAcaoDisciplinar
