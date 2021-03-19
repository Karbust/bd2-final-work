import { FunctionComponent } from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const TablePontosHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="10%">ID Ponto</TableCell>
			<TableCell width="40%">Participante</TableCell>
			<TableCell width="20%">Tipo Pontuação</TableCell>
			<TableCell width="20%">Pontuação</TableCell>
			<TableCell width="10%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TablePontosHeader
