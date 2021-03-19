from rest_framework import serializers

from .models import FaixaEtaria, Modalidade, Genero, TipoPontuacao, Epoca, Equipa, Jogador, EquipaJogador, Campeonato, Jogo, Participante, TipoSubstituicao, Substituicao, TipoAcaoDisciplinar, AcaoDisciplinar, Pontos


class AcaoDisciplinarSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcaoDisciplinar
        fields = ('id', 'TipoAcaoDisciplinar', 'Participante', 'acao_disciplinar_tipo', 'acao_disciplinar_participante')


class CampeonatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campeonato
        fields = ('id', 'NomeCampeonato', 'DescricaoCampeonato', 'Epoca', 'epoca_anos')


class EpocaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Epoca
        fields = ('id', 'AnoInicial', 'AnoFinal')


class EquipaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipa
        fields = ('id', 'NomeEquipa', 'Descricao', 'Modalidade', 'FaixaEtaria', 'equipa_modalidade', 'equipa_faixa_etaria')


class EquipaJogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipaJogador
        fields = ('id', 'Jogador', 'Equipa', 'jogador_nome', 'equipa_nome')


class FaixaEtariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaixaEtaria
        fields = ('id', 'FaixaEtaria')


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = ('id', 'GeneroDescricao')


class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogador
        fields = ('id', 'PrimeiroNome', 'UltimoNome', 'DataNascimento', 'Genero', 'Morada', 'Telemovel', 'jogador_genero')


class JogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogo
        fields = ('id', 'Campeonato', 'DataJogo', 'jogo_campeonato')


class ModalidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modalidade
        fields = ('id', 'Modalidade')


class ParticipanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participante
        fields = ('id', 'Jogador', 'Equipa', 'Jogo', 'jogador_nome', 'equipa_nome', 'jogo_campeonato', 'jogo_data')


class PontosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pontos
        fields = ('id', 'Pontos', 'TipoPontuacao', 'Participante', 'participante_nome', 'tipo_pontuacao')


class SubstituicaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Substituicao
        fields = ('id', 'TipoSubstituicao', 'Participante', 'tipo_substituicao', 'participante_nome')


class TipoAcaoDisciplinarSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoAcaoDisciplinar
        fields = ('id', 'TipoAcaoDisciplinar')


class TipoPontuacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPontuacao
        fields = ('id', 'TipoPontuacao')


class TipoSubstituicaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoSubstituicao
        fields = ('id', 'TipoSubstituicao')