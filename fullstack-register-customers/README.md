------------------------------------------- BACK ----------------------------------------------------------------------------------   
Comandos de inicialização:			
npm init -y			
			
Para instalar todas as dependências listadas nesse arquivo, você pode usar o comando npm install ou yarn install, dependendo de qual gerenciador de pacotes você está usando.

Aqui estão os passos gerais:

Navegue até o Diretório do Projeto:
Abra um terminal e navegue até o diretório do projeto onde está localizado o arquivo package.json.

cd caminho/do/seu/projeto
Instale as Dependências com npm:
Se estiver usando o npm, execute o seguinte comando:

-------npm install-----
Instale as Dependências com Yarn:
Se estiver usando o Yarn, execute o seguinte comando:

--------yarn install--------
Esses comandos instalarão todas as dependências listadas no arquivo package.json. O arquivo package-lock.json (ou yarn.lock se você estiver usando o Yarn) será gerado para travar as versões exatas das dependências.

Lembre-se de que você deve ter o Node.js e o npm (ou Yarn) instalados localmente em seu sistema para executar esses comandos.

Se você estiver trabalhando em um projeto TypeScript, também pode haver a necessidade de instalar as definições de tipos do TypeScript. Você pode fazer isso executando:


------npm install --save-dev @types/node--------
ou

---------yarn add --dev @types/node------------
Esses comandos instalarão as definições de tipos do Node.js para TypeScript.

Depois de executar esses comandos, configure seu ambiente de desenvolvimento para aplicar as migrações.

--------------------migração---------------------------
Passo a passo:

Para migrações dinâmicas, no package.json em scripts adicione:
   "typeorm": "typeorm-ts-node-commonjs",
   "typeorm:generate": "typeorm-ts-node-commonjs migration:generate -d src/data-source",
   "typeorm:run": "typeorm-ts-node-commonjs migration:run -d src/data-source"


comando para gerar a migração: (criar todo BD) 
npm run typeorm:generate src/migrations/nomeDaMigration 

comando para executar as migrações:- Criar todas Entities, tabelas e relacionamentos.
npm run typeorm:run

comando para reverter a migração: (excluir tabela)
npm run typeorm migration:revert -- -d src/data-source


se estiver usando npm não esquecer do --
se estiver usando yarn não precisa do --

------------------------------ENV----------------------------------------
Siga os passos do .env.example e crie um .env com sua informações.

PORT=application_run_port
DATABASE_URL="postgres://user:password@host:port/db"
SECRET_KEY=jwt_secret_key
EXPIRES_IN=jwt_expires_in

-----------------gitignore------------------------------------------------
node_modules/
dist/
.env

--------------BACK------------------
O back está fazendo todo o crud, da parte de clientes
e de contatos
						
			
						
			
			