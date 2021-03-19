import { FunctionComponent } from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const TableJogadorHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="10%">ID Jogador</TableCell>
			<TableCell width="20%">Nome</TableCell>
			<TableCell width="10%">Género</TableCell>
			<TableCell width="10%">Idade</TableCell>
			<TableCell width="10%">DataNascimento</TableCell>
			<TableCell width="20%">Morada</TableCell>
			<TableCell width="10%">Telemóvel</TableCell>
			<TableCell width="10%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TableJogadorHeader
