from rest_framework.permissions import AllowAny
from pokemones.models import Pokemon
from .serializers import PokemonSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response

class Pokemon12ViewSet(viewsets.ModelViewSet):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response({
                "message": f"Pokémon '{instance.nombre}' ha sido eliminado",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)