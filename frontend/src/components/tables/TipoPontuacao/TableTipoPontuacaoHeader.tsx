import { FunctionComponent } from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const TableTipoPontuacaoHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="20%">ID</TableCell>
			<TableCell width="70%">Descrição</TableCell>
			<TableCell width="10%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TableTipoPontuacaoHeader
