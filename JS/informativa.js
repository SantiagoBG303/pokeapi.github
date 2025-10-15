function informativa() {
  document.getElementById("root").innerHTML = `
    <section style="text-align:center; padding:20px;">
      <img src="pokemon.png" 
           alt="Imagen informativa"
           style="width:90%; max-width:700px; height:auto; border-radius:25px; box-shadow:0 4px 15px rgba(0,0,0,0.2);">
    </section>
  `;
}

window.informativa = informativa;
