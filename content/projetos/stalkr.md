---
title: Stalkr
description: Seu mês no Last.fm, o que os outros estão ouvindo e o quanto vocês combinam.
host: stalkr.asilveira.com.br
tags: [Nuxt, Redis, Last.fm]
order: 2
---

Um agregador do Last.fm. Basta o nome de qualquer perfil, sem login.

## O que tem

- O que a pessoa está ouvindo agora, com a página tingida pela cor da capa.
- O mês de qualquer perfil, com um story pronto para compartilhar.
- O quanto dois perfis combinam.
- A semaninha: a colagem dos álbuns mais ouvidos na semana.

## Como é feito

- Nuxt, com o cache das respostas do Last.fm num Redis.
- O Last.fm não avisa quando a música troca. Uma consulta leve roda a cada poucos segundos, e a análise pesada só é refeita quando a faixa muda.
