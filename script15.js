
function Book (titulo, imagem, resumos, links, isbn){
  this.titulo = titulo;
  this.imagem = imagem;
  this.likes = 0;
  this.dntlikes = 0;
  this.resumos = resumos;
  this.links = links;
  this.isbn = isbn;
  this.bookshelf;

  this.like = function(){
     this.likes++;
  }

  this.dntlike = function(){
    this.dntlikes++;
  }
  this.render = function(id){

    var idTitulo = "#"+id+" .titulo";
    $(idTitulo).html(this.titulo);

    var idImagem = "#"+id+" .imagem";
    $(idImagem).attr("src", this.imagem);

    var idResumos = "#"+id+" .resumos";
    $(idResumos).html(this.resumos);

    var idIsbn = "#"+id+" .isbn";
    $(idIsbn).html(this.isbn);

    var idLike = "#"+id+" .contadorlike";
    $(idLike).html(this.likes);

    var idDntLike = "#"+id+" .contadordntlike";
    $(idDntLike).html(this.dntlikes);

    var idButton = "#"+id+" .likebutton";
    var data = {"book":this,"id":id};

    $(idButton).off('click');
    $(idButton).click(data,function(event){
        event.data.book.like();
        event.data.book.render(event.data.id);
        event.preventDefault();
       
    });

  var idButton2 = "#"+id+" .dntlikebutton";

    $(idButton2).off('click');
    $(idButton2).click(data,function(event){
        event.data.book.dntlike();
        event.data.book.render(event.data.id);
        event.data.book.bookshelf.switch(event.data.id);
        event.preventDefault();
    });

  }
}

// queue

function Queue (){
  this.data = [];

  this.enqueue = function (element){
    this.data.push(element);
  }

  this.dequeue = function (){
    return this.data.shift();
  }
}

function BookShelf (){

  var bookShelforSearch = this;

  this.shelf = new Queue();

  this.addBook = function (book){
    book.bookshelf = this;
    this.shelf.enqueue(book);
  }

  this.init = function () {
    var primeiroDeq = this.shelf.dequeue();
    var segundoDeq  = this.shelf.dequeue();
    var terceiroDeq = this.shelf.dequeue();

    primeiroDeq.render("coluna1");
    segundoDeq.render("coluna2");
    terceiroDeq.render("coluna3");
  }

  this.switch = function(coluna){
    var next = this.shelf.dequeue();
    next.render(coluna);
  }

  this.load = function(search){
    this.search = search;
    var url =  "https://www.googleapis.com/books/v1/volumes?q=" + search;
    var currentshelf = this;
    $.get (url)
      .done(function(data){
        currentshelf.parseBook(data);
      })
      .fail(function(data){
        console.log('ERROR' + data);
      })
  }

  this.parseBook = function (googlebooks){
    this.bookhein = {};
      for(i=0; i<googlebooks.items.length; i++){
        titulo = googlebooks.items[i].volumeInfo.title ? googlebooks.items[i].volumeInfo.title : "NO TITLE AVALIABLE";
        resumos = googlebooks.items[i].volumeInfo.description ? googlebooks.items[i].volumeInfo.description : "NO DESCRIPTION AVALIABLE";
        imagem = googlebooks.items[i].volumeInfo.imageLinks.thumbnail ? googlebooks.items[i].volumeInfo.imageLinks.thumbnail : "https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg";
        
        var allbooks = new Book(titulo, imagem, resumos, 0, 0);
        this.addBook(allbooks);
      }
      this.init();
  }

  this.newSearch = function(data){

  	this.data = [];

  	this.data.push(element);

  	this.addBook(allbooks);

  	this.init();

  }

  var input = this;

  $("#searchbtn").off('click');
  $("#searchbtn").click(input, function(event){
    event.input = $("#inputext").val();
    bookShelforSearch.load(event.input);
    event.preventDefault();

  })
}


