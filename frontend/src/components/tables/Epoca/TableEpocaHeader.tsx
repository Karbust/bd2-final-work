import { FunctionComponent } from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const TableEpocaHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="20%">ID Época</TableCell>
			<TableCell width="20%">Ano Inicial</TableCell>
			<TableCell width="50%">Ano Final</TableCell>
			<TableCell width="10%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TableEpocaHeader
