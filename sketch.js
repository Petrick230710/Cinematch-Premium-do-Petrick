let campoIdade, campoFantasia, campoAventura, campoAnimacao, campoDrama, campoComedia;
let ultimaRecomendacao = "";
let filmesRecomendados = [];
let bgColor;
let imgFundo;



function setup() {
  createCanvas(1000, 700);
  textFont('Montserrat');
  bgColor = color(20, 20, 40);
  
  // Cabeçalho premium
  let header = createElement("h1", "🎬 Cinematch Premium do Petrick");
  header.position(60, 20);
  header.style('color', '#FFD700');
  header.style('font-size', '32px');
  header.style('text-shadow', '2px 2px 4px #000000');
  
  // Formulário premium - Moved age input higher
  createP("📌 Sua idade:").position(40, 60).style('color', '#FFFFFF').style('font-size', '18px');
  campoIdade = createInput("10", 'number');
  campoIdade.position(60, 110).size(120).style('font-size', '16px').style('padding', '8px');
  
  let yPos = 150;
  campoFantasia = criarCheckboxEstilizado(" Gosta de fantasia?", 60, yPos); yPos += 40;
  campoAventura = criarCheckboxEstilizado(" Gosta de aventura?", 60, yPos); yPos += 40;
  campoAnimacao = criarCheckboxEstilizado(" Prefere animação?", 60, yPos); yPos += 40;
  campoDrama = criarCheckboxEstilizado(" Gosta de drama?", 60, yPos); yPos += 40;
  campoComedia = criarCheckboxEstilizado(" Gosta de comédia?", 60, yPos); yPos += 40;
  
  // Botão premium
  let botao = createButton("🎞️ Gerar Recomendação Especial");
  botao.position(20, yPos);
  botao.mousePressed(gerarNovaRecomendacao);
  botao.style('background', 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)');
  botao.style('color', '#FFFFFF');
  botao.style('padding', '12px 20px');
  botao.style('border', 'none');
  botao.style('border-radius', '25px');
  botao.style('font-size', '16px');
  botao.style('cursor', 'pointer');
  
  // Área de histórico - Moved higher (reduced gap from button)
  createP("📋 Histórico de recomendações:").position(60, yPos + 50).style('color', '#FFFFFF').style('font-size', '18px');
  
  // Footer
  createP(" 2025 Cinematch Premium do petrick - Todos os direitos reservados")
    .position(width/2 - 180, height - 30)
    .style('color', '#AAAAAA')
    .style('font-size', '12px');
}

function criarCheckboxEstilizado(rotulo, x, y) {
  let cb = createCheckbox(rotulo, false);
  cb.position(x, y);
  cb.style('color', '#FFFFFF');
  cb.style('font-size', '16px');
  cb.style('cursor', 'pointer');
  return cb;
}

function draw() {
  // Fundo com overlay escuro
  image(imgFundo, 0, 0, width, height);
  fill(0, 0, 0, 180);
  rect(0, 0, width, height);
  
  // Exibe a recomendação atual com destaque
  fill(color(255, 215, 0));
  textAlign(CENTER, CENTER);
  textSize(36);
  textStyle(BOLD);
  text(ultimaRecomendacao, width / 2, 120);
  
  // Caixa de histórico - Adjusted position to be higher
  fill(10, 10, 30, 200);
  rect(50, 350, 400, 250, 15);  // Changed y-position from 400 to 350
  
  // Exibe o histórico com estilo
  fill(255);
  textAlign(LEFT, TOP);
  textSize(16);
  textStyle(NORMAL);
  let y = 370;  // Changed from 420 to 370
  for (let i = filmesRecomendados.length - 1; i >= Math.max(0, filmesRecomendados.length - 8); i--) {
    text("🎥 " + filmesRecomendados[i], 70, y);
    y += 30;
  }
  
  // Contador de recomendações
  fill(200);
  textAlign(RIGHT, BOTTOM);
  text(`Total de recomendações: ${filmesRecomendados.length}`, width - 60, height - 60);
}

