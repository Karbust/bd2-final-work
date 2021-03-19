import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { AcaoDisciplinarType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	acaoDisciplinar: AcaoDisciplinarType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableAcaoDisciplinarBody: FunctionComponent<Props> = ({ acaoDisciplinar, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			acaoDisciplinar.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.acao_disciplinar_participante}</TableCell>
					<TableCell align="left">{row.acao_disciplinar_tipo}</TableCell>
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
export default TableAcaoDisciplinarBody
