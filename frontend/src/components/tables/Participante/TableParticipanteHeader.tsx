import { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'

const TableParticipanteHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="10%">ID Participante</TableCell>
			<TableCell width="20%">Jogador</TableCell>
			<TableCell width="20%">Equipa</TableCell>
			<TableCell width="20%">Campeonato</TableCell>
			<TableCell width="20%">Data</TableCell>
			<TableCell width="10%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TableParticipanteHeader
