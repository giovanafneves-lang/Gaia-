# Como Publicar a Gaia no Netlify (Rápido e Grátis)

Você não precisa entender de código para colocar seu aplicativo no ar. Siga estes passos simples:

### 1. Preparar os Arquivos
Se você estiver usando um editor que permite "Build" (construir) ou "Download":
1. Execute o comando `npm run build` no seu terminal.
2. Isso criará uma pasta chamada `dist`. **Esta é a pasta do seu aplicativo pronto.**

### 2. Publicar (Arrastar e Soltar)
1. Acesse o site: [app.netlify.com/drop](https://app.netlify.com/drop)
2. Se não tiver conta, crie uma grátis (pode usar o e-mail).
3. Pegue a pasta `dist` que você criou e ARRASTE para dentro da área pontilhada na tela do Netlify.
4. Aguarde a barra de upload carregar.

### 3. Configurar Domínio (Opcional)
1. O Netlify vai te dar um link aleatório (ex: `gaia-xyz.netlify.app`).
2. Clique em "Domain Settings" para mudar o nome (ex: `gaiabusiness.netlify.app`) ou conectar seu domínio comprado (`gaiabusiness.com`).

### 4. Pronto!
Seu aplicativo agora é um site real, acessível no Google e instalável como aplicativo no celular.

---

**Observação sobre PWA (Instalação no Celular):**
Como configuramos o aplicativo como PWA, quando você abrir o link do Netlify no celular, aparecerá a opção "Adicionar à Tela de Início". Isso cria o ícone do app e remove a barra de endereço do navegador.
