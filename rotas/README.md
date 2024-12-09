Backend com Cassandra para Gerenciamento de Produção e Logística.

Stack:

- **MEAN Stack**: A base do backend é a stack MEAN (MongoDB, Express, Angular, Node.js), com uma diferença importante: o uso do **Cassandra**, um banco de dados NoSQL.
- **Backend**: Node.js com Express.js, um framework RESTful.
- **Banco de Dados**: Apache Cassandra (NoSQL), uma escolha robusta para lidar com grandes volumes de dados distribuídos.
- **ODM**: Utilização de **cassandra-odm**, um mapeador de objetos para interagir com o banco de dados.
- **Frontend**: Ainda não definido, mas a proposta inicial é utilizar **React**.

O Backend tem como nucleo o db Cassandra noSQL, tem como objetivo o gerenciamento de informações relacionadas as tarefas inerentes aos lotes de produção, controle de ativos, colaboradores de um ambiente de produção de mudas em viveiro. O backend irá contemplar um design modular e orientado a objetos, integrando o Cassandra com um ODM (Object-Data Mapping) levando em consideração os quesitos de escalabilidade e futuras manutenções. Esta possibillidade de se escalar a base de dados é no contexto do sistema, muito importante pois há uma real necessidade de se controlar não só um ponto de produção, mas sim um rede de pontos de produção, trocando informações constantemente em tempo real.


Funcionalidades:

    - **Gerenciamento de Colaboradores**: Criação, listagem, busca, atualização e exclusão de colaboradores. A ideia é vincular tarefas a colaboradores para rastrear responsabilidades, como quem criou e quem executará a tarefa. O uso do Cassandra ou banco relacional para dados sensíveis, como senhas, ainda está em análise.

    - **Gerenciamento de Bandejas**: Controle das unidades de produção (bandejas), com operações básicas de inserção, atualização, listagem e exclusão. Cada bandeja possui um código de identificação único.

    - **Gerenciamento de Tarefas**: Criação e gerenciamento de ordens de serviço, como transporte de lotes ou atribuições de produção. Devido ao grande volume de registros, o sistema será projetado para lidar com alta escalabilidade.

    - **Gerenciamento de Lotes**: Agrupamento de unidades de produção por características como genética ou espécie, permitindo a organização do manejo das mudas.


    .. outros modulos e até remanejamentos ainda em desenvolvimento,


Tecnologias envolvidas.

    Node.js executando backend 

    Express.js Framework RESTful

    Apache Cassandra DB noSQL 

    cassandra-driver Drive oficial de conecção com o cassandra

    cassandra-odm Mapeamento objeto que interagem com as operções do cassandra

Estrutura do servidor:

viveiro-backend/
    /app/
        /controles/
            AtivoControl.js
            BandejaMudasControl.js
            ColaboradorControl.js
            TarefaControl.js
        /modelos/
            Ativo.js
            BandejaMuda.js
            Colaborador.js
            Tarefas.js
        /esquemas/
            AtivoSchema.js
            BandejaSchema.js
            ColaboradorSchema.js
            TarefasSchema.js
        /utilitarios/
            CassandraClient.js
    /rotas/
        routes.js
    server.js
    package.json
    README.md

    Aglutinado no diretorio principal temos o diretório app que conterá os principais diretórios de estrutura, modelos de dados, esquemas, controles e utilitarios.
    
    Diretório controles contém os arquivos com as classes de criação e manipulação dos dados pelo servidor alem de conter a lógica de negócios e chama os métodos do modelo para interagir com o banco.
    
    A pasta modelos contem os arquivos javascript que implementam os modelos de dados, contém classes que representam entidades do domínio, utilizando a classe base, model fornecida pelo cassandra-odm, 
    
    No diretório esquemas temos os arquivos que definem os esquemas (schemas), especificando os campos, tipos e configurações para cada entidade.

    No aquivo server.js temos as rotas RESTful para o projeto.

    Configuração
    para clonar o repositório:
        git clone https://github.com/seu-usuario/seu-repositorio.git
        cd backend

