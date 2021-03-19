import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import moment from 'moment'

import { JogadorType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	jogadores: JogadorType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableJogadorBody: FunctionComponent<Props> = ({ jogadores, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			jogadores.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{`${row.PrimeiroNome} ${row.UltimoNome}`}</TableCell>
					<TableCell align="left">{row.jogador_genero}</TableCell>
					<TableCell align="left">{moment().diff(row.DataNascimento, 'years', false)}</TableCell>
					<TableCell align="left">{row.DataNascimento}</TableCell>
					<TableCell align="left">{row.Morada}</TableCell>
					<TableCell align="left">{row.Telemovel}</TableCell>
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
export default TableJogadorBody
