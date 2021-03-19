import { FunctionComponent } from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const TableCampeonatoHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="10%">ID Campeonato</TableCell>
			<TableCell width="30%">Nome</TableCell>
			<TableCell width="30%">Descrição</TableCell>
			<TableCell width="20%">Época</TableCell>
			<TableCell width="10%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TableCampeonatoHeader