Quanto ao Cassandra 

    Exemplo de Estrutura no Cassandra:

    Para configurar o Cassandra, crie um DataCenter e um Keyspace com a seguinte estrutura:

    localDataCenter: 'viveiroalambari'

    keyspace: 'logisticaProducao'

    contactPoints:['127.0.0.1'] // radando em servidor local
    
  


   ```sql
    CREATE KEYSPACE IF NOT EXISTS logisticaProducao
    WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 };

    CREATE TABLE IF NOT EXISTS colaboradores (
    id uuid PRIMARY KEY,
    nome text,
    email text,
    funcao text,
    setor text,
    iniciojornada text,
    fimjornada text,
    plantoes frozen<list<frozen<map<timestamp, text>>>>
    );

    Tabela colaboradores: Armazena informações sobre os colaboradores, incluindo jornada de trabalho e histórico de plantões.

    Exemplo: 
    {
        "id": "d54f7b84-998b-4cfc-89bb-77a1c52d1df6",
        "nome": "João da Silva",
        "email": "joao.silva@example.com",
        "funcao": "Técnico Agrícola",
        "setor": "Agronomia",
        "iniciojornada": "08:00",
        "fimjornada": "18:00",
        "plantoes": [
                        { "2024-12-01T08:00:00Z": "irrigação" },
                        { "2024-12-02T14:00:00Z": "colheita" }
                    ]
    }

    CREATE TABLE IF NOT EXISTS bandejas (
        id uuid PRIMARY KEY,
        codigo text,
        capacidade int,
        cor text,
        estado text,
        dataentrada timestamp,
        quesitos frozen<list<frozen<map<text, text>>>>
    );

    Exemplo :
    {
        "id": "f1eeb3c4-d82d-4be2-8b21-bd7e76a4eab0", 
        "codigo": "B001",
        "capacidade": 100,
        "cor": "Azul",
        "estado": "Disponível",
        "dataentrada": "2024-12-01T08:00:00Z",
        "quesitos": [
                        { "genetica": "Variedade A", "tipo plantio": "Direct Seed" },
                        { "lote": "Lote 123", "tipo plantio": "Transplante" }
                    ]
    }

    CREATE TABLE IF NOT EXISTS sistema.ativos (
        id uuid PRIMARY KEY,
        nome text,
        tipo text,
        localizacao text,
        estado text,
        dataaquisicao timestamp,
        imagem text,
        aream3 float,
        capacidade int,
        finalidade text,
        identificador text,
        modelo text,
        ano text,
        alimentacao text
    );

    Exemplo:
    {
        "id": "f1eeb3c4-d82d-4be2-8b21-bd7e76a4eab0",
        "nome": "Ativo 001",
        "tipo": "Máquina Agrícola",
        "localizacao": "Setor A, Fazenda X",
        "estado": "Operacional",
        "dataaquisicao": "2024-12-01T08:00:00Z",
        "imagem": "https://example.com/imagens/ativo001.jpg",
        "aream3": 50.5,
        "capacidade": 100,
        "finalidade": "Irrigação",
        "identificador": "ID-001",
        "modelo": "Modelo X200",
        "ano": "2020",
        "alimentacao": "Diesel"
    }

    CREATE TABLE IF NOT EXISTS sistema.tarefas (
        id uuid PRIMARY KEY,
        ativo uuid,
        lote uuid,
        destino uuid,
        status text,
        criado_em timestamp
    );

    Exemplo:

    {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "ativo": "123e4567-e89b-12d3-a456-426614174001",
        "lote": "123e4567-e89b-12d3-a456-426614174002",
        "destino": "123e4567-e89b-12d3-a456-426614174003",
        "status": "Em andamento",
        "criado_em": "2024-12-06T10:00:00Z"
    }

Uso

Iniciar o Servidor
Para iniciar o servidor, executa-se o comando npm start

O servidor será iniciado em http://localhost:3000.

POST	/api/tarefas	Criar um novo ativo
GET	    /api/tarefas	Listar todos os ativos

proximos a serem criados:

POST   /api/colaboradores       // Criar colaborador
GET    /api/colaboradores       // Listar todos os colaboradores
GET    /api/colaboradores/:id   // Buscar colaborador por ID
PUT    /api/colaboradores/:id   // Atualizar colaborador por ID
DELETE /api/colaboradores/:id   // Deletar colaborador por ID

Até o momento foram só configuradas duas rotas tendo em vista que nem todas regras de negocio do projeto estão bem definidas, pela estrutura ja construida em conjunto com frontend possibilita mais rotas, mas, em decorrencia de se estruturar conforme o que preposto do sistema ira disponibilizar serão muitas rotas para criar tendo em vista que alguns recursos que irão disparar ordens de servico (tarefa).