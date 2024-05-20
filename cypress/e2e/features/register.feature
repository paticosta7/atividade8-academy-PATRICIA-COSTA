# language: pt
@registro
Funcionalidade: Registrar usuário
  Como uma pessoa qualquer
  Desejo me cadastrar no sistema
  Para conseguir avaliar filmes

  Contexto:
    Dado que estou na página de registro

  @registro_sucesso
  Cenário: Registrar um novo usuário com sucesso
    Quando eu preencho o campo nome com "Teste Usuário"
    E eu preencho o campo email com "cinefilo@qa.com"
    E eu preencho o campo senha com "senha123"
    E eu preencho o campo confirmar senha com "senha123"
    E eu submeto o formulário
    Então eu devo ver uma mensagem de sucesso
@ignore
  Cenário: Tentar registrar um usuário com um email já utilizado
    Quando eu preencho o campo nome com "Outro Usuário"
    E eu preencho o campo email com "teste@usuario.com"
    E eu preencho o campo senha com "outrasenha"
    E eu preencho o campo confirmar senha com "outrasenha"
    E eu submeto o formulário
    Então eu devo ver uma mensagem de erro informando que o email já está em uso
 @ignore
  Cenário: Tentar registrar um usuário com um email inválido
    Quando eu preencho o campo nome com "Teste Usuário"
    E eu preencho o campo email com "emailinvalido"
    E eu preencho o campo senha com "senha123"
    E eu preencho o campo confirmar senha com "senha123"
    E eu submeto o formulário
    Então eu devo ver uma mensagem de erro informando que não foi possível cadastrar
@ignore
  Cenário: Tentar registrar um usuário com uma senha muito curta
    Quando eu preencho o campo nome com "Teste Usuário"
    E eu preencho o campo email com "teste@usuario.com"
    E eu preencho o campo senha com "123"
    E eu preencho o campo confirmar senha com "123"
    E eu submeto o formulário
    Então eu devo ver uma mensagem de erro informando que a senha deve ter pelo menos 6 dígitos
@ignore
  Esquema do Cenário: Tentar registrar um usuário com campos obrigatórios faltando
    Quando eu preencho o campo nome com "<nome>"
    E eu preencho o campo email com "<email>"
    E eu preencho o campo senha com "<senha>"
    E eu preencho o campo confirmar senha com "<confirmarSenha>"
    E eu submeto o formulário
    Então eu devo ver uma mensagem de erro informando que todos os campos são obrigatórios

    Exemplos:
      | nome            | email               | senha       | confirmarSenha |
      | ""              | "teste@usuario.com" | "senha123"  | "senha123"     |
      | "Teste Usuário" | ""                  | "senha123"  | "senha123"     |
      | "Teste Usuário" | "teste@usuario.com" | ""          | "senha123"     |
      | "Teste Usuário" | "teste@usuario.com" | "senha123"  | ""             |
@ignore
  Cenário: Registrar um usuário com caracteres especiais no nome
    Quando eu preencho o campo nome com "Usuário @#!"
    E eu preencho o campo email com "especial@usuario.com"
    E eu preencho o campo senha com "senha123"
    E eu preencho o campo confirmar senha com "senha123"
    E eu submeto o formulário
    Então eu devo ver uma mensagem de sucesso

  @ignore
  Esquema do Cenário: Registro com dados válidos
    Quando eu preencho o campo nome com "<nome>"
    E eu preencho o campo email com "<email>"
    E eu preencho o campo senha com "<senha>"
    E eu preencho o campo confirmar senha com "<confirmarSenha>"
    E eu submeto o formulário
    Então eu devo ver uma mensagem de sucesso
@ignore
    Exemplos:
      | nome             | email                | senha      | confirmarSenha |
      | "Usuário Teste1" | "teste1@usuario.com" | "senha123" | "senha123"     |
      | "Usuário Teste2" | "teste2@usuario.com" | "senha456" | "senha456"     |
# cenario pra nomes? 