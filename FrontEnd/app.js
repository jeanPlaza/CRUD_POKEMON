document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('createForm');
    const pokemonList = document.getElementById('pokemonList');
    const urlBase = 'http://127.0.0.1:8000/api/pokemones/pokemons/';

    function fetchPokemonList() {
        fetch(urlBase)
            .then(response => response.json())
            .then(data => {
                pokemonList.innerHTML = '';
                data.forEach(pokemon => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${pokemon.nombre}</strong> - Tipo 1: ${pokemon.tipo1} - Tipo 2: ${pokemon.tipo2} - Región: ${pokemon.region}
                        <button onclick="deletePokemon(${pokemon.id})">Eliminar</button>
                        <button onclick="editPokemon(${pokemon.id})">Editar</button>
                    `;
                    pokemonList.appendChild(li);
                });
            });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.toLowerCase();
        const tipo1 = document.getElementById('tipo1').value.toLowerCase();
        const tipo2 = document.getElementById('tipo2').value.toLowerCase();
        const region = document.getElementById('region').value.toLowerCase();

        fetch(urlBase, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, tipo1, tipo2, region })
        })
        .then(response => {
            if (response.ok) {
                fetchPokemonList();
                form.reset();
            } else {
                throw new Error('Error en la solicitud POST');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });


    window.deletePokemon = function (pokemonId) {
        fetch(`${urlBase}${pokemonId}/`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchPokemonList();
            }
        });
    };

    window.editPokemon = function (pokemonId) {
        fetch(`${urlBase}${pokemonId}/`)
            .then(response => response.json())
            .then(pokemon => {
                showEditForm(pokemon);
            })
            .catch(error => {
                console.error('Error al obtener datos del Pokémon:', error);
            });
    };

    window.updatePokemon = function (pokemonId) {
        const editNombre = document.getElementById('editNombre').value.toLowerCase();
        const editTipo1 = document.getElementById('editTipo1').value.toLowerCase();
        const editTipo2 = document.getElementById('editTipo2').value.toLowerCase();
        const editRegion = document.getElementById('editRegion').value.toLowerCase();

        const updatedData = {
            nombre: editNombre,
            tipo1: editTipo1,
            tipo2: editTipo2,
            region: editRegion
        };

        fetch(`${urlBase}${pokemonId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (response.ok) {
                fetchPokemonList();
                $('#editModal').modal('hide');
                document.body.removeChild(document.getElementById('editModal'));
            } else {
                throw new Error('Error al actualizar el Pokémon: ' + response.status);
            }
        })
        .catch(error => {
            console.error('Error al actualizar el Pokémon:', error);
        });
    };

    function showEditForm(pokemon) {
        const editModal = document.createElement('div');
        editModal.classList.add('modal', 'fade');
        editModal.id = 'editModal';
        editModal.setAttribute('tabindex', '-1');
        editModal.setAttribute('role', 'dialog');
        editModal.setAttribute('aria-labelledby', 'editModalLabel');
        editModal.setAttribute('aria-hidden', 'true');

        editModal.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Editar Pokémon</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="editForm">
                            <div class="form-group">
                                <label for="editNombre">Nombre:</label>
                                <input type="text" class="form-control" id="editNombre" value="${pokemon.nombre}">
                            </div>
                            <div class="form-group">
                                <label for="editTipo1">Tipo 1:</label>
                                <input type="text" class="form-control" id="editTipo1" value="${pokemon.tipo1}">
                            </div>
                            <div class="form-group">
                                <label for="editTipo2">Tipo 2:</label>
                                <input type="text" class="form-control" id="editTipo2" value="${pokemon.tipo2}">
                            </div>
                            <div class="form-group">
                                <label for="editRegion">Región:</label>
                                <input type="text" class="form-control" id="editRegion" value="${pokemon.region}">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onclick="updatePokemon(${pokemon.id})">Actualizar</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(editModal);

        $('#editModal').modal('show');
        
        $('#editModal').on('hidden.bs.modal', function () {
            editModal.remove();
        });
    }


    fetchPokemonList();
});
