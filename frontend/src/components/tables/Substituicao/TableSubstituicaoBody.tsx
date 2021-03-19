import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { SubstituicaoType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	substituicoes: SubstituicaoType[],
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableSubstituicaoBody: FunctionComponent<Props> = ({ substituicoes, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			substituicoes.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.participante_nome}</TableCell>
					<TableCell align="left">{row.tipo_substituicao}</TableCell>
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
export default TableSubstituicaoBody
