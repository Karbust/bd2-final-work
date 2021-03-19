import { FunctionComponent } from 'react'
import { Field, FieldProps } from 'formik'
import Grid from '@material-ui/core/Grid'

import { EpocaType, FormProps } from '../types/serverResponse'
import BotoesAdicionarLimpar from '../components/botoesAdicionarLimpar'
import TextField from '@material-ui/core/TextField'

const FormEpoca: FunctionComponent<FormProps> = ({ action, row }) => (
	<>
		<Grid container spacing={3}>
			<Grid item lg={3} md={5} sm={6} xs={12}>
				<Field
					name="AnoInicial"
				>
					{({ field }: FieldProps<EpocaType>) => (
						<TextField
							{...field}
							fullWidth
							id="AnoInicial"
							label="Ano Inicial"
							variant="outlined"
						/>
					)}
				</Field>
			</Grid>
			<Grid item lg={3} md={5} sm={6} xs={12}>
				<Field
					name="AnoFinal"
				>
					{({ field }: FieldProps<EpocaType>) => (
						<TextField
							{...field}
							fullWidth
							id="AnoFinal"
							label="Ano Final"
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
export default FormEpoca
