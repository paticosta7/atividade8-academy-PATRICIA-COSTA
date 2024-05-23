      # language: pt

      @registro
      Funcionalidade: Registrar usuário
      Como uma pessoa qualquer
      Desejo me cadastrar no sistema
      Para conseguir avaliar filmes

      Contexto:
      Dado que estou na página de registro

      @usuario_cadastrato_sucesso
      Cenário: Registrar um novo usuário com sucesso
      Quando eu preencho os campos corretamente
      Então eu devo ver uma notificação de sucesso "Cadastro realizado!"

      @usuario_cadastrado
      Cenário: Tentar registrar um usuário com um email já utilizado
      Quando eu preencho o campo nome com "Usuário"
      E eu preencho o campo email com "amocinema@filmes.com"
      E eu preencho o campo senha com "senha123"
      E eu preencho o campo confirmar senha com "senha123"
      E eu submeto o formulário
      Então eu devo ver uma notificação de erro "E-mail já cadastrado. Utilize outro e-mail"

      Cenário: Tentar registrar um usuário com um email inválido
      Quando eu preencho o campo nome com "Usuário"
      E eu preencho o campo email com "<email>"
      E eu preencho o campo senha com "senha123"
      E eu preencho o campo confirmar senha com "senha123"
      E eu submeto o formulário
      Então eu devo ver uma notificação de erro "Não foi possível cadastrar o usuário."
      Exemplos:
      | teste@.com  |
      | teste       |
      | teste@      |
      | teste@teste |
      | @teste.com  |

      Cenário: Tentar registrar um usuário com uma senha inválida
      Quando eu preencho o campo nome com "Usuário"
      E eu preencho o campo email com "amomuitocinema@filmes.com"
      E eu preencho o campo senha com "<senha>"
      E eu preencho o campo confirmar senha com "<senha>"
      E eu submeto o formulário
      Então eu devo ver uma mensagem de erro na senha "<erro>"
      Exemplos:
      | senha                 | erro                                   |
      | 0                     | A senha deve ter pelo menos 6 dígitos. |
      | 123                   | A senha deve ter pelo menos 6 dígitos. |
      | 123456789101112131415 | A senha deve ter no máximo 12 dígitos. |

      Cenário: Tentar registrar um usuário com confirmação de senha inválida
      Quando eu preencho o campo nome com "Usuário"
      E eu preencho o campo email com "amomuitocinema@filmes.com"
      E eu preencho o campo senha com "<senha>"
      E eu preencho o campo confirmar senha com "<confirmacao>"
      E eu submeto o formulário
      Então eu devo ver uma mensagem de erro na confirmação de senha "<erro>"
      Exemplos:
      | senha    | confirmacao | erro                       |
      | 123456   | 12345678    | As senhas devem ser iguais |
      | 12345678 | 123456      | As senhas devem ser iguais |

      Cenário: Tentar registrar um usuário algum campo vazio
      Quando eu preencho o campo nome com "<nome>"
      E eu preencho o campo email com "<email>"
      E eu preencho o campo senha com "<senha>"
      E eu preencho o campo confirmar senha com "<confirmacao>"
      E eu submeto o formulário
      Então eu devo ver a seguinte informação "<erro>"
      Exemplos:
      | nome    | email             | senha  | confirmacao | erro             |
      |         | usuario@gmail.com | 123456 | 123456      | Informe o nome   |
      | Usuário |                   | 123456 | 123456      | Informe o e-mail |
      | Usuário | usuario@gmail.com |        | 123456      | Informe a senha  |
      | Usuário | usuario@gmail.com | 123456 |             | Informe a senha  |
