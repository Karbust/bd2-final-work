import { FunctionComponent } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { AcaoDisciplinarType, BotoesAdicionarLimparType } from '../types/serverResponse'
import { useFormikContext } from 'formik'

const BotoesAdicionarLimpar: FunctionComponent<BotoesAdicionarLimparType> = ({ row, action }) => {
	const {
		isValid, isSubmitting, submitForm
	} = useFormikContext<AcaoDisciplinarType>()

	return (
		<Box style={{ float: 'right', margin: '15px 0px' }}>
			<Button
				variant="contained"
				color="primary"
				type="reset"
				onClick={action}
				style={{ marginRight: '15px' }}
				disabled={isSubmitting}
			>
				{!isSubmitting && ('Limpar')}
			</Button>

			<Button
				variant="contained"
				color="primary"
				onClick={submitForm}
				disabled={!isValid || isSubmitting}
			>
				{isSubmitting && (
					<CircularProgress
						color="inherit"
					/>
				)}
				{!isSubmitting && (row ? 'Editar' : 'Adicionar')}
			</Button>
		</Box>
	)
}
export default BotoesAdicionarLimpar
