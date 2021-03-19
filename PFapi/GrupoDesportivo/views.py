from django.http.response import JsonResponse
from rest_framework.decorators import api_view

from .serializers import AcaoDisciplinarSerializer, CampeonatoSerializer, EpocaSerializer, EquipaSerializer, EquipaJogadorSerializer, FaixaEtariaSerializer, GeneroSerializer, JogadorSerializer, JogoSerializer, ModalidadeSerializer, ParticipanteSerializer, PontosSerializer, SubstituicaoSerializer, TipoAcaoDisciplinarSerializer, TipoPontuacaoSerializer, TipoSubstituicaoSerializer
from .models import VistaMelhorJogador, AcaoDisciplinar, Campeonato, Epoca, Equipa, EquipaJogador, FaixaEtaria, Genero, Jogador, Jogo, Modalidade, Participante, Pontos, Substituicao, TipoAcaoDisciplinar, TipoPontuacao, TipoSubstituicao


@api_view(['GET'])
def get_vista_estatisticas(request):
    from django.db import connection
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM infoequipa")
    columns = [col[0] for col in cursor.description]
    result = ([
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ])
    return JsonResponse({'success': True, 'data': result}, safe=False)


@api_view(['GET'])
def get_acao_disciplinar(request, acao_disciplinar_id=None):
    if acao_disciplinar_id is not None:
        try:
            acao_disciplinar = AcaoDisciplinar.objects.get(id=acao_disciplinar_id)
            acao_disciplinar_serializer = AcaoDisciplinarSerializer(acao_disciplinar)
        except AcaoDisciplinar.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'A ação disciplinar selecionada não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': acao_disciplinar_serializer.data}, safe=False)
    else:
        acao_disciplinar = AcaoDisciplinar.objects.all().order_by('id')
        acao_disciplinar_serializer = AcaoDisciplinarSerializer(acao_disciplinar, many=True)
        return JsonResponse({'success': True, 'data': acao_disciplinar_serializer.data}, safe=False)


@api_view(['GET'])
def get_campeonatos(request, campeonato_id=None):
    if campeonato_id is not None:
        try:
            campeonato = Campeonato.objects.get(id=campeonato_id)
            campeonato_serializer = CampeonatoSerializer(campeonato)
        except Campeonato.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'O campeonato selecionado não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': campeonato_serializer.data}, safe=False)
    else:
        campeonato = Campeonato.objects.all().order_by('id')
        campeonato_serializer = CampeonatoSerializer(campeonato, many=True)
        return JsonResponse({'success': True, 'data': campeonato_serializer.data}, safe=False)


@api_view(['GET'])
def get_epoca(request, epoca_id=None):
    if epoca_id is not None:
        try:
            epoca = Epoca.objects.get(id=epoca_id)
            epoca_serializer = EpocaSerializer(epoca)
        except Epoca.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'A época selecionada não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': epoca_serializer.data}, safe=False)
    else:
        epoca = Epoca.objects.all().order_by('id')
        epoca_serializer = EpocaSerializer(epoca, many=True)
        return JsonResponse({'success': True, 'data': epoca_serializer.data}, safe=False)


@api_view(['GET'])
def get_equipa(request, equipa_id=None):
    if equipa_id is not None:
        try:
            equipa = Equipa.objects.get(id=equipa_id)
            equipa_serializer = EquipaSerializer(equipa)
        except Equipa.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'O campeonato selecionado não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': equipa_serializer.data}, safe=False)
    else:
        equipa = Equipa.objects.all().order_by('id')
        equipa_serializer = EquipaSerializer(equipa, many=True)
        return JsonResponse({'success': True, 'data': equipa_serializer.data}, safe=False)


@api_view(['GET'])
def get_equipa_jogador(request, equipa_jogador_id=None):
    if equipa_jogador_id is not None:
        try:
            equipa_jogador = EquipaJogador.objects.get(id=equipa_jogador_id)
            equipa_jogador_serializer = EquipaJogadorSerializer(equipa_jogador)
        except EquipaJogador.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'A EquipaJogador selecionada não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': equipa_jogador_serializer.data}, safe=False)
    else:
        equipa_jogador = EquipaJogador.objects.all().order_by('id')
        equipa_jogador_serializer = EquipaJogadorSerializer(equipa_jogador, many=True)
        return JsonResponse({'success': True, 'data': equipa_jogador_serializer.data}, safe=False)


@api_view(['GET'])
def get_faixa_etaria(request, faixa_etaria_id=None):
    if faixa_etaria_id is not None:
        try:
            faixa_etaria = FaixaEtaria.objects.get(id=faixa_etaria_id)
            faixa_etaria_serializer = FaixaEtariaSerializer(faixa_etaria)
        except FaixaEtaria.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'A faixa etária selecionada não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': faixa_etaria_serializer.data}, safe=False)
    else:
        faixa_etaria = FaixaEtaria.objects.all().order_by('id')
        faixa_etaria_serializer = FaixaEtariaSerializer(faixa_etaria, many=True)
        return JsonResponse({'success': True, 'data': faixa_etaria_serializer.data}, safe=False)


@api_view(['GET'])
def get_generos(request, genero_id=None):
    if genero_id is not None:
        try:
            genero = Genero.objects.get(id=genero_id)
            genero_serializer = GeneroSerializer(genero)
        except Genero.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'O género selecionado não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': genero_serializer.data}, safe=False)
    else:
        genero = Genero.objects.all().order_by('id')
        genero_serializer = GeneroSerializer(genero, many=True)
        return JsonResponse({'success': True, 'data': genero_serializer.data}, safe=False)


