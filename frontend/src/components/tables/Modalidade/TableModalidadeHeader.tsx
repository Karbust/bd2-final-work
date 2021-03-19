import { FunctionComponent } from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const TableModalidadeHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="20%">ID Modalidade</TableCell>
			<TableCell width="70%">Modalidade</TableCell>
			<TableCell width="10%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TableModalidadeHeader
