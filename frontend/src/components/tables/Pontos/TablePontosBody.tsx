import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { PontosType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	pontos: PontosType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TablePontosBody: FunctionComponent<Props> = ({ pontos, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			pontos.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.participante_nome}</TableCell>
					<TableCell align="left">{row.tipo_pontuacao}</TableCell>
					<TableCell align="left">{row.Pontos}</TableCell>
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
export default TablePontosBody
