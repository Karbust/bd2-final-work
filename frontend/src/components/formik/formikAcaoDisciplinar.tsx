import { FunctionComponent } from 'react'
import axios from 'axios'
import { Form, Formik, FormikHelpers } from 'formik'
import { useSnackbar } from 'notistack'

import { backendUrl } from '../../configs'
import TypesServerResponse, { FormikProps, AcaoDisciplinarType } from '../types/serverResponse'
import FormAcaoDisciplinar from '../forms/formAcaoDisciplinar'

const FormikAcaoDisciplinar: FunctionComponent<FormikProps<AcaoDisciplinarType>> = ({ row, handleClickClean, setUpdate }) => {
	const { enqueueSnackbar } = useSnackbar()

	const onFormikSubmit = (values: AcaoDisciplinarType, formikActions: FormikHelpers<AcaoDisciplinarType>) => {
		values.id = row ? row.id : 0
		return axios
			.post<TypesServerResponse>(`${backendUrl()}acao_disciplinar_manage`, values, { headers: { 'x-methodoverride': row ? 'PUT' : 'POST' } })
			.then((res) => {
				if (res.data.success) {
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
		<Formik<AcaoDisciplinarType>
			onSubmit={onFormikSubmit}
			validateOnBlur={false}
			validateOnChange={false}
			enableReinitialize
			initialValues={{
				Participante: row ? row.Participante : 0,
				TipoAcaoDisciplinar: row ? row.TipoAcaoDisciplinar : 0,
			}}
		>
			<Form>
				<FormAcaoDisciplinar
					action={handleClickClean}
					row={row}
				/>
			</Form>
		</Formik>
	)
}
export default FormikAcaoDisciplinar
