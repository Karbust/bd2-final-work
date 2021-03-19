import { FunctionComponent } from 'react'
import { Field, FieldProps } from 'formik'
import Grid from '@material-ui/core/Grid'

import { FaixaEtariaType, FormProps } from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'
import TextField from '@material-ui/core/TextField'

const FormFaixaEtaria: FunctionComponent<FormProps> = ({ action, row }) => (
	<>
		<Grid container spacing={3}>
			<Grid item lg={3} md={5} sm={6} xs={12}>
				<Field
					name="FaixaEtaria"
				>
					{({ field }: FieldProps<FaixaEtariaType>) => (
						<TextField
							{...field}
							fullWidth
							id="FaixaEtaria"
							label="Faixa Etária"
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
export default FormFaixaEtaria
