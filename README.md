# Calculadorra de custos trabalhistas 


A **Calculadora de Custos** é uma aplicação web que permite calcular e simular o crescimento de um valor inicial ao longo de um período, aplicando índices econômicos como o **IPCA** (Índice de Preços ao Consumidor Amplo) e **Poupança**, além de considerar descontos ou acréscimos para **férias**. Ela é especialmente útil para **custos trabalhistas**, facilitando o trabalho de advogados ao calcular valores relacionados a salários, acréscimos e descontos.

## Funcionalidades principais

### 1. Entrada de Dados
- **Valor Inicial**: O usuário informa o valor inicial, que será o montante a ser investido ou acumulado, ou o valor de um salário base para cálculos trabalhistas.
- **Data de Início e Data de Término**: O período durante o qual o cálculo será feito, considerando o início e o término para cada mês.
- **Índices Econômicos**: O usuário pode selecionar se deseja aplicar os índices de **IPCA** e/ou **Poupança** para calcular o crescimento do valor.
- **Férias**: O usuário pode informar datas específicas de férias, nas quais um acréscimo de 1/3 do valor atual será adicionado ao saldo, simulando o pagamento das férias trabalhistas.

### 2. Cálculo de Crescimento
- A aplicação calcula mês a mês o crescimento do saldo, considerando os índices econômicos escolhidos e, quando aplicável, o valor adicional de férias.
- O cálculo para **IPCA** e **Poupança** é feito aplicando o percentual do índice sobre o saldo de cada mês.
- Caso haja uma data de férias, o valor de férias (1/3 do saldo) é somado ao saldo daquele mês específico, simulando a adição ao salário base.

### 3. Exibição dos Resultados
- Após o cálculo, a aplicação exibe os resultados em uma tabela detalhada, mostrando para cada mês:
  - Mês/Ano
  - Saldo Inicial
  - Acréscimos de IPCA e Poupança (em porcentagem e valor monetário)
  - Saldo Final após os acréscimos
  - Valor de férias, se aplicável
- Além disso, o **Total Final** é mostrado no final, representando o saldo acumulado após o período total calculado, útil para entender o valor total de uma quantia trabalhista, considerando o período de tempo e os índices.

### 4. Validação de Entrada
- A aplicação valida se todos os campos foram preenchidos corretamente, garantindo que as datas de início e término estejam em uma ordem lógica e que pelo menos um índice econômico tenha sido selecionado.

## Usabilidade
- **Interatividade**: O usuário pode facilmente interagir com a aplicação, inserindo dados através de formulários intuitivos.
- **Adição e Remoção de Datas de Férias**: O usuário pode adicionar múltiplas datas de férias ao longo do período e removê-las conforme necessário.
- **Feedback de Erros**: Caso o usuário cometa algum erro ao preencher os dados, a aplicação exibe uma mensagem de erro clara, informando o que precisa ser corrigido.

## Objetivo
Esta aplicação é útil tanto para quem deseja calcular o impacto de diferentes índices econômicos sobre um valor ao longo do tempo, como para advogados que precisam calcular custos trabalhistas, como o pagamento de férias e acréscimos de índices como IPCA e Poupança. Ela facilita o planejamento de valores a serem pagos, considerando os efeitos de inflação (IPCA), rendimento da poupança e direitos trabalhistas. Além disso, a aplicação simula eventos como férias, que podem alterar o saldo de forma significativa.

