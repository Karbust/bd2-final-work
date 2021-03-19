import React, { FunctionComponent, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'

import { useStyles } from './MuiStyles'
import {
	AcaoDisciplinarType, CampeonatoType, EpocaType,
	EquipaType, EquipaJogadorType, FaixaEtariaType,
	GeneroType, JogadorType, JogoType, ModalidadeType,
	ParticipanteType, PontosType, SubstituicaoType,
	TipoAcaoDisciplinarType, TipoPontuacaoType, TipoSubstituicaoType
} from '../types/serverResponse'

interface Props {
	handleClickEdit: any,
	handleClickDelete: any,
	row: AcaoDisciplinarType | CampeonatoType | EpocaType |
		EquipaType | EquipaJogadorType | FaixaEtariaType |
		GeneroType | JogadorType | JogoType | ModalidadeType |
		ParticipanteType | PontosType | SubstituicaoType |
		TipoAcaoDisciplinarType | TipoPontuacaoType | TipoSubstituicaoType
}

const PopoverEditDelete: FunctionComponent<Props> = ({ handleClickEdit, handleClickDelete, row }) => {
	const classes = useStyles()

	const [anchorElementEdit, setAnchorElementEdit] = useState<HTMLElement | null>(null)
	const [anchorElementDelete, setAnchorElementDelete] = useState<HTMLElement | null>(null)

	const handlePopoverOpenEdit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => setAnchorElementEdit(event.currentTarget)
	const handlePopoverOpenDelete = (event: React.MouseEvent<HTMLElement, MouseEvent>) => setAnchorElementDelete(event.currentTarget)

	const handlePopoverCloseEdit = () => setAnchorElementEdit(null)
	const handlePopoverCloseDelete = () => setAnchorElementDelete(null)

	const openEdit = Boolean(anchorElementEdit)
	const openDelete = Boolean(anchorElementDelete)

	return (
		<>
			<i
				className="fad fa-edit fa-2x"
				role="button"
				aria-label="Editar"
				tabIndex={0}
				onClick={() => handleClickEdit(row)}
				onMouseEnter={handlePopoverOpenEdit}
				onMouseLeave={handlePopoverCloseEdit}
				style={{ marginRight: '10px' }}
			/>
			<i
				className="fad fa-trash-alt fa-2x"
				role="button"
				aria-label="Editar"
				tabIndex={0}
				onClick={() => handleClickDelete(row)}
				onMouseEnter={handlePopoverOpenDelete}
				onMouseLeave={handlePopoverCloseDelete}
			/>
			<Popover
				id="mouse-over-popover"
				className={classes.popover}
				classes={{
					paper: classes.paper,
				}}
				open={openEdit}
				anchorEl={anchorElementEdit}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverCloseEdit}
				disableRestoreFocus
			>
				<Typography>Editar</Typography>
			</Popover>

			<Popover
				id="mouse-over-popover"
				className={classes.popover}
				classes={{
					paper: classes.paper,
				}}
				open={openDelete}
				anchorEl={anchorElementDelete}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverCloseDelete}
				disableRestoreFocus
			>
				<Typography>Apagar</Typography>
			</Popover>
		</>
	)
}
export default PopoverEditDelete
