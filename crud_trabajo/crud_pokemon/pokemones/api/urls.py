from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Pokemon12ViewSet

router = DefaultRouter()
router.register(r'pokemons', Pokemon12ViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('pokemons/', Pokemon12ViewSet.as_view({'get': 'list', 'post': 'create'}), name='pokemon-list-create'),
    path('pokemons/<int:pk>/', Pokemon12ViewSet.as_view({
        'get': 'retrieve',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='pokemon-detail'),
]