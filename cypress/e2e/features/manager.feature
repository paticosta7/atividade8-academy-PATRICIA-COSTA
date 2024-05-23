      # language: pt
      Funcionalidade: Gerenciar conta de usuário
      Como um usuário autenticado
      Desejo poder gerenciar minha conta
      Para ter controle sobre minhas informações

      Contexto: Página principal
      Dado eu acesso a página inicial da aplicação

      Cenário: Usuário não logado não deve acessar gerenciamento da conta
      Quando não vejo acesso para página de perfil
      E eu acesso a rota de perfil
      Então eu devo ser redirecionado para página de login

      Cenário: Usuário não logado não deve acessar edição de dados
      Quando não vejo acesso para página de perfil
      E eu acesso a rota de gerenciamento de perfil
      Então eu devo ser redirecionado para página de login

      @manager @usuarioLogado
      Cenário: Acessar página de gerenciamento de perfil
      Quando eu devo ver o menu de perfil
      E eu clico no botão de perfil
      E eu devo ver minhas informações
      E eu devo clicar no botão de editar
      Então deve ser redirecionada para página de edição

      @manager @usuarioLogado
      Cenário: Campo de e-mail deve estar desabilitado
      Quando eu acesso a página de edição de perfil
      Então o campo de e-mail deve estar desabilitado

      @manager @usuarioLogado
      Cenário: Campo de senha deve estar desabilitado
      Quando eu acesso a página de edição de perfil
      Então o campo de senha deve estar desabilitado

      @manager @usuarioLogado
      Cenário: Campo de confirmação de senha deve estar desabilitado
      Quando eu acesso a página de edição de perfil
      Então o campo de confirmação de senha deve estar desabilitado

      @manager @usuarioLogado
      Cenário: Alterar nome do usuário com sucesso
      Quando eu acesso a página de edição de perfil
      E eu altero meu nome para "Novo nome de usuário"
      E eu submeto o formulário de edição
      Então eu devo ver uma mensagem de sucesso informando "Informações atualizadas!"

      @manager @usuarioLogado
      Cenário: Alterar campos de senha
      Quando eu acesso a página de edição de perfil
      E eu clico em botão de alterar senha
      Então os campos devem estar habilitados

      @senhaAlterada @usuarioLogado
      Cenário: Alterar senha de usuário com sucesso
      Quando eu acesso a página de edição de perfil
      E eu clico em botão de alterar senha
      E eu altero minha senha para "novaSenha123"
      E eu confirmo a nova senha como "novaSenha123"
      E eu submeto o formulário de edição
      Então eu devo ver uma mensagem de sucesso informando "Informações atualizadas!"

      @manager @usuarioLogado
      Cenário: Tentar editar um usuário com uma senha inválida
      Quando eu acesso a página de edição de perfil
      E eu clico em botão de alterar senha
      E eu altero minha senha para "<senha>"
      E eu confirmo a nova senha como "<senha>"
      E eu submeto o formulário de edição
      Então eu devo ver uma mensagem de erro na alteração de senha "<erro>"
      Exemplos:
      | senha | erro                                   |
      | 0     | A senha deve ter pelo menos 6 dígitos. |
      | 123   | A senha deve ter pelo menos 6 dígitos. |

      @manager @usuarioLogado
      Cenário: Tentar editar um usuário com uma senha de confirmação inválida
      Quando eu acesso a página de edição de perfil
      E eu clico em botão de alterar senha
      E eu altero minha senha para "<senha>"
      E eu confirmo a nova senha como "<confirmacaoSenha>"
      E eu submeto o formulário de edição
      Então eu devo ver uma mensagem de erro na alteração de senha "<erro>"
      Exemplos:
      | senha      | confirmacaoSenha | erro                       |
      | nova123    | nova12123        | As senhas devem ser iguais |
      | nova123456 | nova123          | As senhas devem ser iguais |

      @manager @usuarioLogado
      Cenário: Tentar editar um usuário com uma senha com mais de 12 digitos
      Quando eu acesso a página de edição de perfil
      E eu clico em botão de alterar senha
      E eu altero minha senha para "<senha>"
      E eu confirmo a nova senha como "<senha>"
      E eu submeto o formulário de edição
      Então eu devo ver uma mensagem de erro informando "<erro>"
      Exemplos:
      | senha             | erro            |
      | nova1231234343434 | Ocorreu um erro |