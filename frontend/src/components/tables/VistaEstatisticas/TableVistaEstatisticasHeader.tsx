import { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'

const TableVistaEstatisticasHeader: FunctionComponent = () => (
	<TableHead>
		<TableRow>
			<TableCell width="10%">Jogo</TableCell>
			<TableCell width="20%">Nome Equipa</TableCell>
			<TableCell width="20%">Data</TableCell>
			<TableCell width="10%">Pontos</TableCell>
			<TableCell width="20%">Melhor Goleador</TableCell>
			<TableCell width="20%">Mais Penalidades</TableCell>
		</TableRow>
	</TableHead>
)
export default TableVistaEstatisticasHeader
