import { FunctionComponent } from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'
import Grid from '@material-ui/core/Grid'

import { useStyles } from '../components/MuiStyles'
import { FormProps, TipoSubstituicaoType } from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'
import TextField from '@material-ui/core/TextField'

const FormTipoSubstituicao: FunctionComponent<FormProps> = ({ action, row }) => (
	<>
		<Grid container spacing={3}>
			<Grid item lg={3} md={5} sm={6} xs={12}>
				<Field
					name="TipoSubstituicao"
				>
					{({ field }: FieldProps<TipoSubstituicaoType>) => (
						<TextField
							{...field}
							fullWidth
							id="TipoSubstituicao"
							label="Tipo Substituição"
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
export default FormTipoSubstituicao
