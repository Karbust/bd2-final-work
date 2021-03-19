import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { EquipaType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	equipas: EquipaType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableEquipaBody: FunctionComponent<Props> = ({ equipas, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			equipas.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.NomeEquipa}</TableCell>
					<TableCell align="left">{row.Descricao}</TableCell>
					<TableCell align="left">{row.equipa_modalidade}</TableCell>
					<TableCell align="left">{row.equipa_faixa_etaria}</TableCell>
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
export default TableEquipaBody