var book1 = new Book("Java for Dummies", "https://images-na.ssl-images-amazon.com/images/I/51tjK8swIOL.jpg", "Do you think the programmers who work at your office are magical wizards who hold special powers that manipulate your computer? Believe it or not, anyone can learn how to write programs, and it doesn't take a higher math and science education to start.Beginning Programming for Dummies shows you how computer programming works without all the technical details or hard programming language. It explores the common parts of every computer programming language and how to write for multiple platforms like Windows, Mac OS X, or Linux. This easily accessible guide provides you with the tools you need to: Create programs and divide them into subprogramsDevelop variables and use constantsManipulate strings and convert them into numbersUse an array as storage spaceReuse and rewrite codeIsolate dataCreate a user interfaceWrite programs for the InternetUtilize JavaScript and Java Applets", ["https://www.goodreads.com/book/show/7539835-viagem-ao-centro-da-terra-as-ndias-negras", "http://www.fnac.pt/Viagem-ao-Centro-da-Terra-Julio-Verne/a301313"], 123);

var book2 = new Book("Os Maias", "http://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/7/0/2/9789897110207/tsp20110930202112/Os-Maias.jpg", "A accao de Os Maias passa-se em Lisboa, na segunda metade dos scc. XIX. Conta-nos a historia de tres gerações da familia Maia. A accao inicia-se no Outono de 1875, altura em que Afonso da Maia, nobre e rico proprietario, se instala no Ramalhete. O seu unico filho  Pedro da Maia  de caracter fraco, resultante de um educacao extremamente religiosa e proteccionista, casa-se, contra a vontade do pai, com a negreira Maria Monforte, de quem tem dois filhos , um menino e uma menina. Mas a esposa acabaria por o abandonar para fugir com um Napolitano, levando consigo a filha, de quem nunca mais se soube o paradeiro. O filho , Carlos da Maia , viria a ser entregue aos cuidados do avo, apos o suicidio de Pedro da Maia.", ["http://www.goodreads.com/book/show/1103789.Que_Farei_Com_Este_Livro_", "http://www.fnac.pt/Que-Farei-com-Este-Livro-Jose-Saramago/a5479#"], 234);

var book3 = new Book("Um Milinario em Lisboa", "http://static.fnac-static.com/multimedia/Images/PT/NR/18/27/0b/730904/1507-1.jpg", "Baseado em acontecimentos veridicos, Um Milionario em Lisboa conclui a espantosa história iniciada em O Homem de Constantinopla e transporta-nos no percurso da vida do armenio que mudou o mundo , confirmando Jose Rodrigues dos Santos como um dos maiores narradores da literatura contemporanea. Kaloust Sarkisian completa a arquitectura do negocio mundial do petroleo e torna se o homem mais rico do seculo. Dividido entre Paris e Londres, cidades em cujas suites dos hoteis Ritz mantem em permanencia uma beldade nubil, dedica-se a arte e torna se o maior coleccionador do seu tempo. Mas o destino interveio. O horror da matanca dos Armenios na Primeira Guerra Mundial e a hecatombe da Segunda Guerra Mundial levam o milionario armenio a procurar um novo sitio para viver. Apos semanas a agonizar sobre a escolha que teria de fazer, e o filho quem lhe apresenta a solucao: Lisboa. O homem mais rico do planeta decide viver no bucolico Portugal. O pais agita se, Salazar questiona se, o mundo do petroleo espanta se. E a policia portuguesa prende o.", ["http://www.goodreads.com/book/show/1103789.Que_Farei_Com_Este_Livro_", "http://www.fnac.pt/Que-Farei-com-Este-Livro-Jose-Saramago/a5479#"], 345);

