let pokemones = [];

// Función para obtener todos los Pokémon desde la API
async function obtenerPokemones() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await res.json();
    pokemones = data.results;
    mostrarLista(pokemones);
  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
  }
}

// Función para mostrar la lista en pantalla
function mostrarLista(lista) {
  const contenedor = document.getElementById("lista-pokemones");
  if (!contenedor) return;

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  let html = "";
  for (let i = 0; i < lista.length; i++) {
    const id = lista[i].url.split("/")[6];
    const esFavorito = favoritos.some(p => p.name === lista[i].name);

    html += `
      <div class="c-lista-pokemon poke-${id}">
        <p>#${id}</p>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${lista[i].name}">
        <p>${lista[i].name}</p>
        <button class="btn-fav" id="fav-${id}">${esFavorito ? "❤️" : "🤍"}</button>
      </div>
    `;
  }

  contenedor.innerHTML = html;

  // Agregar eventos a los corazones
  lista.forEach(poke => {
    const id = poke.url.split("/")[6];
    const boton = document.getElementById(`fav-${id}`);
    if (boton) {
      boton.addEventListener("click", e => {
        e.stopPropagation(); // evita que se abra el detalle
        toggleFavorito(id, poke.name);
        // Actualizar el ícono
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const esAhoraFavorito = favoritos.some(p => p.name === poke.name);
        boton.textContent = esAhoraFavorito ? "❤️" : "🤍";
      });
    }
  });
}

// Función para alternar favoritos
function toggleFavorito(id, name) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const existe = favoritos.some(p => p.name === name);

  if (existe) {
    favoritos = favoritos.filter(p => p.name !== name);
  } else {
    favoritos.push({
      name: name,
      url: `https://pokeapi.co/api/v2/pokemon/${id}/`
    });
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Función de buscador
function buscadorfunction(buscadorTexto) {
  const filtrados = pokemones.filter(p =>
    p.name.toLowerCase().includes(buscadorTexto.toLowerCase())
  );
  mostrarLista(filtrados);
}

// Filtrar por tipo
async function FiltroConexion(tipo) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const data = await res.json();
    const pokesTipo = data.pokemon.map(p => p.pokemon);
    mostrarLista(pokesTipo);
  } catch (error) {
    console.error("Error al filtrar por tipo:", error);
  }
}

// Función principal HOME
function home() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  // Buscador
  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "Buscar Pokémon...";
  buscador.addEventListener("input", () => buscadorfunction(buscador.value));
  root.appendChild(buscador);

  // Botones de tipos
  const tipos = [
    "normal", "fighting", "flying", "poison", "ground", "rock", "bug",
    "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice",
    "dragon", "dark", "fairy", "stellar"
  ];

  const contenedorFiltro = document.createElement("section");
  contenedorFiltro.classList.add("tipos-container");

  tipos.forEach(tipo => {
    const btn = document.createElement("button");
    btn.textContent = tipo;
    btn.addEventListener("click", () => FiltroConexion(tipo));
    contenedorFiltro.appendChild(btn);
  });

  // Botón mostrar todos
  const btnMostrarTodos = document.createElement("button");
  btnMostrarTodos.textContent = "Mostrar Todos";
  btnMostrarTodos.addEventListener("click", () => mostrarLista(pokemones));
  contenedorFiltro.appendChild(btnMostrarTodos);

  root.appendChild(contenedorFiltro);

  // Lista
  const contenedorLista = document.createElement("section");
  contenedorLista.classList.add("lista-pokemon");
  contenedorLista.id = "lista-pokemones";
  root.appendChild(contenedorLista);

  obtenerPokemones();
}

// Iniciar la app
home();
