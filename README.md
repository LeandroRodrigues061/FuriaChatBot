# Quiz Interativo sobre a FURIA

[![Vercel](https://vercel.com/button)](https://furia-chat-bot-qscb.vercel.app/)

Uma aplicação feita para fãs da FURIA! Um Quiz dinâmico, com tipos de níveis de perguntas, ranking de pontuação e com uma navegabilidade muito intuitiva e clara!

## Funcionalidades Principais
* Chat interativo com o bot de perguntas.
* Seleção de dificuldade (Fácil e Difícil).
* Embaralhamento das perguntas.
* Embaralhamento das opções de resposta por pergunta.
* Feedback imediato após cada resposta.
* Cálculo da pontuação final.
* Salvamento de pontuação no ranking global (utilizando Firebase Firestore).
* Visualização do ranking dos jogadores em uma página separada.
* Rolagem automática do chat para baixo com novas mensagens.

## Tecnologias Utilizadas
* [Next.js](Framework React para a aplicação)
* [React](Biblioteca JavaScript para a interface do usuário)
* [Firebase](Plataforma Backend como Serviço)
* [Firestore](Banco de dados NoSQL para o ranking)
* [Tailwind CSS](Framework CSS utilitário)
* [TypeScript] (Superset de JavaScript com tipagem estática)

## Como Rodar o Projeto Localmente
Instruções para clonagem e execução do projeto localmente:

1.  **Pré-requisitos:**
    * [Node.js](https://nodejs.org/)
    * [npm](https://www.npmjs.com/)
    * [Git](https://git-scm.com/)

2.  **Clonar o repositório:**
    ```bash
    git clone (https://github.com/LeandroRodrigues061/FuriaChatBot.git)
    ```

3.  **Navegar até o diretório do projeto:**
    ```bash
    cd [FuriaChatBot]
    ```

4.  **Instalar as dependências:**
    ```bash
    npm install
    ```

5.  **Configurar o Firebase Localmente:**
    * Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
    * Habilite o Firestore.
    * Obtenha as credenciais do seu projeto (chave da API, authDomain, projectId, storageBucket, messagingSenderId, appId).
    * Crie um arquivo de configuração (`src/lib/firebaseConfig.ts`) e configure o Firebase com suas credenciais.

    ```typescript
    // Arquivo src/lib/firebaseConfig.ts:

    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';

    const firebaseConfig = {
    apiKey: "SUA_API_KEY", // Substitua pelas suas credenciais locais
    authDomain: "SEU_AUTH_DOMAIN.firebaseapp.com", // Substitua pelas suas credenciais locais
    projectId: "SEU_PROJECT_ID", // Substitua pelas suas credenciais locais
    storageBucket: "SEU_STORAGE_BUCKET.appspot.com", // Substitua pelas suas credenciais locais
    messagingSenderId: "SEU_MESSAGING_SENDER_ID", // Substitua pelas suas credenciais locais
    appId: "SEU_APP_ID" // Substitua pelas suas credenciais locais
    };

    const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);

    // **Importante:** Não inclua suas credenciais reais do Firebase diretamente neste arquivo se você for compartilhar o código publicamente. Use variáveis de ambiente em projetos reais.

6.  **Rodar a aplicação em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

7.  **Acessar a aplicação no navegador:**
    * Geralmente em `http://localhost:3000`.

## Deploy no Vercel
1.  **Link da Aplicação:**
    ```markdown
    Acesse a versão online da aplicação aqui: [https://furia-chat-bot-qscb.vercel.app/]

2.  2.  **Configuração do Firebase no Vercel:**
    Para que a conexão com o Firebase funcione corretamente no Vercel, você precisa configurar as seguintes variáveis de ambiente no painel de configurações do seu projeto Vercel (`Settings` -> `Environment Variables`):

    * `apiKey`: `VALOR_DA_API_KEY` (obtido no Firebase Console)
    * `authDomain`: `VALOR_DO_AUTH_DOMAIN` (obtido no Firebase Console)
    * `projectId`: `VALOR_DO_PROJECT_ID` (obtido no Firebase Console)
    * `storageBucket`: `VALOR_DO_STORAGE_BUCKET` (obtido no Firebase Console)
    * `messagingSenderId`: `VALOR_DO_MESSAGING_SENDER_ID` (obtido no Firebase Console)
    * `appId`: `VALOR_DO_APP_ID` (obtido no Firebase Console)

    Certifique-se de usar os nomes das chaves exatamente como mostrado acima e os valores correspondentes do seu projeto Firebase (em `Configurações do projeto` -> `Geral`).

## Considerações de Design e Arquitetura (Opcional, mas Valioso)
Você pode incluir uma seção breve sobre suas decisões de design e arquitetura:

Para esse projeto foi escolhido a tecnologia next.js pela facilidade e clareza de código com a utilização de componentes, e a tecnologia de TypeScript pela escalabilidade e facilidade de lidar com certos desafios com a proposta de projeto.
Design e cores baseado na identificação visual da marca e organização FURIA, com tema mais escuro e logo de uma Pantera.
Utilizado Firebase como banco de dados para as pontuações de ranking pela facilidade de utilização e integração com a aplicação!

## Autor

```markdown
Feito por Leandro - https://www.linkedin.com/in/lerodrigues61/ - leandrormelo2003@gmail.com