import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { EquipaJogadorType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	equipasJogadores: EquipaJogadorType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableEquipaJogadorBody: FunctionComponent<Props> = ({ equipasJogadores, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			equipasJogadores.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.jogador_nome}</TableCell>
					<TableCell align="left">{row.equipa_nome}</TableCell>
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
export default TableEquipaJogadorBody
