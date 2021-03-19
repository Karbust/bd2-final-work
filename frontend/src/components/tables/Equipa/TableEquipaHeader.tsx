import { FunctionComponent } from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const TableEquipaHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="15%">ID Equipa</TableCell>
			<TableCell width="20%">Nome</TableCell>
			<TableCell width="20%">Descrição</TableCell>
			<TableCell width="15%">Modalidade</TableCell>
			<TableCell width="15%">Faixa Etária</TableCell>
			<TableCell width="15%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TableEquipaHeader
