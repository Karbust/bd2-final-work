import { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'

const TableAcaoDisciplinarHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="20%">ID Ação Disciplinar</TableCell>
			<TableCell width="40%">Participante</TableCell>
			<TableCell width="30%">Tipo</TableCell>
			<TableCell width="10%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TableAcaoDisciplinarHeader
