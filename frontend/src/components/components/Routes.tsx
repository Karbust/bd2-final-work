import { FunctionComponent, lazy, Suspense } from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useStyles } from './MuiStyles'

const Home = lazy(() => import('../pages/Home'))
const AcaoDisciplinar = lazy(() => import('../pages/AcaoDisciplinar'))
const Campeonato = lazy(() => import('../pages/Campeonato'))
const Epoca = lazy(() => import('../pages/Epoca'))
const Equipa = lazy(() => import('../pages/Equipa'))
const EquipaJogador = lazy(() => import('../pages/EquipaJogador'))
const FaixaEtaria = lazy(() => import('../pages/FaixaEtaria'))
const Genero = lazy(() => import('../pages/Genero'))
const Jogador = lazy(() => import('../pages/Jogador'))
const Jogo = lazy(() => import('../pages/Jogo'))
const Modalidade = lazy(() => import('../pages/Modalidade'))
const Participante = lazy(() => import('../pages/Participante'))
const Pontos = lazy(() => import('../pages/Pontos'))
const Substituicao = lazy(() => import('../pages/Substituicao'))
const TipoAcaoDisciplinar = lazy(() => import('../pages/TipoAcaoDisciplinar'))
const TipoPontuacao = lazy(() => import('../pages/TipoPontuacao'))
const TipoSubstituicao = lazy(() => import('../pages/TipoSubstituicao'))
const VistaEstatisticas = lazy(() => import('../pages/VistaEstatisticas'))

const Routes: FunctionComponent = () => {
	const classes = useStyles()
	const { path } = useRouteMatch()

	return (
		<Suspense
			fallback={(
				<Box className={classes.contentBoxCenter}>
					<CircularProgress />
				</Box>
			)}
		>
			<Switch>
				<Route exact path={`${path}`}>
					<Redirect push to="/Home" />
				</Route>
				<Route exact path={`${path}Home`} component={Home} />
				<Route exact path={`${path}AcaoDisciplinar`} component={AcaoDisciplinar} />
				<Route exact path={`${path}Campeonato`} component={Campeonato} />
				<Route exact path={`${path}Epoca`} component={Epoca} />
				<Route exact path={`${path}Equipa`} component={Equipa} />
				<Route exact path={`${path}EquipaJogador`} component={EquipaJogador} />
				<Route exact path={`${path}FaixaEtaria`} component={FaixaEtaria} />
				<Route exact path={`${path}Genero`} component={Genero} />
				<Route exact path={`${path}Jogador`} component={Jogador} />
				<Route exact path={`${path}Jogo`} component={Jogo} />
				<Route exact path={`${path}Modalidade`} component={Modalidade} />
				<Route exact path={`${path}Participante`} component={Participante} />
				<Route exact path={`${path}Pontos`} component={Pontos} />
				<Route exact path={`${path}Substituicao`} component={Substituicao} />
				<Route exact path={`${path}TipoAcaoDisciplinar`} component={TipoAcaoDisciplinar} />
				<Route exact path={`${path}TipoPontuacao`} component={TipoPontuacao} />
				<Route exact path={`${path}TipoSubstituicao`} component={TipoSubstituicao} />
				<Route exact path={`${path}VistaEstatisticas`} component={VistaEstatisticas} />

				{/*404 fallback no route matches*/}
				<Route exact path={`${path}*`} component={Home} />
			</Switch>
		</Suspense>
	)
}
export default Routes
