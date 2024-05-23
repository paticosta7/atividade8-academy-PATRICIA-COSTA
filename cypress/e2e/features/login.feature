                  # language: pt

                  Funcionalidade: Login de usuário
                  Como um usuário registrado
                  Desejo efetuar login
                  Para acessar minha conta e gerenciar minhas informações

                  Contexto:
                  Dado que estou na página de login

                  @login
                  Cenário: Login deve ser efetuado com sucesso com credenciais corretas
                  Quando eu preencho corretamente os campos
                  Então eu devo ser redirecionado para a página inicial logado

                  @login
                  Cenário: login não deve ser efetuado com senha incorreta
                  Quando eu preencho o campo de senha incorretamente "<senha>"
                  Então eu devo ver uma notificação informando "<erro>"
                  Exemplos:
                  | senha       | erro                       |
                  | senha124    | Usuário ou senha inválidos |
                  | senha       | Usuário ou senha inválidos |
                  | senha123455 | Usuário ou senha inválidos |

                  @login
                  Cenário: login não deve ser efetuado com email incorreto
                  Quando eu preencho o campo de email incorretamente "<email>"
                  Então eu devo ver uma notificação informando "<erro>"
                  Exemplos:
                  | email                             | erro                       |
                  | emailErradoEqueNaoExiste@gmai.com | Usuário ou senha inválidos |
                  | hum@hum.hum                       | Usuário ou senha inválidos |

                  Cenário: login não deve ser efetuado com algum campo vazio
                  Quando eu preencho o campo email com "<email>"
                  E eu preencho o campo senha com "<senha>"
                  E eu submeto o formulário
                  Então eu devo ver a seguinte informação "<erro>"
                  Exemplos:
                  | email             | senha  | erro             |
                  |                   | 123456 | Informe o e-mail |
                  | usuario@teste.com |        | Informe a senha  |
