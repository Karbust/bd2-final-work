import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { FaixaEtariaType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	faixasEtarias: FaixaEtariaType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableFaixaEtariaBody: FunctionComponent<Props> = ({ faixasEtarias, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			faixasEtarias.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.FaixaEtaria}</TableCell>
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
export default TableFaixaEtariaBody
