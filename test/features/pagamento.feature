# language: pt

Funcionalidade: Pagamentos

  Cenário: Obter lista de pagamentos
    Quando eu faço uma requisição GET para "/api/pagamentos"
    Então eu recebo uma resposta com status 200
    E a lista de pagamentos é retornada com sucesso
