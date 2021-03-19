import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { TipoPontuacaoType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	tipos_pontuacao: TipoPontuacaoType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableTipoPontuacaoBody: FunctionComponent<Props> = ({ tipos_pontuacao, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			tipos_pontuacao.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.TipoPontuacao}</TableCell>
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
export default TableTipoPontuacaoBody
