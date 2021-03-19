import { SetStateAction } from 'react'

export interface AcaoDisciplinarType {
	id?: number,
	TipoAcaoDisciplinar: number,
	Participante: number,
	acao_disciplinar_tipo?: string,
	acao_disciplinar_participante?: string
}

export interface CampeonatoType {
	id?: number,
	NomeCampeonato: string,
	DescricaoCampeonato: string,
	Epoca: number,
	epoca_anos?: string
}

export interface EpocaType {
	id?: number,
	AnoInicial: string,
	AnoFinal: string
}

export interface EquipaType {
	id?: number,
	NomeEquipa: string,
	Descricao: string,
	Modalidade: number,
	FaixaEtaria: number,
	equipa_modalidade?: string,
	equipa_faixa_etaria?: string
}

export interface EquipaJogadorType {
	id?: number,
	Jogador: number,
	Equipa: number,
	jogador_nome?: string,
	equipa_nome?: string
}

export interface FaixaEtariaType {
	id?: number,
	FaixaEtaria: string
}

export interface GeneroType {
	id?: number,
	GeneroDescricao: string
}

export interface JogadorType {
	id?: number,
	PrimeiroNome: string,
	UltimoNome: string,
	DataNascimento: string,
	Genero: number,
	Morada: string,
	Telemovel: string,
	jogador_genero?: string
}

export interface JogoType {
	id?: number,
	Campeonato: number,
	DataJogo: string,
	jogo_campeonato?: string
}

export interface ModalidadeType {
	id?: number,
	Modalidade: string
}

export interface ParticipanteType {
	id?: number,
	Jogador: number,
	Equipa: number,
	Jogo: number,
	jogador_nome?: string,
	equipa_nome?: string,
	jogo_campeonato?: string,
	jogo_data?: string
}

export interface PontosType {
	id?: number,
	Pontos: string,
	TipoPontuacao: number,
	Participante: number,
	participante_nome?: string,
	tipo_pontuacao?: string
}

export interface SubstituicaoType {
	id?: number,
	TipoSubstituicao: number,
	Participante: number,
	tipo_substituicao?: string,
	participante_nome?: string
}

export interface TipoAcaoDisciplinarType {
	id?: number,
	TipoAcaoDisciplinar: string,
}

export interface TipoPontuacaoType {
	id?: number,
	TipoPontuacao: string
}

export interface TipoSubstituicaoType {
	id?: number,
	TipoSubstituicao: string,
}

export interface VistaEstatisticasType {
	Jogo: number,
	NomeEquipa: string,
	Data: string,
	Pontos: number,
	MelhorGoleador: string,
	MaisPenalidades: string
}

export interface FormikProps<
	T = AcaoDisciplinarType | CampeonatoType | EpocaType |
		EquipaType | EquipaJogadorType | FaixaEtariaType |
		GeneroType | JogadorType | JogoType | ModalidadeType |
		ParticipanteType | PontosType | SubstituicaoType |
		TipoAcaoDisciplinarType | TipoPontuacaoType | TipoSubstituicaoType
> {
	row?: T
	handleClickClean: any,
	setUpdate: (value: SetStateAction<boolean>) => void,
}

export interface FormProps<
	T = AcaoDisciplinarType | CampeonatoType | EpocaType |
		EquipaType | EquipaJogadorType | FaixaEtariaType |
		GeneroType | JogadorType | JogoType | ModalidadeType |
		ParticipanteType | PontosType | SubstituicaoType |
		TipoAcaoDisciplinarType | TipoPontuacaoType | TipoSubstituicaoType
> {
	action: any,
	row: T | undefined
}

export interface BotoesAdicionarLimparType<
	T = AcaoDisciplinarType | CampeonatoType | EpocaType |
		EquipaType | EquipaJogadorType | FaixaEtariaType |
		GeneroType | JogadorType | JogoType | ModalidadeType |
		ParticipanteType | PontosType | SubstituicaoType |
		TipoAcaoDisciplinarType | TipoPontuacaoType | TipoSubstituicaoType
> {
	row: T | undefined
	action: any,
}

export default interface TypesServerResponse<
	T = AcaoDisciplinarType | CampeonatoType | EpocaType |
		EquipaType | EquipaJogadorType | FaixaEtariaType |
		GeneroType | JogadorType | JogoType | ModalidadeType |
		ParticipanteType | PontosType | SubstituicaoType |
		TipoAcaoDisciplinarType | TipoPontuacaoType |
		TipoSubstituicaoType | VistaEstatisticasType
> {
	success: boolean,
	data?: T,
	message?: string,
}
