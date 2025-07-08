document.addEventListener("DOMContentLoaded", () => {

  // FLIP DOS CARDS
  const cards = document.querySelectorAll('.card');
  if (cards.length > 0) {
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });
  }

  // MODAL DE SIGNIFICADO
  const fechar = document.querySelector(".fechar");
  const modal = document.getElementById("modal-significado");
  if (fechar && modal) {
    fechar.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", e => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // JOGO DE ORDENAR (com suporte a celular)
  const lista = document.getElementById("lista-mandamentos");
  const verificarBtn = document.getElementById("verificar");

  if (lista && verificarBtn) {
    criarListaOrdenavel();

    verificarBtn.addEventListener("click", () => {
      const itens = document.querySelectorAll("#lista-mandamentos li");
      const ordemAtual = [...itens].map((li) => li.textContent.trim());

      const correta = ordemAtual.every((txt, i) => txt === mandamentosOrdenados[i]);
      const feedback = document.getElementById("feedback-ordem");

      if (correta) {
        feedback.innerHTML = `
          <span class="acerto">🎉 Parabéns! Você concluiu todos os desafios com sucesso!</span>
          <div style="margin-top: 20px; font-size: 18px;">
            Agora você conhece bem os Dez Mandamentos! Que tal revisar ou compartilhar com alguém?
          </div>
          <div class="proximo-passo" style="margin-top: 30px;">
            <a href="index.html">
              <button class="btn-avancar">Voltar ao Início</button>
            </a>
          </div>
        `;
      } else {
        feedback.innerHTML = `<span class="erro">❌ Ainda não está correto. Tente ajustar a ordem.</span>`;
      }
    });
  }
});

// --------------------------------------
// SIGNIFICADOS DOS MANDAMENTOS
const significadosMandamentos = {
  1: "Devemos adorar somente a Deus.",
  2: "Não devemos criar ou adorar ídolos ou imagens que possam substituir a adoração a Deus.",
  3: "Tratar o nome de Deus com respeito e reverência, evitando usá-lo de forma leviana ou desrespeitosa.",
  4: "Devemos reservar um dia da semana para descansar e dedicar um tempo para Deus.",
  5: "Importância do respeito, amor e cuidado aos pais.",
  6: "A vida é sagrada e devemos respeitar e proteger a vida dos outros.",
  7: "Importância da fidelidade nos relacionamentos.",
  8: "Não devemos roubar ou tomar o que pertence aos outros.",
  9: "Ser verdadeiros e justos nas nossas palavras sobre os outros.",
  10: "Evitar desejos excessivos por aquilo que não é nosso."
};

function mostrarSignificado(numero) {
  const modal = document.getElementById("modal-significado");
  const titulo = document.getElementById("modal-titulo");
  const texto = document.getElementById("modal-texto");

  titulo.innerText = `Significado do ${numero}º Mandamento`;
  texto.innerText = significadosMandamentos[numero];

  modal.style.display = "flex";
}

// --------------------------------------
// ORDEM CORRETA DOS MANDAMENTOS
const mandamentosOrdenados = [
  "Não terás outros deuses diante de Deus.",
  "Não farás para ti imagem de escultura.",
  "Não tomar seu santo nome em vão.",
  "Lembra-te do dia de sábado.",
  "Honrar Pai e Mãe.",
  "Não matarás.",
  "Não adulterarás.",
  "Não furtarás.",
  "Não dirás falso testemunho contra o próximo.",
  "Não cobiçarás."
];

// NOVA VERSÃO com SortableJS (funciona em celular!)
function criarListaOrdenavel() {
  const lista = document.getElementById("lista-mandamentos");
  const embaralhada = [...mandamentosOrdenados].sort(() => Math.random() - 0.5);

  lista.innerHTML = "";

  embaralhada.forEach((texto) => {
    const li = document.createElement("li");
    li.textContent = texto;
    li.classList.add("item-mandamento");
    lista.appendChild(li);
  });

  // Ativa o SortableJS (funciona em celular)
  Sortable.create(lista, {
    animation: 150,
    ghostClass: "dragando"
  });
}
