from django.db import models
import datetime


class FaixaEtaria(models.Model):
    FaixaEtaria = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.FaixaEtaria


class Modalidade(models.Model):
    Modalidade = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.Modalidade


class Genero(models.Model):
    GeneroDescricao = models.CharField(max_length=40, unique=True)

    def __str__(self):
        return self.GeneroDescricao


class TipoPontuacao(models.Model):
    TipoPontuacao = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.TipoPontuacao


class Epoca(models.Model):
    AnoInicial = models.IntegerField(default=0000)
    AnoFinal = models.IntegerField(default=0000)

    def __str__(self):
        return str(self.AnoInicial) + '/' + str(self.AnoFinal)


class Equipa(models.Model):
    NomeEquipa = models.CharField(max_length=30)
    Descricao = models.CharField(max_length=155)
    Modalidade = models.ForeignKey(Modalidade, on_delete=models.CASCADE)
    FaixaEtaria = models.ForeignKey(FaixaEtaria, on_delete=models.CASCADE)

    def __str__(self):
        return self.NomeEquipa

    @property
    def equipa_modalidade(self):
        return self.Modalidade.Modalidade

    @property
    def equipa_faixa_etaria(self):
        return self.FaixaEtaria.FaixaEtaria


class Jogador(models.Model):
    PrimeiroNome = models.CharField(max_length=30)
    UltimoNome = models.CharField(max_length=30)
    DataNascimento = models.DateField()
    Genero = models.ForeignKey(Genero, on_delete=models.CASCADE)
    Morada = models.CharField(max_length=100)
    Telemovel = models.CharField(max_length=9)

    def __str__(self):
        return str(self.PrimeiroNome) + ' ' + str(self.UltimoNome)

    @property
    def jogador_nome(self):
        return str(self.PrimeiroNome) + ' ' + str(self.UltimoNome)

    @property
    def jogador_genero(self):
        return self.Genero.GeneroDescricao


class EquipaJogador(models.Model):
    Jogador = models.ForeignKey(Jogador, on_delete=models.CASCADE)
    Equipa = models.ForeignKey(Equipa, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['Jogador', 'Equipa']

    @property
    def jogador_nome(self):
        return self.Jogador.jogador_nome

    @property
    def equipa_nome(self):
        return self.Equipa.NomeEquipa


class Campeonato(models.Model):
    NomeCampeonato = models.CharField(max_length=100)
    DescricaoCampeonato = models.CharField(max_length=255)
    Epoca = models.ForeignKey(Epoca, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['NomeCampeonato', 'Epoca']

    def __str__(self):
        return self.NomeCampeonato + ' ' + str(self.Epoca)

    @property
    def epoca_anos(self):
        return str(self.Epoca.AnoInicial) + '/' + str(self.Epoca.AnoFinal)


class Jogo(models.Model):
    Campeonato = models.ForeignKey(Campeonato, on_delete=models.CASCADE)
    DataJogo = models.DateTimeField(default=datetime.datetime.now, blank=True)

    def __str__(self):
        return 'Jogo ' + str(self.Campeonato.NomeCampeonato) + ' ' + str(self.Campeonato.Epoca)

    @property
    def jogo_campeonato(self):
        return self.Campeonato.NomeCampeonato + ' ' + self.Campeonato.epoca_anos


class Participante(models.Model):
    Jogador = models.ForeignKey(Jogador, on_delete=models.CASCADE)
    Equipa = models.ForeignKey(Equipa, on_delete=models.CASCADE)
    Jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['Jogador', 'Equipa', 'Jogo']

    def __str__(self):
        return self.Jogador.PrimeiroNome + ' ' + self.Jogador.UltimoNome

    @property
    def jogador_nome(self):
        return self.Jogador.jogador_nome

    @property
    def equipa_nome(self):
        return self.Equipa.NomeEquipa

    @property
    def jogo_campeonato(self):
        return self.Jogo.Campeonato.NomeCampeonato + ' ' + self.Jogo.Campeonato.epoca_anos

    @property
    def jogo_data(self):
        return self.Jogo.DataJogo


class TipoSubstituicao(models.Model):
    TipoSubstituicao = models.CharField(max_length=30)

    def __str__(self):
        return self.TipoSubstituicao


class Substituicao(models.Model):
    TipoSubstituicao = models.ForeignKey(TipoSubstituicao, on_delete=models.CASCADE)
    Participante = models.ForeignKey(Participante, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.Participante.Jogador) + str(self.TipoSubstituicao)

    @property
    def tipo_substituicao(self):
        return self.TipoSubstituicao.TipoSubstituicao

    @property
    def participante_nome(self):
        return self.Participante.jogador_nome


class TipoAcaoDisciplinar(models.Model):
    TipoAcaoDisciplinar = models.CharField(max_length=30)

    def __str__(self):
        return self.TipoAcaoDisciplinar


class AcaoDisciplinar(models.Model):
    TipoAcaoDisciplinar = models.ForeignKey(TipoAcaoDisciplinar, on_delete=models.CASCADE)
    Participante = models.ForeignKey(Participante, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.Participante.Jogador.PrimeiroNome) + str(self.TipoAcaoDisciplinar)

    @property
    def acao_disciplinar_tipo(self):
        return self.TipoAcaoDisciplinar.TipoAcaoDisciplinar

    @property
    def acao_disciplinar_participante(self):
        return self.Participante.jogador_nome


class Pontos(models.Model):
    Pontos = models.IntegerField(default=0)
    TipoPontuacao = models.ForeignKey(TipoPontuacao, on_delete=models.CASCADE)
    Participante = models.ForeignKey(Participante, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.Participante.Jogador.PrimeiroNome) + ' ' + str(self.Pontos) + ' ' + str(self.TipoPontuacao)

    @property
    def participante_nome(self):
        return self.Participante.jogador_nome

    @property
    def tipo_pontuacao(self):
        return self.TipoPontuacao.TipoPontuacao


class VistaMelhorJogador(models.Model):
    class Meta:
        managed = False
