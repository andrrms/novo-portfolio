---
title: Orla
description: Finanças pessoais para quem recebe como PJ. Mostra quanto dá para gastar até o fim do mês.
host: apporla.com.br
tags: [Nuxt, NestJS, PostgreSQL]
order: 1
---

O saldo do banco mostra onde o dinheiro está agora. O Orla mostra o mês inteiro: o que ainda entra, as contas e faturas que vencem e quanto sobra até o fim do mês.

## O que tem

- Quanto sobra no fim do mês, atualizado a cada lançamento.
- Lançamento em segundos: o valor e o começo da descrição bastam, e o Orla completa a categoria e a conta.
- Faturas do cartão até a última parcela.
- Passar dinheiro da empresa para a pessoa física sem contar como despesa.
- Metas com a data em que cada uma deve chegar.

## Como é feito

- Os dados podem ficar só no aparelho, sem conta. Com conta, os lançamentos feitos sem internet vão para os outros aparelhos quando a conexão volta.
- Web em Nuxt e API em NestJS com PostgreSQL.
- Design system próprio, o Cédula, com a gravura das cédulas de dinheiro (o guilhoche) como enfeite.
