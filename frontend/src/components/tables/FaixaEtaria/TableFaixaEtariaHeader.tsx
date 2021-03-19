import { FunctionComponent } from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const TableFaixaEtariaHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="20%">ID Faixa Etária</TableCell>
			<TableCell width="70%">Faixa Etária</TableCell>
			<TableCell width="10%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TableFaixaEtariaHeader
