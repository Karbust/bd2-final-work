import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { TipoAcaoDisciplinarType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	tipos_acao_disciplinar: TipoAcaoDisciplinarType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableTipoAcaoDisciplinarBody: FunctionComponent<Props> = ({ tipos_acao_disciplinar, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			tipos_acao_disciplinar.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.TipoAcaoDisciplinar}</TableCell>
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
export default TableTipoAcaoDisciplinarBody