var book4 = new Book("Viagem ao Centro da Terra?", "http://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/3/0/7/9789722521703/tsp20111130201806/Viagem-ao-Centro-da-Terra.jpg", "Livro recomendado pelo Plano Nacional de Leitura 3 Ciclo Leitura Autónoma Depois de descobrir e decifrar um misterioso manuscrito rúnico, onde um alquimista islandês afirma ter ido ao centro da Terra, o Professor Otto Lidenbrock, o seu sobrinho Axel e Hans, um caçador islandês, partem numa grandiosa viagem às profundezas da Terra. E é então que começa a verdadeira aventura. Um novo mundo aguarda-os, um mundo onde o tempo parou…onde os dinossauros ainda andam pelas florestas, gigantescos animais dominam os mares e homens pré-históricos habitam as cavernas. Mas conseguirá o grupo regressar a casa e abandonar um mundo repleto de perigos?", ["https://www.goodreads.com/book/show/7539835-viagem-ao-centro-da-terra-as-ndias-negras", "http://www.fnac.pt/Viagem-ao-Centro-da-Terra-Julio-Verne/a301313"], 456);

var book5 = new Book("Monstros Fantasticos e Onde encontra-los", "http://imagens.presenca.pt//products/Liv01990096_f.jpg", "Livro recomendado pelo Plano Nacional de Leitura 3 Ciclo Leitura Autónoma Depois de descobrir e decifrar um misterioso manuscrito rúnico, onde um alquimista islandês afirma ter ido ao centro da Terra, o Professor Otto Lidenbrock, o seu sobrinho Axel e Hans, um caçador islandês, partem numa grandiosa viagem às profundezas da Terra. E é então que começa a verdadeira aventura. Um novo mundo aguarda-os, um mundo onde o tempo parou…onde os dinossauros ainda andam pelas florestas, gigantescos animais dominam os mares e homens pré-históricos habitam as cavernas. Mas conseguirá o grupo regressar a casa e abandonar um mundo repleto de perigos?", ["https://www.goodreads.com/book/show/7539835-viagem-ao-centro-da-terra-as-ndias-negras", "http://www.fnac.pt/Monstros-Fantasticos-e-Onde-Encontra-los-J-K-Rowling/a1012984"], 567);

var book6 = new Book("O Que Farei com Este Livro?", "http://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/5/9/6/9789722103695.jpg", "A pergunta e formulada por Camoes, quase no final da obra, e o livro a que se refere nao poderia ser outro se nao Os Lusiadas. Que farei com este livro? Saramago decidiu fazer mais uma peça de teatro, uma obra cuja acao decorre em Almeirim e Lisboa, entre Abril de 1570 e Marco de 1572, ou com menor rigor cronologico, mas com maior exactidao, entre a chegada de Luis de Camoes e Lisboa, vindo da india e Mocambique, e a publicacao da primeira edicao de 'Os Lusiadas. Entre personagens historicas tambem ha lugar para os tais representantes do povo e para o escritor, todos a acompanhar a edicao de Os Lusiadas. Ou de um outro livro qualquer. Se eu fosse esmolar pelas ruas e praças talvez me dessem dinheiro para comer. Mas nao mo dariam se seu dissesse que o destinava a pagar ao livreiro que me imprimisse o livro. Foi Camoes ou Saramago a dize lo", ["http://www.goodreads.com/book/show/1103789.Que_Farei_Com_Este_Livro_", "http://www.fnac.pt/Que-Farei-com-Este-Livro-Jose-Saramago/a5479#"], 678);

var book7 = new Book("Escrito na Agua", "https://images.portoeditora.pt/getresourcesservlet/image?EBbDj3QnkSUjgBOkfaUbsI8xBp%2F033q5Xpv56y8baM7JuBCGM5I6L%2Bn3T3AMuWG0&width=500","Um thriller intenso, da autora do bestseller mundial A Rapariga no Comboio. Cuidado com as águas calmas. Não sabemos o que escondem no fundo. Nel vivia obcecada com as mortes no rio. O rio que atravessava aquela vila já levara a vida a demasiadas mulheres ao longo dos tempos, incluindo, recentemente, a melhor amiga da sua filha. Desde então, Nel vivia ainda mais determinada a encontrar respostas. Agora, é ela que aparece morta. Sem vestígios de crime, tudo aponta para que Nel se tenha suicidado no rio. Mas poucos dias antes da sua morte, ela deixara uma mensagem à irmã, Jules, num tom de voz urgente e assustado. Estaria Nel a temer pela sua vida? Que segredos escondem aquelas águas? Para descobrir a verdade, Jules ver-se-á forçada a enfrentar recordações e medos terríveis há muito submersos naquele rio de águas calmas, que a morte da irmã vem trazer à superfície. Um livro profundamente original e surpreendente sobre as formas devastadoras que o passado encontra para voltar a assombrar-nos no presente. Paula Hawkins confirma, de forma triunfal, a sua mestria no entendimento dos instintos humanos, numa história com tanta ou maior intensidade do que A Rapariga no Comboio", ["http://www.goodreads.com/book/show/1103789.Que_Farei_Com_Este_Livro_", "http://www.fnac.pt/Escrito-na-Agua-Paula-Hawkins/a1031038#"], 789);

