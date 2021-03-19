import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { ParticipanteType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'
import moment from 'moment'

interface Props {
	participantes: ParticipanteType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableParticipanteBody: FunctionComponent<Props> = ({ participantes, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			participantes.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.jogador_nome}</TableCell>
					<TableCell align="left">{row.equipa_nome}</TableCell>
					<TableCell align="left">{row.jogo_campeonato}</TableCell>
					<TableCell align="left">{moment(row.jogo_data).format('DD-MM-YYYY HH:mm')}</TableCell>
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
export default TableParticipanteBody