@api_view(['GET'])
def get_jogador(request, jogador_id=None):
    if jogador_id is not None:
        try:
            jogador = Jogador.objects.get(id=jogador_id)
            jogador_serializer = JogadorSerializer(jogador)
        except Jogador.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'O género selecionado não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': jogador_serializer.data}, safe=False)
    else:
        jogador = Jogador.objects.all().order_by('id')
        jogador_serializer = JogadorSerializer(jogador, many=True)
        return JsonResponse({'success': True, 'data': jogador_serializer.data}, safe=False)


@api_view(['GET'])
def get_jogo(request, jogo_id=None):
    if jogo_id is not None:
        try:
            jogo = Jogo.objects.get(id=jogo_id)
            jogo_serializer = JogoSerializer(jogo)
        except Genero.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'O jogo selecionado não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': jogo_serializer.data}, safe=False)
    else:
        jogo = Jogo.objects.all().order_by('id')
        jogo_serializer = JogoSerializer(jogo, many=True)
        return JsonResponse({'success': True, 'data': jogo_serializer.data}, safe=False)


@api_view(['GET'])
def get_modalidade(request, modalidade_id=None):
    if modalidade_id is not None:
        try:
            modalidade = Genero.objects.get(id=modalidade_id)
            modalidade_serializer = ModalidadeSerializer(modalidade)
        except Modalidade.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'A modalidade selecionada não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': modalidade_serializer.data}, safe=False)
    else:
        modalidade = Modalidade.objects.all().order_by('id')
        modalidade_serializer = ModalidadeSerializer(modalidade, many=True)
        return JsonResponse({'success': True, 'data': modalidade_serializer.data}, safe=False)


@api_view(['GET'])
def get_participante(request, participante_id=None):
    if participante_id is not None:
        try:
            participante = Participante.objects.get(id=participante_id)
            participante_serializer = ParticipanteSerializer(participante)
        except Genero.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'O participante selecionado não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': participante_serializer.data}, safe=False)
    else:
        participante = Participante.objects.all().order_by('id')
        participante_serializer = ParticipanteSerializer(participante, many=True)
        return JsonResponse({'success': True, 'data': participante_serializer.data}, safe=False)


@api_view(['GET'])
def get_pontos(request, pontos_id=None):
    if pontos_id is not None:
        try:
            pontos = Pontos.objects.get(id=pontos_id)
            pontos_serializer = PontosSerializer(pontos)
        except Pontos.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'O ponto selecionado não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': pontos_serializer.data}, safe=False)
    else:
        pontos = Pontos.objects.all().order_by('id')
        pontos_serializer = PontosSerializer(pontos, many=True)
        return JsonResponse({'success': True, 'data': pontos_serializer.data}, safe=False)


@api_view(['GET'])
def get_substituicao(request, substituicao_id=None):
    if substituicao_id is not None:
        try:
            substituicao = Substituicao.objects.get(id=substituicao_id)
            substituicao_serializer = SubstituicaoSerializer(substituicao)
        except Substituicao.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'A substituição selecionada não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': substituicao_serializer.data}, safe=False)
    else:
        substituicao = Substituicao.objects.all().order_by('id')
        substituicao_serializer = SubstituicaoSerializer(substituicao, many=True)
        return JsonResponse({'success': True, 'data': substituicao_serializer.data}, safe=False)


@api_view(['GET'])
def get_tipo_acao_disciplinar(request, tipo_acao_disciplinar_id=None):
    if tipo_acao_disciplinar_id is not None:
        try:
            tipo_acao_disciplinar = TipoAcaoDisciplinar.objects.get(id=tipo_acao_disciplinar_id)
            tipo_acao_disciplinar_serializer = TipoAcaoDisciplinarSerializer(tipo_acao_disciplinar)
        except TipoAcaoDisciplinar.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'O tipo de ação disciplinar selecionado não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': tipo_acao_disciplinar_serializer.data}, safe=False)
    else:
        tipo_acao_disciplinar = TipoAcaoDisciplinar.objects.all().order_by('id')
        tipo_acao_disciplinar_serializer = TipoAcaoDisciplinarSerializer(tipo_acao_disciplinar, many=True)
        return JsonResponse({'success': True, 'data': tipo_acao_disciplinar_serializer.data}, safe=False)


@api_view(['GET'])
def get_tipo_pontuacao(request, tipo_pontuacao_id=None):
    if tipo_pontuacao_id is not None:
        try:
            tipo_pontuacao = TipoPontuacao.objects.get(id=tipo_pontuacao_id)
            tipo_pontuacao_serializer = TipoPontuacaoSerializer(tipo_pontuacao)
        except TipoPontuacao.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'O tipo de pontuação selecionado não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': tipo_pontuacao_serializer.data}, safe=False)
    else:
        tipo_pontuacao = TipoPontuacao.objects.all().order_by('id')
        tipo_pontuacao_serializer = TipoPontuacaoSerializer(tipo_pontuacao, many=True)
        return JsonResponse({'success': True, 'data': tipo_pontuacao_serializer.data}, safe=False)


@api_view(['GET'])
def get_tipo_substituicao(request, tipo_substituicao_id=None):
    if tipo_substituicao_id is not None:
        try:
            tipo_substituicao = TipoSubstituicao.objects.get(id=tipo_substituicao_id)
            tipo_substituicao_serializer = TipoSubstituicaoSerializer(tipo_substituicao)
        except TipoSubstituicao.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'O tipo de substituição selecionado não existe.'}, safe=False)
        return JsonResponse({'success': True, 'data': tipo_substituicao_serializer.data}, safe=False)
    else:
        tipo_substituicao = TipoSubstituicao.objects.all().order_by('id')
        tipo_substituicao_serializer = TipoSubstituicaoSerializer(tipo_substituicao, many=True)
        return JsonResponse({'success': True, 'data': tipo_substituicao_serializer.data}, safe=False)

