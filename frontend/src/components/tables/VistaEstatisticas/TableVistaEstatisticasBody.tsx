import React, { FunctionComponent } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { VistaEstatisticasType } from '../../types/serverResponse'
import moment from 'moment'

interface Props {
	vistaObjetos: VistaEstatisticasType[]
}

const TableVistaEstatisticasBody: FunctionComponent<Props> = ({ vistaObjetos }) => (
	<TableBody>
		{
			vistaObjetos.map((row, key) => (
				<TableRow key={key}>
					<TableCell component="th" scope="row">{row.Jogo}</TableCell>
					<TableCell align="left">{row.NomeEquipa}</TableCell>
					<TableCell align="left">{moment(row.Data).format('DD-MM-YYYY HH:mm')}</TableCell>
					<TableCell align="left">{row.Pontos}</TableCell>
					<TableCell align="left">{row.MelhorGoleador}</TableCell>
					<TableCell align="left">{row.MaisPenalidades}</TableCell>
				</TableRow>
			))
		}
	</TableBody>
)
export default TableVistaEstatisticasBody
