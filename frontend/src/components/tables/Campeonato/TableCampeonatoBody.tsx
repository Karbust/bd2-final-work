import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { CampeonatoType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	campeonatos: CampeonatoType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableCampeonatoBody: FunctionComponent<Props> = ({ campeonatos, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			campeonatos.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.NomeCampeonato}</TableCell>
					<TableCell align="left">{row.DescricaoCampeonato}</TableCell>
					<TableCell align="left">{row.epoca_anos}</TableCell>
					<TableCell align="left">
						<PopoverEditDelete
							handleClickEdit={handleClickEdit}
							handleClickDelete={handleClickDelete}
							row={row}
						/>
					</TableCell>
				</TableRow>
			))
		}
	</TableBody>
)
export default TableCampeonatoBody
