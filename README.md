# Calculadorra de custos trabalhistas 


A **Calculadora de Custos** é uma aplicação web que permite calcular e simular o crescimento de um valor inicial ao longo de um período, aplicando índices econômicos como o **IPCA** (Índice de Preços ao Consumidor Amplo) e **Poupança**, além de considerar descontos ou acréscimos para **férias**.

## Funcionalidades principais

### 1. Entrada de Dados
- **Valor Inicial**: O usuário informa o valor inicial, que será o montante a ser investido ou acumulado.
- **Data de Início e Data de Término**: O período durante o qual o cálculo será feito, considerando o início e o término para cada mês.
- **Índices Econômicos**: O usuário pode selecionar se deseja aplicar os índices de **IPCA** e/ou **Poupança** para calcular o crescimento do valor.
- **Férias**: O usuário pode informar datas específicas de férias, nas quais um acréscimo de 1/3 do valor atual será adicionado ao saldo.

### 2. Cálculo de Crescimento
- A aplicação calcula mês a mês o crescimento do saldo, considerando os índices econômicos escolhidos e, quando aplicável, o valor adicional de férias.
- O cálculo para **IPCA** e **Poupança** é feito aplicando o percentual do índice sobre o saldo de cada mês.
- Caso haja uma data de férias, o valor de férias (1/3 do saldo) é somado ao saldo daquele mês específico.

### 3. Exibição dos Resultados
- Após o cálculo, a aplicação exibe os resultados em uma tabela detalhada, mostrando para cada mês:
  - Mês/Ano
  - Saldo Inicial
  - Acréscimos de IPCA e Poupança (em porcentagem e valor monetário)
  - Saldo Final após os acréscimos
  - Valor de férias, se aplicável
- Além disso, o **Total Final** é mostrado no final, representando o saldo acumulado após o período total calculado.

### 4. Validação de Entrada
- A aplicação valida se todos os campos foram preenchidos corretamente, garantindo que as datas de início e término estejam em uma ordem lógica e que pelo menos um índice econômico tenha sido selecionado.

## Usabilidade
- **Interatividade**: O usuário pode facilmente interagir com a aplicação, inserindo dados através de formulários intuitivos.
- **Adição e Remoção de Datas de Férias**: O usuário pode adicionar múltiplas datas de férias ao longo do período e removê-las conforme necessário.
- **Feedback de Erros**: Caso o usuário cometa algum erro ao preencher os dados, a aplicação exibe uma mensagem de erro clara, informando o que precisa ser corrigido.

## Objetivo
Esta aplicação é útil para quem deseja calcular o impacto de diferentes índices econômicos sobre um valor ao longo do tempo, como por exemplo, para planejar investimentos, economias ou simulações financeiras considerando os efeitos de inflação (IPCA) e rendimento da poupança. Além disso, considera eventos específicos como férias, que podem alterar o saldo de forma significativa.

