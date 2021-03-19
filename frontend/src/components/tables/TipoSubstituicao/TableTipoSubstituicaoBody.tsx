import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { TipoSubstituicaoType } from '../../types/serverResponse'
import PopoverEditDelete from '../../components/popoverEditDelete'

interface Props {
	tipos_substituicao: TipoSubstituicaoType[]
	handleClickEdit?: any,
	handleClickDelete?: any
}

const TableTipoSubstituicaoBody: FunctionComponent<Props> = ({ tipos_substituicao, handleClickEdit, handleClickDelete }) => (
	<TableBody>
		{
			tipos_substituicao.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.id}</TableCell>
					<TableCell align="left">{row.TipoSubstituicao}</TableCell>
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
export default TableTipoSubstituicaoBody