var book8 = new Book("Vinte Mil Léguas Submarinas", "http://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/2/2/9/9789722522922/tsp20111130201806/Vinte-Mil-Leguas-Submarinas.jpg", "1866. Um medonho monstro marinho tem provocado o terror nos mares e causado sérios danos às ligações transatlânticas. Para tentar capturar o terrífico animal, é enviada uma expedição da qual faz parte o professor Pierre Aronnax, um eminente naturalista especializado em criaturas marinhas. Porém, para sua surpresa, o monstro não é outro senão o Naulitus, um submarino construído pelo enigmático capitão Nemo, que convida o professor e os seus companheiros de viagem, o fiel Conseil e o irascível Ned Land, a embarcarem com ele numa fabulosa jornada que os leva a percorrer vinte mil léguas pelo fundo dos oceanos", ["http://www.goodreads.com/book/show/1103789.Que_Farei_Com_Este_Livro_", "http://www.fnac.pt/Vinte-Mil-Leguas-Submarinas-Julio-Verne/a350090"], 891);

var book9 = new Book("Dracula", "http://static.fnac-static.com/multimedia/Images/PT/NR/fe/e5/0b/779774/1507-1.jpg", "Uma verdadeira obra-prima, Drácula transcendeu gerações, linguagem e cultura para tornar-se um dos romances mais populares alguma vez escritos. É por excelência uma história de suspense e horror, que ostenta um dos personagens mais terríveis que já nasceram na literatura: o conde Drácula, um espectro trágico e noturno que se alimenta do sangue dos vivos, e cujas paixões diabólicas depredam os inocentes, os desamparados, e os belos. Mas Drácula também se destaca como uma saga alegórica de um ser eternamente amaldiçoado cujas atrocidades noturnas refletem o lado sombrio da era extremamente moralista em que foi originalmente escrito - e os desejos corruptos que continuam a atormentar a condição humana moderna. ", ["http://www.goodreads.com/book/show/1103789.Que_Farei_Com_Este_Livro_", "http://www.fnac.pt/Dracula-Bram-Stoker/a785661"], 912);


var BookShelf1 = new BookShelf();

BookShelf1.load(""); 

// ********************************* BASE DE DADOS SQL LITE3 ********************************

var db = openDatabase("like.db", "1.0", "bd books", 2*1024*1024);

db.transaction(function(tx){

  //tx.executeSql("DROP TABLE USER;")
  tx.executeSql("CREATE TABLE USER("+"IP TEXT PRIMARY KEY NOT NULL"+"NAME TEXT NOT NULL"+" FOREIGN KEY (IP) REFERENCES LIKES(IP)"+");"
);
  //tx.executeSql("DROP TABLE BOOK;")
  tx.executeSql("CREATE TABLE BOOK("+"ID INTEGER PRIMARY KEY NOT NULL"+"ISBN INT NOT NULL "+"TITLE TEXT NOT NULL"+"RESUMO TEXT NOT NULL"+"FOREIGN KEY (ID) REFERENCES LIKES(ID)"+");"
);
  //tx.executeSql("DROP TABLE LIKES;")
  tx.executeSql("CREATE TABLE LIKES ("+"LIKES_COUNT INT NOT NULL"+"DISLIKES_COUNT INT NOT NULL"+"IP TEXT NOT NULL"+"ID INT NOT NULL"+"FOREIGN KEY (IP) REFERENCES USER(IP)"+" FOREIGN KEY (ID) REFERENCES BOOK(ID)"+");"
);

});

