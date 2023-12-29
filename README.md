# App

Gympass style app

#RF
- [x] Deve ser possivel se cadastrar
- [x] Deve ser possivel se autenticar
- [x] Deve ser possivel obter o perfil de um usuário logado
- [x] Deve ser possivel obter o número de check-ins realizados pelo usuario
- [x] Deve ser possivel o usuário obter seu histórico de check-ins
- [x] Deve ser possivel o usuario buscar academias proximas
- [x] Deve ser possivel o usuario buscar academias pelo nome
- [x] Deve ser possivel o usuario relizar check-in em uma academia
- [x] Deve ser possivel validar um check-in de um usuário
- [x] Deve ser possivel cadastrar uma academia

#RN
- [x] O usuario não deve poder se cadastrar com um email duplicado
- [x] O usuário não pode fazer dois check-ins no mesmo dia
- [x] O usuário não pode fazer check-ins se não estiver perto da academia
- [x] O check-in só pode ser validado até 20 minutos após criado
- [] O check-in só pode ser validado por administradores
- [] A academia só pode ser cadastrada por administradores


#RNF
- [x] A senha do usuário precisa está criptografada
- [x] Os dados da aplicação precisa estar persistido em um banco PostgresSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [] O usuario deve ser identificado por um JWT 