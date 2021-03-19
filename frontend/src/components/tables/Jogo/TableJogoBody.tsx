import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import moment from 'moment'

import { JogoType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	jogos: JogoType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableJogoBody: FunctionComponent<Props> = ({ jogos, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			jogos.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.jogo_campeonato}</TableCell>
					<TableCell align="left">{moment(row.DataJogo).format('DD-MM-YYYY HH:mm')}</TableCell>
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
export default TableJogoBody
