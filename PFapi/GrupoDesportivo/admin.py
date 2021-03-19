from django.contrib import admin

from .models import FaixaEtaria
from .models import Modalidade
from .models import Genero
from .models import TipoPontuacao
from .models import Epoca
from .models import Equipa
from .models import Jogador
from .models import EquipaJogador
from .models import Campeonato
from .models import Jogo
from .models import Participante
from .models import TipoSubstituicao
from .models import Substituicao
from .models import TipoAcaoDisciplinar
from .models import AcaoDisciplinar
from .models import Pontos

admin.site.register(FaixaEtaria)
admin.site.register(Modalidade)
admin.site.register(Genero)
admin.site.register(TipoPontuacao)
admin.site.register(Epoca)
admin.site.register(Equipa)


@admin.register(EquipaJogador)
class EquipaJogadorAdmin(admin.ModelAdmin):
    list_display = ("Jogador", "Equipa")


@admin.register(Jogador)
class JogadorAdmin(admin.ModelAdmin):
    list_display = ("PrimeiroNome", "UltimoNome", "DataNascimento", "Genero", "Morada", "Telemovel")


@admin.register(Campeonato)
class CampeonatoAdmin(admin.ModelAdmin):
    list_display = ("NomeCampeonato", "DescricaoCampeonato", "Epoca")


@admin.register(Jogo)
class JogoAdmin(admin.ModelAdmin):
    list_display = ("Campeonato", "DataJogo")


@admin.register(Participante)
class ParticipanteAdmin(admin.ModelAdmin):
    list_display = ("Jogador", "Equipa", "Jogo")


admin.site.register(TipoSubstituicao)


@admin.register(Substituicao)
class SubstituicaoAdmin(admin.ModelAdmin):
    list_display = ("Participante", "TipoSubstituicao")


admin.site.register(TipoAcaoDisciplinar)


@admin.register(AcaoDisciplinar)
class AcaoDisciplinarAdmin(admin.ModelAdmin):
    list_display = ("Participante", "TipoAcaoDisciplinar")


@admin.register(Pontos)
class PontosAdmin(admin.ModelAdmin):
    list_display = ("Participante", "Pontos", "TipoPontuacao")
