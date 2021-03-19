import { FunctionComponent } from 'react'
import axios from 'axios'
import { Formik, FormikHelpers } from 'formik'
import { useSnackbar } from 'notistack'

import { backendUrl } from '../../configs'
import TypesServerResponse, { FormikProps, CampeonatoType } from '../types/serverResponse'
import FormCampeonato from '../forms/formCampeonato'

const FormikCampeonato: FunctionComponent<FormikProps<CampeonatoType>> = ({ row, handleClickClean, setUpdate }) => {
	const { enqueueSnackbar } = useSnackbar()

	const onFormikSubmit = (values: CampeonatoType, formikActions: FormikHelpers<CampeonatoType>) => {
		values.id = row ? row.id : 0
		return axios
			.post<TypesServerResponse>(`${backendUrl()}campeonato_manage`, values, { headers: { 'x-methodoverride': row ? 'PUT' : 'POST' } })
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
		<Formik<CampeonatoType>
			onSubmit={onFormikSubmit}
			validateOnBlur={false}
			validateOnChange={false}
			enableReinitialize
			initialStatus={0}
			initialValues={{
				NomeCampeonato: row ? row.NomeCampeonato : '',
				DescricaoCampeonato: row ? row.DescricaoCampeonato : '',
				Epoca: row ? row.Epoca : 0,
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
						<FormCampeonato
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
export default FormikCampeonato
