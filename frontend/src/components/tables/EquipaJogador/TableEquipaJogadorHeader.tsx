import { FunctionComponent } from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const TableEquipaJogadorHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="20%">ID</TableCell>
			<TableCell width="20%">Jogador</TableCell>
			<TableCell width="50%">Equipa</TableCell>
			<TableCell width="10%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TableEquipaJogadorHeader
