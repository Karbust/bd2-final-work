import { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'

const TableSubstituicaoHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="10%">ID Substituição</TableCell>
			<TableCell width="40%">Jogador</TableCell>
			<TableCell width="40%">Tipo Substituição</TableCell>
			<TableCell width="10%">Ações</TableCell>
		</TableRow>
	</TableHead>
)
export default TableSubstituicaoHeader
