from django.conf.urls import url
from GrupoDesportivo import views
from GrupoDesportivo import sets


urlpatterns = [
    url(r'^vista_estatisticas$', views.get_vista_estatisticas),

    url(r'^acao_disciplinar$', views.get_acao_disciplinar),
    url(r'^acao_disciplinar/(?P<acao_disciplinar_id>\w+)$', views.get_acao_disciplinar),
    url(r'^acao_disciplinar_manage$', sets.set_acao_disciplinar),

    url(r'^campeonato$', views.get_campeonatos),
    url(r'^campeonato/(?P<campeonato_id>\w+)$', views.get_campeonatos),
    url(r'^campeonato_manage$', sets.set_campeonatos),

    url(r'^epoca$', views.get_epoca),
    url(r'^epoca/(?P<epoca_id>\w+)$', views.get_epoca),
    url(r'^epoca_manage$', sets.set_epoca),

    url(r'^equipa$', views.get_equipa),
    url(r'^equipa/(?P<equipa_id>\w+)$', views.get_equipa),
    url(r'^equipa_manage$', sets.set_equipa),

    url(r'^equipa_jogador$', views.get_equipa_jogador),
    url(r'^equipa_jogador/(?P<equipa_jogador_id>\w+)$', views.get_equipa_jogador),
    url(r'^equipa_jogador_manage$', sets.set_equipa_jogador),

    url(r'^faixa_etaria$', views.get_faixa_etaria),
    url(r'^faixa_etaria/(?P<faixa_etaria_id>\w+)$', views.get_faixa_etaria),
    url(r'^faixa_etaria_manage$', sets.set_faixa_etaria),

    url(r'^generos$', views.get_generos),
    url(r'^generos/(?P<genero_id>\w+)$', views.get_generos),
    url(r'^generos_manage$', sets.set_generos),

    url(r'^jogador$', views.get_jogador),
    url(r'^jogador/(?P<jogador_id>\w+)$', views.get_jogador),
    url(r'^jogador_manage$', sets.set_jogador),

    url(r'^jogo$', views.get_jogo),
    url(r'^jogo/(?P<jogo_id>\w+)$', views.get_jogo),
    url(r'^jogo_manage$', sets.set_jogo),

    url(r'^modalidade$', views.get_modalidade),
    url(r'^modalidade/(?P<modalidade_id>\w+)$', views.get_modalidade),
    url(r'^modalidade_manage$', sets.set_modalidade),

    url(r'^participante$', views.get_participante),
    url(r'^participante/(?P<participante_id>\w+)$', views.get_participante),
    url(r'^participante_manage$', sets.set_participante),

    url(r'^pontos$', views.get_pontos),
    url(r'^pontos/(?P<pontos_id>\w+)$', views.get_pontos),
    url(r'^pontos_manage$', sets.set_pontos),

    url(r'^substituicao$', views.get_substituicao),
    url(r'^substituicao/(?P<substituicao_id>\w+)$', views.get_substituicao),
    url(r'^substituicao_manage$', sets.set_substituicao),

    url(r'^tipo_acao_disciplinar$', views.get_tipo_acao_disciplinar),
    url(r'^tipo_acao_disciplinar/(?P<tipo_acao_disciplinar_id>\w+)$', views.get_tipo_acao_disciplinar),
    url(r'^tipo_acao_disciplinar_manage$', sets.set_tipo_acao_disciplinar),

    url(r'^tipo_pontuacao$', views.get_tipo_pontuacao),
    url(r'^tipo_pontuacao/(?P<tipo_pontuacao_id>\w+)$', views.get_tipo_pontuacao),
    url(r'^tipo_pontuacao_manage$', sets.set_tipo_pontuacao),

    url(r'^tipo_substituicao$', views.get_tipo_substituicao),
    url(r'^tipo_substituicao/(?P<tipo_substituicao_id>\w+)$', views.get_tipo_substituicao),
    url(r'^tipo_substituicao_manage$', sets.set_tipo_substituicao),
]
