### GigaChad - BackEnd

## Programação

### Routes
As rotas são definidas no arquivo **routes.ts** e suas aplicações na pasta **routes**, são separados em pastas e cada pastas tem um arquivo sobre um método (GET, PUT, POST, DELETE).

Para páginas restritas, ou seja, que o usuário esteja logado, use: **withAuth**.
Exemplo:
```typescript
app.get("/", withAuth, (req, res) => {
    res.success({})
})
```

Para páginas restritas a um tipo de usuário (Cliente, Treinador, Gerente, etc), use: **withUser(...UserType[])**
Exemplo:
```typescript
// Apenas Treinadoor
app.get("/", withUser(UserType.trainer), (req, res) => {
    res.success({})
})

// Treinador e Gerente
app.get("/", withUser(UserType.trainer,UserType.manager), (req, res) => {
    res.success({})
})

// Todos usuários
app.get("/", withUser(UserType.user), (req, res) => {
    res.success({})
})
```

### Retornos
Para padronizar os retornos ao front, existem duas funções no **res**.
**Sucesso**
```typescript
// 200 OK
app.get("/", (req, res) => {
    res.success({user:1})
})

// 201 Created
app.get("/", (req, res) => {
    res.success({user:1},201)
})
```

Retorna:
```JSON
{
    "data":{
        "user": 1
    },
    "status": 200
}
```

**Erros**
```typescript
// Error 500
app.get("/", (req, res) => {
    res.error(500)
})

// Error 500 com mensagem personalizada
app.get("/", (req, res) => {
    res.error(500,"Sem conexão com o banco de dados")
})
```

Retorna:
```JSON
{
    "data": {},
    "message": "Error Interno",
    "status": 500
}
```

**Todos os códigos disponíveis**

Código | Mensagem
----|---------
200 | OK
201 | Criado
400 | Requisição Ruim
401 | Não Autorizado
403 | Acesso Negado
404 | Não Encontrado
500 | Error Interno


### Validação de Dados

Use para validar os dados recebidos, usando regras já definidas ou regras personalizadas.

Importe o arquivo **ValidData.ts**, ele recebe dois parâmetros.
O 1º é o as informações à serem conferidas, o 2º é as regras.

Ele não tem retorno, mas se uma regras não for aceita, ele acionará uma exceção, por isso, **sempre** envolva em uma **try catch**.
Exemplo:
```typescript
try {
    await ValidData(data, options)
} catch (e: RuleError) {
    console.log("Error Test", e);
}
```
**Estrutura das Regras**
```typescript
type Rule = {
    minLength: number
    maxLength: number
    required: boolean
    regex: RegExp
    callback: undefined
    value: string
}
type RuleCustom = {
    callback: (value: any, options: any) => boolean
    message: string | ((options: any) => string)
}
type Rules = {
    [key: string]: string | Partial<Rule> | RuleCallback
}
```
- **Rules**: Esse será o campo no qual você preencherá a regra, no lado esquerdo do **:** é o nome do campo, no lado direito, é os formatos aceitos.
- **String**: Nesse, você poderá citar uma regra já definida, por exemplo *email*.
- **Rule**: Nesse campo, você pode ativar várias regras já definidas, como **required** e **minLength**
- **RuleCustom**: Nesse você pode definir uma regra customizável, usando um **callback**.

Exemplos:
No exemplo abaixo, os campos **id** e **name** não serão tratados na regra, apenas o **email**.
No campo das regras, está definido que o campo **email** usará uma regra já definida chamada **email**.
Nesse exemplo, ocorrerá um erro, já que o campo **email** não corresponde ao padrão de um e-mail.
```typescript
try {
    const data = {
        id: 1,
        name: 'Fulano de Tal',
        email: "fulano gmail.com"
    }
    await ValidData(data, {
        email: 'email'
    })
    saveUser(data);
} catch (e: RuleError) {
    console.log(e);
}
```
Nese próximo exemplo, estou definido nas regras que o campo **username** tenha no mínimo 15 caracteres e o campo **password** seja obrigatório.
Nesse caso, irá retornar o erro da 1º regra definida, ou seja, o do **username** apenas.
```typescript
try {
    const data = {
        id: 1,
        name: 'Fulano de Tal',
        username: 'Fulano',
        email: "fulano@gmail.com"
    }
    await ValidData(data, {
        username:{
            minLength:15
        },
        password:{
            required: true
        },
        email: 'email'
    })
    saveUser(data);
} catch (e: RuleError) {
    console.log(e);
}
```

Nesse último exemplo, estamos definido uma regra customizável, nele verificamos se já existe um usuário com o e-mail, se sim, retornara um erro com a mensagem.
```typescript
try {
    const data = {
        id: 1,
        name: 'Fulano de Tal',
        username: 'Fulano',
        email: "fulano@gmail.com"
    }
    await ValidData(data, {
        email:{
            callback: (email) => {
                const user = findUser(email);
                return user !== null;
            },
            message: "Esse e-mail já pertecece a uma conta."
        }
    })
    saveUser(data);
} catch (e: RuleError) {
    console.log(e);
}
```

