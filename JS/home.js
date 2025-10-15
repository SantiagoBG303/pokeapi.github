// Función para generar la lista de Pokémon
function generarLista(arraypokemones) {
    let listaHTML = "";
    for (let i = 0; i < arraypokemones.length; i++) {
        let id = arraypokemones[i].url.split("/")[6]; // Corregir error de variable
        listaHTML += `
        <div class="c-lista-pokemon poke-${id}" onclick="Detalle('${id}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${arraypokemones[i].name}">
            <p>${arraypokemones[i].name}</p>
        </div>`;
    }
    return listaHTML;
}

// Función para manejar el buscador
function buscadorfunction(buscadorTexto) {
    console.log(buscadorTexto);
    // Aquí puedes agregar la lógica para filtrar la lista de Pokémon por el nombre
    let filteredPokemons = pokemones.filter(pokemon => pokemon.name.toLowerCase().includes(buscadorTexto.toLowerCase()));
    const listaHTML = generarLista(filteredPokemons); // Generar la lista de Pokémon filtrada
    document.getElementById("lista-pokemones").innerHTML = listaHTML; // Actualizar la lista en el DOM
}

// Función home
function home() {
    const root = document.getElementById("root");
    root.innerHTML = "home";

    // Crear el buscador
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Pokémon...";
    buscador.addEventListener("input", () => {
        buscadorfunction(buscador.value);
    });
    root.appendChild(buscador);

    // Crear contenedor de filtro
    const tipos = [
        "normal", "fighting", "flying", "poison", "ground", "rock", "bug",
        "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice",
        "dragon", "dark", "fairy", "stellar", "unknown"
    ];

    const contenedorFiltro = document.createElement("section");
    contenedorFiltro.classList.add("tipos-container");

    // Crear botones para tipos
    for (let i = 0; i < tipos.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = tipos[i];

        // Agregar evento para filtrar por tipo
        btn.addEventListener("click", () => {
            FiltroConexion(tipos[i]); // Aquí deberías implementar la lógica de filtro
        });

        // Agregar el botón al contenedor de filtro
        contenedorFiltro.appendChild(btn);
    }

    root.appendChild(contenedorFiltro);

    // Crear el contenedor de la lista de Pokémon
    const contenedorLista = document.createElement("section");
    contenedorLista.classList.add("lista-pokemon");
    contenedorLista.id = "lista-pokemones"; // Asegúrate de agregar un ID para actualizar la lista
    const listaHTML = generarLista(pokemones); // Generar la lista inicial de Pokémon
    contenedorLista.innerHTML = listaHTML; // Asignar la lista generada al contenedor
    root.appendChild(contenedorLista);
}

// Llamar a la función home para iniciar la aplicación
home();