db.transaction(function(tx){

  //tx.executeSql("DELETE FROM USER;");
  tx.executeSql("INSERT INTO USER (IP, NAME) "+" VALUES (1, 'Luis'));");
  tx.executeSql("INSERT INTO USER (IP, NAME) "+" VALUES (2, 'Manolo'));");
  tx.executeSql("INSERT INTO USER (IP, NAME) "+" VALUES (3, 'Antonio'));");
  tx.executeSql("INSERT INTO USER (IP, NAME) "+" VALUES (4, 'jose'));");
  tx.executeSql("INSERT INTO USER (IP, NAME) "+" VALUES (5, 'Pedro'));");
  tx.executeSql("INSERT INTO USER (IP, NAME) "+" VALUES (6, 'Gil'));");


  //tx.executeSql("DELETE FROM BOOK;");
  tx.executeSql("INSERT INTO BOOK (ID, ISBN, TITLE, RESUMO) "+" VALUES (1, 123, 'Java for DUMMIES', 'Do you think the programmers who work at your office are magical wizards who hold special powers that manipulate your computer? Believe it or not, anyone can learn how to write programs, and it doesnt take a higher math and science education to start.Beginning Programming for Dummies shows you how computer programming works without all the technical details or hard programming language. It explores the common parts of every computer programming language and how to write for multiple platforms like Windows, Mac OS X, or Linux. This easily accessible guide provides you with the tools you need to: Create programs and divide them into subprogramsDevelop variables and use constantsManipulate strings and convert them into numbersUse an array as storage spaceReuse and rewrite codeIsolate dataCreate a user interfaceWrite programs for the InternetUtilize JavaScript and Java Applets');");

  tx.executeSql("INSERT INTO BOOK (ID, ISBN, TITLE, RESUMO) "+" VALUES (2, 234, 'Os Maias', 'A accao de Os Maias passa-se em Lisboa, na segunda metade dos scc. XIX. Conta-nos a historia de tres gerações da familia Maia. A accao inicia-se no Outono de 1875, altura em que Afonso da Maia, nobre e rico proprietario, se instala no Ramalhete. O seu unico filho  Pedro da Maia  de caracter fraco, resultante de um educacao extremamente religiosa e proteccionista, casa-se, contra a vontade do pai, com a negreira Maria Monforte, de quem tem dois filhos , um menino e uma menina. Mas a esposa acabaria por o abandonar para fugir com um Napolitano, levando consigo a filha, de quem nunca mais se soube o paradeiro. O filho , Carlos da Maia , viria a ser entregue aos cuidados do avo, apos o suicidio de Pedro da Maia.');");

  tx.executeSql("INSERT INTO BOOK (ID, ISBN, TITLE, RESUMO) "+" VALUES (3, 345, 'Um Milinario em Lisboa', 'Baseado em acontecimentos veridicos, Um Milionario em Lisboa conclui a espantosa história iniciada em O Homem de Constantinopla e transporta-nos no percurso da vida do armenio que mudou o mundo , confirmando Jose Rodrigues dos Santos como um dos maiores narradores da literatura contemporanea. Kaloust Sarkisian completa a arquitectura do negocio mundial do petroleo e torna se o homem mais rico do seculo. Dividido entre Paris e Londres, cidades em cujas suites dos hoteis Ritz mantem em permanencia uma beldade nubil, dedica-se a arte e torna se o maior coleccionador do seu tempo. Mas o destino interveio. O horror da matanca dos Armenios na Primeira Guerra Mundial e a hecatombe da Segunda Guerra Mundial levam o milionario armenio a procurar um novo sitio para viver. Apos semanas a agonizar sobre a escolha que teria de fazer, e o filho quem lhe apresenta a solucao: Lisboa. O homem mais rico do planeta decide viver no bucolico Portugal. O pais agita se, Salazar questiona se, o mundo do petroleo espanta se. E a policia portuguesa prende o');");

  tx.executeSql("INSERT INTO BOOK (ID, ISBN, TITLE, RESUMO) "+" VALUES (4, 456, 'Viagem ao Centro da Terra', 'Livro recomendado pelo Plano Nacional de Leitura 3 Ciclo Leitura Autónoma Depois de descobrir e decifrar um misterioso manuscrito rúnico, onde um alquimista islandês afirma ter ido ao centro da Terra, o Professor Otto Lidenbrock, o seu sobrinho Axel e Hans, um caçador islandês, partem numa grandiosa viagem às profundezas da Terra. E é então que começa a verdadeira aventura. Um novo mundo aguarda-os, um mundo onde o tempo parou…onde os dinossauros ainda andam pelas florestas, gigantescos animais dominam os mares e homens pré-históricos habitam as cavernas. Mas conseguirá o grupo regressar a casa e abandonar um mundo repleto de perigos?');");

  tx.executeSql("INSERT INTO BOOK (ID, ISBN, TITLE, RESUMO) "+" VALUES (5, 567, 'Monstros Fantasticos e Onde encontra-los', 'Livro recomendado pelo Plano Nacional de Leitura 3 Ciclo Leitura Autónoma Depois de descobrir e decifrar um misterioso manuscrito rúnico, onde um alquimista islandês afirma ter ido ao centro da Terra, o Professor Otto Lidenbrock, o seu sobrinho Axel e Hans, um caçador islandês, partem numa grandiosa viagem às profundezas da Terra. E é então que começa a verdadeira aventura. Um novo mundo aguarda-os, um mundo onde o tempo parou…onde os dinossauros ainda andam pelas florestas, gigantescos animais dominam os mares e homens pré-históricos habitam as cavernas. Mas conseguirá o grupo regressar a casa e abandonar um mundo repleto de perigos?');");

    //tx.executeSql("DELETE FROM LIKES;");
    tx.executeSql("INSERT INTO LIKES (LIKES_COUNT, DISLIKES_COUNT, ID, IP) "+" VALUES (1, 0, 1, 3);");
    tx.executeSql("INSERT INTO LIKES (LIKES_COUNT, DISLIKES_COUNT, ID, IP) "+" VALUES (1, 0, 2, 3);");
    tx.executeSql("INSERT INTO LIKES (LIKES_COUNT, DISLIKES_COUNT, ID, IP) "+" VALUES (0, 1, 3, 3);");
    tx.executeSql("INSERT INTO LIKES (LIKES_COUNT, DISLIKES_COUNT, ID, IP) "+" VALUES (1, 0, 4, 3);");
    tx.executeSql("INSERT INTO LIKES (LIKES_COUNT, DISLIKES_COUNT, ID, IP) "+" VALUES (1, 0, 5, 3);");

});

db.transaction(function(tx){
  tx.executeSql("SELECT * FROM USER", [], function(tx, results){

    var len = results.rows.length, i;

    for(i=0; i<len; i++){
      alert(results.rows[i]['IP']);
    }
  });

})


//a funcao que dinamiza entre base de dados e a pagina
/*function insertArtist (name, cache, typr){
  db.transaction(function(tx){
    var sql = "INSERT INTO LIKES (LIKES_COUNT, DISLIKES_COUNT, ID, IP) "+" VALUES ('"+name+"',"'CACHE'", '"+'"");";
    tx.executeSql(sql);
    });
}*/




//retirar o ID porque assim nao se pode replicar o ID da maria leal, e por consequencia apenas aparece uma pop up
  //tx.executeSql("INSERT INTO ARTIST  ( NAME, CACHE, TYPE)" + "VALUES ( 'Maria Leal', 4000.0, 'Mau');")

