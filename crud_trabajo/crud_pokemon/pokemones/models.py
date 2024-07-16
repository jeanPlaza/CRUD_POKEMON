from django.db import models

# Create your models here.

TIPOS = [
    ('normal','Normal'),
    ('psíquico','Psíquico'),
    ('fuego','Fuego'),
    ('agua','Agua'),
    ('electrico','Electrico'),
    ('planta','Planta'),
    ('lucha','Lucha'),
    ('hielo','Hielo'),
    ('volador','Volador'),
    ('bicho','Bicho'),
    ('veneno','Veneno'),
    ('roca','Roca'),
    ('fantasma','Fantasma'),
    ('siniestro','Siniestro'),
    ('acero','Acero'),
    ('dragon','Dragon'),
    ('tierra','Tierra'),
    ('hada','Hada'),
]


REGIONES = [
    ('kanto','Kanto'),
    ('johto','Johto'),
    ('hoenn','Hoenn'),
    ('sinnoh','Sinnoh'),
    ('teselia','Teselia'),
    ('kalos','Kalos'),
    ('alola','Alola'),
    ('galar','Galar'),
    ('paldea','Paldea'),
    ('almia','Almia'),
    ('aura','Aura'),      
]

class Pokemon(models.Model):
    nombre = models.CharField(max_length=100)
    tipo1 = models.CharField(max_length=50, choices=TIPOS, default='Normal')
    tipo2 = models.CharField(max_length=50, choices=TIPOS, blank=True, null=True)
    region = models.CharField(max_length=100, choices=REGIONES, default='Kanto')  
    activo = models.BooleanField(default=True)