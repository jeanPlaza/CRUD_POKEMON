from django.contrib import admin

from pokemones.models import Pokemon

# Register your models here.
@admin.register(Pokemon)
class PokemonAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'tipo1','tipo2', 'region']