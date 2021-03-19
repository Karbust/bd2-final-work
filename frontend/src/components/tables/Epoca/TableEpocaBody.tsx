import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { EpocaType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	epocas: EpocaType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableEpocaBody: FunctionComponent<Props> = ({ epocas, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			epocas.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.AnoInicial}</TableCell>
					<TableCell align="left">{row.AnoFinal}</TableCell>
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
export default TableEpocaBody
