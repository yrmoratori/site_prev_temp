# AgroCoffee 2.0

## Introdução

A cafeicultura é a principal atividade agrícola do Espírito Santo, sendo sensível às condições climáticas. Dessa forma, a previsão do tempo em um elemento crucial para o planejamento e manejo das lavouras. Tendo isso em mente, o projeto AgroCoffee propõe o desenvolvimento de um website que integra a previsão meteorológica com informações específicas sobre o plantio de café, visando auxiliar os agricultores na tomada de decisões.

A relevância do projeto está na capacidade de fornecer orientações precisas e atualizadas, contribuindo para aumentar a produtividade e a sustentabilidade das plantações, além de fortalecer a resiliência dos agricultores frente às mudanças climáticas. Esta iniciativa se alinha com a busca por práticas agrícolas mais inteligentes e eficientes, fundamentais para a segurança alimentar e o desenvolvimento sustentável.

## Problema

O problema central abordado neste projeto reside na necessidade de integrar informações meteorológicas precisas com orientações específicas sobre o plantio de café, de forma a auxiliar os agricultores na tomada de decisões estratégicas. A falta de acesso a essas informações de forma integrada e de fácil interpretação dificulta o planejamento das atividades agrícolas e pode impactar negativamente a produtividade e a sustentabilidade das lavouras.

O AgroCoffee busca solucionar essa necessidade por meio de um website que combina previsões meteorológicas com recomendações relacionadas à cafeicultura. Dessa forma, o sistema fornece informações sobre o clima e orientações práticas que podem apoiar o planejamento das atividades agrícolas.

## Objetivo

Criar e desenvolver um website que forneça previsões meteorológicas precisas e atualizadas, integradas a dicas e orientações práticas sobre o plantio de café. O website será uma ferramenta de apoio para os agricultores, permitindo que eles planejem suas atividades agrícolas de forma mais eficiente e sustentável, aumentando a produtividade e a qualidade do café produzido.

Além disso, o website buscará sensibilizar os agricultores para a importância da adoção de práticas agrícolas mais sustentáveis e resilientes às mudanças climáticas, contribuindo para a melhoria da gestão ambiental nas propriedades rurais.

## Metodologia (Plano de Ação)

A metodologia deste projeto será abordada pelo grupo com o desenvolvimento iterativo e incremental, utilizando as seguintes etapas:

- **Levantamento de requisitos:** identificação das necessidades dos agricultores e das informações meteorológicas relevantes para o plantio de café.
- **Pesquisa e seleção de fontes de dados meteorológicos:** busca por fontes confiáveis e atualizadas de previsão do tempo.
- **Desenvolvimento do website:** implementação das funcionalidades necessárias para a apresentação das previsões e das dicas de plantio.
- **Testes e validação:** verificação da eficácia do website em fornecer informações úteis e compreensíveis para os agricultores.
- **Ajustes e melhorias:** incorporação de feedback dos usuários e aprimoramento contínuo do website.

Essas etapas serão realizadas de forma colaborativa, com a participação de agricultores, especialistas em café e desenvolvedores web. A intervenção será realizada no contexto virtual, por meio do website, e abrangerá inicialmente agricultores da região e, com potencial de expansão para outras regiões produtoras de café.

## Funcionalidades do projeto

- Consulta da previsão meteorológica por município do Espírito Santo.
- Exibição das condições climáticas atuais.
- Previsão meteorológica para os próximos dias.
- Recomendações agrícolas baseadas nas condições climáticas.
- Informações sobre a cafeicultura do Espírito Santo.
- Conteúdos específicos sobre café Conilon e café Arábica.
- Curiosidades e dados sobre a produção de café capixaba.
- Interface responsiva para acesso em diferentes dispositivos.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- OpenWeather API
- GitHub Pages

## Estrutura do projeto

```text
agrocoffee_v2/
├── index.html
├── app.js
├── style.css
├── cafe-conilon-capixaba.html
├── cafe-arabica-capixaba.html
└── README.md
```

## Fontes de conteúdo

As informações relacionadas à cafeicultura capixaba utilizadas no projeto foram baseadas principalmente em materiais do Instituto Capixaba de Pesquisa, Assistência Técnica e Extensão Rural (Incaper), incluindo conteúdos sobre cafeicultura, café Conilon e sustentabilidade da cafeicultura de Arábica em regiões de montanha.

## Observação sobre a API

A chave da OpenWeather continua no JavaScript porque o projeto é um site estático. Recomenda-se restringir a chave ao domínio do GitHub Pages e configurar limites de uso. Para um projeto em produção, o ideal é mover a chamada da API para um backend/proxy, evitando a exposição direta da chave no código-fonte.
