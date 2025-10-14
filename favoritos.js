function GenerarLista(arrayPokemones) {
    let listaHTML = "";
    for (let i = 0; i < arrayPokemones.length; i++) {
        // Aquí extraemos el id de la url, asumiendo que la url es del tipo "https://pokeapi.co/api/v2/pokemon/9/"
        let urlPartes = arrayPokemones[i].url.split('/');
        let id = urlPartes[urlPartes.length - 2]; // El penúltimo elemento es el ID

        listaHTML += `
        <div class="c-lista-pokemon poke-${id}" onclick="pokemon(${id})" style="cursor:pointer;">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${arrayPokemones[i].name}">
            <p>${arrayPokemones[i].name}</p>
        </div>`;
    }
    return listaHTML;
}

function favoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let root = document.getElementById("root");

    if (favoritos.length === 0) {
        root.innerHTML = "<p>No hay favoritos.</p>";
    } else {
        root.innerHTML = GenerarLista(favoritos);
    }
}