function gerarNovaRecomendacao() {
  let idade = parseInt(campoIdade.value()) || 10;
  let preferencias = {
    fantasia: campoFantasia.checked(),
    aventura: campoAventura.checked(),
    animacao: campoAnimacao.checked(),
    drama: campoDrama.checked(),
    comedia: campoComedia.checked()
  };
  
  ultimaRecomendacao = geraRecomendacao(idade, preferencias);
  
  // Adiciona ao histórico (limita a 20 itens)
  if (filmesRecomendados.length === 0 || filmesRecomendados[filmesRecomendados.length - 1] !== ultimaRecomendacao) {
    filmesRecomendados.push(ultimaRecomendacao);
    if (filmesRecomendados.length > 20) {
      filmesRecomendados.shift();
    }
  }
}

function geraRecomendacao(idade, pref) {
  // Catálogo mega premium com mais de 100 filmes
  const catalogo = {
    infantil: {
      fantasia: ["A Viagem de Chihiro", "Meu Amigo Totoro", "O Castelo Animado", "O Segredo de Kells", "O Pequeno Príncipe", "Ponyo", "O Serviço de Entregas da Kiki", "O Conto da Princesa Kaguya"],
      aventura: ["O Feitiço do Tempo", "Operação Big Hero", "Os Incríveis", "Hotel Transilvânia", "Como Treinar Seu Dragão", "Detona Ralph", "Zootopia", "Os Croods"],
      animacao: ["O Rei Leão", "Toy Story 1-4", "Procurando Nemo/Dory", "Frozen 1-2", "Moana", "Encanto", "Luca", "Red: Crescer é uma Fera"],
      drama: ["O Balão Vermelho", "O Menino e o Mundo", "O Gigante de Ferro", "O Fantástico Sr. Raposo", "O Estranho Mundo de Jack", "O Pequeno Príncipe", "O Menino Maluquinho"],
      comedia: ["Minions", "Shrek 1-4", "Os Pinguins de Madagascar", "A Escolinha do Professor Raimundo", "Mulan", "A Nova Onda do Imperador", "Madagascar"],
      geral: ["Matilda", "O Mágico de Oz", "Mary Poppins", "A Fantástica Fábrica de Chocolate", "A Bússola de Ouro", "Jumanji (1995)", "Nanny McPhee"]
    },
    preAdolescente: {
      fantasia: ["As Aventuras de Pi", "Percy Jackson", "Coraline", "A Bruxa de Blair", "O Espanta Tubarões", "Alice no País das Maravilhas", "Stardust", "O Labirinto do Fauno"],
      aventura: ["Jumanji", "Nárnia", "Indiana Jones (1-4)", "Goonies", "Hook", "A Lenda do Tesouro Perdido", "Tomb Raider", "Mortal Kombat"],
      animacao: ["Homem-Aranha: No Aranhaverso", "Soul", "Divertidamente", "Up - Altas Aventuras", "Wall-E", "Os Mitchell e as Máquinas", "Viva: A Vida é uma Festa", "Klaus"],
      drama: ["O Menino do Pijama Listrado", "Ponte para Terabítia", "A Invenção de Hugo Cabret", "O Pequeno Nicolau", "Extraordinário", "O Menino que Descobriu o Vento", "Billy Elliot"],
      comedia: ["Esqueceram de Mim", "Debi & Loide", "As Branquelas", "Todo Mundo em Pânico", "Escola de Rock", "Jumanji: Bem-Vindo à Selva", "Detetives do Prédio Azul"],
      geral: ["Depois da Chuva", "O Pequeno Príncipe", "O Menino e o Mundo", "O Jardim Secreto", "A Invenção de Hugo Cabret", "O Garoto da Bicicleta", "O Balão Branco"]
    },
    adolescente: {
      fantasia: ["Harry Potter (1-8)", "Senhor dos Anéis (1-3)", "O Hobbit (1-3)", "Crepúsculo", "Jogos Vorazes", "Divergente", "Percy Jackson", "Eragon"],
      aventura: ["Homem-Aranha: No Aranhaverso", "Avatar", "Ready Player One", "Indiana Jones (1-4)", "Piratas do Caribe (1-5)", "Missão Impossível", "John Wick", "Duna"],
      sciFi: ["Interestelar", "Matrix (1-4)", "Blade Runner 2049", "Ex Machina", "A Chegada", "Gravidade", "O Predestinado", "A Origem"],
      drama: ["A Culpa é das Estrelas", "Por Lugares Incríveis", "Sociedade dos Poetas Mortos", "O Clube dos Cinco", "Gênio Indomável", "Capitão Fantástico", "Moonlight", "Whiplash"],
      comedia: ["Superbad", "As Vantagens de Ser Invisível", "Scott Pilgrim", "Booksmart", "Juno", "O Grande Hotel Budapeste", "Brilho Eterno de uma Mente sem Lembranças"],
      geral: ["Ladrões de Bicicleta", "O Fabuloso Destino de Amélie Poulain", "A Vida é Bela", "Cinema Paradiso", "O Show de Truman", "Clube de Compras Dallas", "O Lobo de Wall Street"]
    },
    adulto: {
      drama: ["12 Anos de Escravidão", "O Sol é para Todos", "Titanic", "O Poderoso Chefão", "Cidadão Kane", "O Pianista", "Gladiador", "Forrest Gump"],
      ficcao: ["Blade Runner", "2001: Uma Odisseia no Espaço", "Donnie Darko", "O Quinto Elemento", "O Dia em que a Terra Parou", "Contato", "A Chegada", "Annihilation"],
      acao: ["Bastardos Inglórios", "Cidade de Deus", "Os Suspeitos", "Os Infiltrados", "Django Livre", "Os Oito Odiados", "Taxi Driver", "Scarface"],
      comedia: ["Se Beber, Não Case", "Apertem os Cintos", "O Lobo de Wall Street", "Borat", "Os Caça-Fantasmas", "As Patricinhas de Beverly Hills", "Debi & Loide"],
      terror: ["O Iluminado", "O Exorcista", "Hereditário", "Invocação do Mal", "Corra!", "O Babadook", "A Bruxa", "Midsommar"],
      geral: ["Pulp Fiction", "Clube da Luta", "Brilho Eterno de uma Mente sem Lembranças", "Amnésia", "Seven", "Os Bons Companheiros", "Scarface", "Goodfellas"]
    }
  };

  // Lógica de recomendação inteligente
  let faixaEtaria = idade >= 18 ? 'adulto' : 
                   idade >= 14 ? 'adolescente' : 
                   idade >= 10 ? 'preAdolescente' : 'infantil';
  
  let categoriasPrioritarias = [];
  
  // Prioriza categorias selecionadas
  if (pref.animacao) categoriasPrioritarias.push('animacao');
  if (pref.fantasia) categoriasPrioritarias.push('fantasia');
  if (pref.aventura) categoriasPrioritarias.push('aventura');
  if (pref.drama) categoriasPrioritarias.push('drama');
  if (pref.comedia) categoriasPrioritarias.push('comedia');
  
  // Se nenhuma categoria foi selecionada, usa 'geral'
  if (categoriasPrioritarias.length === 0) categoriasPrioritarias = ['geral'];
  
  // Seleciona aleatoriamente uma categoria prioritária
  let categoria = random(categoriasPrioritarias);
  
  // Garante que a categoria existe para a faixa etária
  if (!catalogo[faixaEtaria][categoria]) {
    categoria = 'geral';
  }
  
  return sample(catalogo[faixaEtaria][categoria]);
}

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
