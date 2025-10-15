// --- 1️⃣ Variable global para guardar todos los Pokémon ---
let pokemones = [];

// --- 2️⃣ Función para cargar la lista desde la API ---
async function cargarPokemones() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await res.json();
        pokemones = data.results; // guarda los primeros 151
        const listaHTML = generarLista(pokemones);
        document.getElementById("lista-pokemones").innerHTML = listaHTML;
    } catch (error) {
        console.error("Error cargando pokemones:", error);
        document.getElementById("lista-pokemones").innerHTML = "<p>Error cargando Pokémon</p>";
    }
}

// --- 3️⃣ Función Detalle: muestra info de un Pokémon ---
async function Detalle(id) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        const root = document.getElementById("root");
        root.innerHTML = `
            <section class="c-detalle">
                <button onclick="home()">⬅️ Volver</button>
                <h2>${data.name.toUpperCase()}</h2>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" height="150">
                <p><strong>Altura:</strong> ${data.height / 10} m</p>
                <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                <p><strong>Tipos:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
                <p><strong>HP:</strong> ${data.stats[0].base_stat}</p>
                <p><strong>Ataque:</strong> ${data.stats[1].base_stat}</p>
                <p><strong>Defensa:</strong> ${data.stats[2].base_stat}</p>
            </section>
        `;
    } catch (error) {
        console.error("Error mostrando detalle:", error);
        document.getElementById("root").innerHTML = `<p>Error al mostrar el Pokémon</p>`;
    }
}

// --- 4️⃣ Función FiltroConexion: filtra por tipo ---
async function FiltroConexion(tipo) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
        const data = await res.json();
        const lista = data.pokemon.slice(0, 30); // solo 30 para no saturar

        // Convertimos al mismo formato que usa tu generarLista()
        const arraypokemones = lista.map(p => ({
            name: p.pokemon.name,
            url: p.pokemon.url
        }));

        const listaHTML = generarLista(arraypokemones);
        document.getElementById("lista-pokemones").innerHTML = listaHTML;
    } catch (error) {
        console.error("Error filtrando por tipo:", error);
        document.getElementById("lista-pokemones").innerHTML = `<p>Error cargando tipo ${tipo}</p>`;
    }
}

// --- 5️⃣ Cargar los pokemones cuando se entra a "home" ---
const oldHome = home; // guardamos tu función original

home = function () {
    oldHome(); // llamamos tu home normal
    cargarPokemones(); // agregamos carga desde la API
};
