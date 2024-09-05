<div align="center">
  <h1 align="center">
    Cadastro e Login
    <br />
    <br />
    <a>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDgVLsmsnPEZldXF5vqXUPgQgOkQbbNoQ5ow&s">
    </a>
  </h1>
</div>

<p align="center">
  <a><img src="https://opencollective.com/Docusaurus/backers/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/@docusaurus/core"><img src="https://img.shields.io/npm/v/@docusaurus/core.svg?style=flat" alt="npm version"></a>
  <a href="https://gitpod.io/#https://github.com/facebook/docusaurus"><img src="https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod" alt="Gitpod Ready-to-Code"/></a>
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffacebook%2Fdocusaurus%2Ftree%2Fmain%2Fexamples%2Fclassic&project-name=my-docusaurus-site&repo-name=my-docusaurus-site"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

## introdução

O login e o cadastro são realizados na página inicial do site, seguindo a prática comum. A estrutura do site é organizada com painéis laterais que permitem aos usuários criar e gerenciar suas tarefas de forma eficiente. Além disso, os usuários podem visualizar a data em que cada tarefa foi concluída.

Para o desenvolvimento do projeto, utilizei React para o front-end e Node.js para o back-end. O sistema é composto por um total de 12 arquivos, sendo que cada um desempenha uma função específica dentro da aplicação.

**Dica**: Para iniciar o projeto em seu computador, abra o arquivo app.js no terminal (cmd) e execute o comando npm start, o index.js no backe-end node index.js. Isso iniciará a aplicação e permitirá que você comece a utilizá-la. Com isso, você poderá acessar a aplicação em seu navegador, utilizando o frontend na porta 3000 e o backend na porta 3001.

- **Start do documento**
> Para garantir o funcionamento completo do projeto, é necessário iniciar tanto o front-end quanto o back-end. Para o front-end, siga as instruções anteriores e execute o comando start no diretório correspondente. Da mesma forma, inicie o back-end para possibilitar a realização de alterações nos gerenciamentos de tarefas. Certifique-se de que ambos os serviços estejam em execução para garantir o funcionamento adequado da aplicação.
```bash
npm start
```
```bash
node index.js
```
- **MySQL**
> Contas
- **Front-End**
>Front -> src -> App.css <br> App.js <br> EditarTarefa <br> GerenciamentoTarefas
><br> ListaTarefas
- **Back-End**
>back -> index.js <br> tarefas.js

## Instalação
Utilizei o Visual Studio Code para a instalação de todas as extensões necessárias, o que otimizou tanto o desenvolvimento do back-end quanto do front-end. Essas extensões foram selecionadas para melhorar a eficiência e a produtividade durante o desenvolvimento do projeto:

```bash
npm install express
npm install cors
npm install mysql2
npm install mysql
npm install bcrypt
npm install formik
npm install yup
npm install axios
npm install react
```

## Aplicação
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=css,html,js,vscode,github,mysql,react,nodejs"/>
  </a>
</p>

## Detalhamento do Site
### Login
- Uma parte essencial do sistema é a autenticação, que exige a inserção obrigatória de um endereço de e-mail e uma senha. A senha deve ter, no mínimo, 8 caracteres; caso contrário, o sistema não aceitará o login. As credenciais fornecidas são validadas com os dados armazenados no banco de dados durante o processo de cadastro. Por questões de segurança, as senhas são criptografadas no banco de dados. No código-fonte, o processo de criptografia é gerenciado pela biblioteca Bcrypt, que garante que as senhas sejam armazenadas de forma segura e não possam ser acessadas diretamente. Essa abordagem protege as credenciais dos usuários contra possíveis comprometimentos.
### Cadastro
- Em uma seção ao lado da página de login, há um formulário de cadastro composto por três campos de texto: um para o e-mail e dois para a senha. As duas caixas de senha devem conter o mesmo valor para garantir a consistência e evitar erros de autenticação. Após o preenchimento e validação, essas informações são salvas e armazenadas no banco de dados, assegurando que cada login tenha uma base de gerenciamento individualizada.
### Gerenciamento de Tarefas
- O formulário de gerenciamento de tarefas possui duas caixas de texto: uma para o título da tarefa e outra para a descrição, permitindo que o usuário insira as informações necessárias conforme desejar. Além dessas caixas de texto, há dois botões: **Salvar** Para registrar a tarefa na lista;**Trocar Tabelas** Para alternar entre as tabelas de tarefas pendentes e tarefas concluídas.
### Lista de Tarefas
- Na interface de gerenciamento de tarefas, a lista de tarefas pendentes incluirá três botões para cada tarefa:
<br> **Concluir**: Move a tarefa para a lista de tarefas concluídas e registra a data de conclusão.
<br>**Editar**: Permite alterar a descrição da tarefa.
<br>**Excluir**: Remove a tarefa da lista de tarefas pendentes.<br>
- Já a lista de tarefas concluídas terá apenas dois botões para cada tarefa:
<br>**Editar**: Permite modificar a descrição da tarefa mesmo após sua conclusão.
<br>**Excluir**: Remove a tarefa da lista de tarefas concluídas.
<br>Essa estrutura diferencia as funcionalidades disponíveis para tarefas pendentes e concluídas, facilitando o gerenciamento e a organização das suas atividades. 

## Contato
minhas contas para entrar em contato:
- [site](https://cadastro-login-sable.vercel.app/)
- o site esta sem funcionalidades por conta das extensoes que github não sobe e como foi um especificação pedida na mensagem não deu para completar
- [Whatsapp](https://wa.me/61994656215)
- [Discord](https://discord.com/invite/cachoro9929)
- [Linkedin](https://www.linkedin.com/in/emanuel-davi-500995191/)
- [GitHub](https://github.com/emanuel672)
<p align="right">Emanuel Davi da Silva Soares</p>
