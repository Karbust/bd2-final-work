import { FunctionComponent } from 'react'
import { Field, FieldProps } from 'formik'
import Grid from '@material-ui/core/Grid'

import { FormProps, ModalidadeType } from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'
import TextField from '@material-ui/core/TextField'

const FormModalidade: FunctionComponent<FormProps> = ({ action, row }) => {
	return (
		<>
			<Grid container spacing={3}>
				<Grid item lg={3} md={5} sm={6} xs={12}>
					<Field
						name="Modalidade"
					>
						{({ field }: FieldProps<ModalidadeType>) => (
							<TextField
								{...field}
								fullWidth
								id="Modalidade"
								label="Modalidade"
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
export default FormModalidade
