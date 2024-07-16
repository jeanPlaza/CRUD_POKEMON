from rest_framework import serializers
from pokemones.models import Pokemon

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = '__all__'

    def validate(self, data):
        if 'tipo1' in data:
            if not data['tipo1']:
                raise serializers.ValidationError("El campo 'tipo1' es obligatorio.")
        if 'tipo1' in data and 'tipo2' in data:
            if data['tipo1'] == data['tipo2']:
                raise serializers.ValidationError("Los tipos 'tipo1' y 'tipo2' no pueden ser iguales.")
        if 'region' in data:
            if not data['region']:
                raise serializers.ValidationError("El campo 'region' es obligatorio.")
        return data

    def update(self, instance, validated_data):
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.tipo1 = validated_data.get('tipo1', instance.tipo1)
        instance.tipo2 = validated_data.get('tipo2', instance.tipo2)
        instance.region = validated_data.get('region', instance.region)
        instance.activo = validated_data.get('activo', instance.activo)
        instance.save()
        return instance
        
