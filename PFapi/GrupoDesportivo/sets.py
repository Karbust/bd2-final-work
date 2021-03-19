from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.utils import json

from .serializers import AcaoDisciplinarSerializer, CampeonatoSerializer, EpocaSerializer, EquipaSerializer, \
    EquipaJogadorSerializer, FaixaEtariaSerializer, GeneroSerializer, JogadorSerializer, JogoSerializer, \
    ModalidadeSerializer, ParticipanteSerializer, PontosSerializer, SubstituicaoSerializer, \
    TipoAcaoDisciplinarSerializer, TipoPontuacaoSerializer, TipoSubstituicaoSerializer
from .models import AcaoDisciplinar, Campeonato, Epoca, Equipa, EquipaJogador, FaixaEtaria, Genero, \
    Jogador, Jogo, Modalidade, Participante, Pontos, Substituicao, TipoAcaoDisciplinar, TipoPontuacao, TipoSubstituicao


@api_view(['POST', 'DELETE', 'PUT'])
def set_acao_disciplinar(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        acao_disciplinar_serializer = AcaoDisciplinarSerializer(data=values)
        if acao_disciplinar_serializer.is_valid():
            acao_disciplinar_serializer.save()
            return JsonResponse({'success': True, 'message': 'Ação disciplinar criada com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar a ação disciplinar.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        AcaoDisciplinar.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Ação disciplinar apagada com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        AcaoDisciplinar.objects.filter(id=request.PUT['id']).update(TipoAcaoDisciplinar=request.PUT['TipoAcaoDisciplinar'], Participante=request.PUT['Participante'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_campeonatos(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        campeonato_serializer = CampeonatoSerializer(data=values)
        if campeonato_serializer.is_valid():
            campeonato_serializer.save()
            return JsonResponse({'success': True, 'message': 'Campeonato criado com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar o campeonato.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        Campeonato.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Campeonato apagado com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        Campeonato.objects.filter(id=request.PUT['id']).update(NomeCampeonato=request.PUT['NomeCampeonato'], DescricaoCampeonato=request.PUT['DescricaoCampeonato'], Epoca=request.PUT['Epoca'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_epoca(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        epoca_serializer = EpocaSerializer(data=values)
        if epoca_serializer.is_valid():
            epoca_serializer.save()
            return JsonResponse({'success': True, 'message': 'Época criada com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar a época.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        Epoca.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Época apagada com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        Epoca.objects.filter(id=request.PUT['id']).update(AnoInicial=request.PUT['AnoInicial'], AnoFinal=request.PUT['AnoFinal'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_equipa(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        equipa_serializer = EquipaSerializer(data=values)
        if equipa_serializer.is_valid():
            equipa_serializer.save()
            return JsonResponse({'success': True, 'message': 'Equipa criada com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar a equipa.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        Equipa.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Equipa apagada com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        Equipa.objects.filter(id=request.PUT['id']).update(NomeEquipa=request.PUT['NomeEquipa'], Descricao=request.PUT['Descricao'], Modalidade=request.PUT['Modalidade'], FaixaEtaria=request.PUT['FaixaEtaria'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_equipa_jogador(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        equipa_jogador_serializer = EquipaJogadorSerializer(data=values)
        if equipa_jogador_serializer.is_valid():
            equipa_jogador_serializer.save()
            return JsonResponse({'success': True, 'message': 'EquipaJogador criada com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar a EquipaJogador.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        EquipaJogador.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Combinação equipa jogador apagada com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        EquipaJogador.objects.filter(id=request.PUT['id']).update(Jogador=request.PUT['Jogador'], Equipa=request.PUT['Equipa'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_faixa_etaria(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        epoca_serializer = FaixaEtariaSerializer(data=values)
        if epoca_serializer.is_valid():
            epoca_serializer.save()
            return JsonResponse({'success': True, 'message': 'Faixa etária criada com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar a faixa etária.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        FaixaEtaria.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Faixa etária apagada com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        FaixaEtaria.objects.filter(id=request.PUT['id']).update(FaixaEtaria=request.PUT['FaixaEtaria'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_generos(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        genero_serializer = GeneroSerializer(data=values)
        if genero_serializer.is_valid():
            genero_serializer.save()
            return JsonResponse({'success': True, 'message': 'Género criado com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar o género.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        Genero.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Género apagado com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        Genero.objects.filter(id=request.PUT['id']).update(GeneroDescricao=request.PUT['GeneroDescricao'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_jogador(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        jogador_serializer = JogadorSerializer(data=values)
        if jogador_serializer.is_valid():
            jogador_serializer.save()
            return JsonResponse({'success': True, 'message': 'Jogador criado com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar o jogador.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        Jogador.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Jogador apagado com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        Jogador.objects.filter(id=request.PUT['id']).update(PrimeiroNome=request.PUT['PrimeiroNome'], UltimoNome=request.PUT['UltimoNome'], DataNascimento=request.PUT['DataNascimento'], Genero=request.PUT['Genero'], Morada=request.PUT['Morada'], Telemovel=request.PUT['Telemovel'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_jogo(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        jogo_serializer = JogoSerializer(data=values)
        if jogo_serializer.is_valid():
            jogo_serializer.save()
            return JsonResponse({'success': True, 'message': 'Jogo criada com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar o jogo.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        Jogo.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Jogo apagado com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        Jogo.objects.filter(id=request.PUT['id']).update(Campeonato=request.PUT['Campeonato'], DataJogo=request.PUT['DataJogo'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_modalidade(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        modalidade_serializer = ModalidadeSerializer(data=values)
        if modalidade_serializer.is_valid():
            modalidade_serializer.save()
            return JsonResponse({'success': True, 'message': 'Modalidade criada com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar a modalidade.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        Modalidade.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Modalidade apagada com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        Modalidade.objects.filter(id=request.PUT['id']).update(Modalidade=request.PUT['Modalidade'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_participante(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        participante_serializer = ParticipanteSerializer(data=values)
        if participante_serializer.is_valid():
            participante_serializer.save()
            return JsonResponse({'success': True, 'message': 'Participante criado com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar o participante.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        Participante.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Participante apagado com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        Participante.objects.filter(id=request.PUT['id']).update(Jogador=request.PUT['Jogador'], Equipa=request.PUT['Equipa'], Jogo=request.PUT['Jogo'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_pontos(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        pontos_serializer = PontosSerializer(data=values)
        if pontos_serializer.is_valid():
            pontos_serializer.save()
            return JsonResponse({'success': True, 'message': 'Pontos adicionados com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao adicionar os pontos.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        Pontos.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Ponto apagado com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        Pontos.objects.filter(id=request.PUT['id']).update(Pontos=request.PUT['Pontos'], TipoPontuacao=request.PUT['TipoPontuacao'], Participante=request.PUT['Participante'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_substituicao(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        substituicao_serializer = SubstituicaoSerializer(data=values)
        if substituicao_serializer.is_valid():
            substituicao_serializer.save()
            return JsonResponse({'success': True, 'message': 'Substituição criada com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar a substituição.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        Substituicao.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Substituição apagada com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        Substituicao.objects.filter(id=request.PUT['id']).update(TipoSubstituicao=request.PUT['TipoSubstituicao'], Participante=request.PUT['Participante'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_tipo_acao_disciplinar(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        tipo_acao_disciplinar_serializer = TipoAcaoDisciplinarSerializer(data=values)
        if tipo_acao_disciplinar_serializer.is_valid():
            tipo_acao_disciplinar_serializer.save()
            return JsonResponse({'success': True, 'message': 'Tipo de ação disciplinar criado com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar o tipo de ação disciplinar.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        TipoAcaoDisciplinar.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Tipo de ação disciplinar apagado com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        TipoAcaoDisciplinar.objects.filter(id=request.PUT['id']).update(TipoAcaoDisciplinar=request.PUT['TipoAcaoDisciplinar'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_tipo_pontuacao(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        tipo_pontuacao_serializer = TipoPontuacaoSerializer(data=values)
        if tipo_pontuacao_serializer.is_valid():
            tipo_pontuacao_serializer.save()
            return JsonResponse({'success': True, 'message': 'Tipo de pontuação criado com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar o tipo de pontuação.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        TipoPontuacao.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Tipo de pontuação apagado com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        TipoPontuacao.objects.filter(id=request.PUT['id']).update(TipoPontuacao=request.PUT['TipoPontuacao'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE', 'PUT'])
def set_tipo_substituicao(request):
    if request.method == 'POST':
        values = json.loads(request.body.decode('utf-8'))
        tipo_substituicao_serializer = TipoSubstituicaoSerializer(data=values)
        if tipo_substituicao_serializer.is_valid():
            tipo_substituicao_serializer.save()
            return JsonResponse({'success': True, 'message': 'Tipo de substituição criado com sucesso.'}, status=status.HTTP_201_CREATED)
        return JsonResponse({'success': False, 'message': 'Ocorreu um erro ao criar o tipo de substituição.'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        TipoSubstituicao.objects.get(id=request.DELETE['id']).delete()
        return JsonResponse({'success': True, 'message': 'Tipo de substituição apagado com sucesso.'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        TipoSubstituicao.objects.filter(id=request.PUT['id']).update(TipoSubstituicao=request.PUT['TipoSubstituicao'])
        return JsonResponse({'success': True, 'message': 'Atualizado com sucesso.'}, status=status.HTTP_200_OK)
