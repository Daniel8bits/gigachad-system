type Rule = {
    minLength: number
    maxLength: number
    required: boolean
    regex: RegExp
    callback: undefined
    value: string
}
type RuleCustom = {
    callback: (value: any, options: any) => boolean | Promise<boolean>
    message: string | ((options: any) => string)
}
export type Rules = {
    [key: string]: string | Partial<Rule> | RuleCustom
}
const globalRules: Record<string, RuleCustom> = {
    email: {
        callback: (value) => {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regex.test(value.toLocaleLowerCase());
        },
        message: "O email é invalido"
    },
    required: {
        callback: (value) => {
            return value.length !== 0;
        },
        message: "Campo Obrigatório"
    },
    minLength: {
        callback: (value, { minLength }) => {
            return value.length >= minLength;
        },
        message: ({ minLength }) => "Tamanho Mínimo " + minLength
    },
    maxLength: {
        callback: (value, { maxLength }) => {
            return value.length <= maxLength;
        },
        message: ({ maxLength }) => "Tamanho Máximo " + maxLength
    },
    regex: {
        callback: (value) => {
            return value.test(value)
        },
        message: ""
    }
}

class RuleError extends Error {

    private item: string;
    private rule: string;
    private params!: RuleCustom;
    private value!: string;
    private options!: any;

    constructor(item: string, message: string);
    constructor(item: string, rule: string, params: RuleCustom, value: string, options?: any);
    constructor(...args: any[]) {
        super()
        this.item = args[0];
        if (arguments.length == 2) {
            this.message = args[1];
            this.rule = "custom";
        } else {
            this.rule = args[1];
            this.params = args[2];
            this.value = args[3];
            this.options = args[4];
            this.message = this.getMessage();
        }
    }

    public getRule() {
        return this.rule;
    }

    public getItem() {
        return this.item;
    }

    public getMessage(): string {
        const message = this.params.message;
        if (!message) return "";
        if (typeof (message) == "string") return message;
        return message.apply(null, [this.options]);
    }
}

const runRule = async (item: string, rule: RuleCustom, name: string, value: string, options: any): Promise<void> => {
    if (await rule.callback.apply(null, [value, options])) return;
    throw new RuleError(item, name, rule, value, options);
}

const ValidData = async<T extends Record<string, any>>(data: T, options: Rules): Promise<T> => {
    for (let option in options) {
        const rules = options[option];
        const value = data[option] ?? "";
        if (typeof (rules) == "string") {
            await runRule(option, globalRules[rules], rules, value, {})
            continue;
        }

        if (rules.callback) {
            await runRule(option, rules, "callback", value, {})
        } else {
            for (let name in rules) {
                await runRule(option, globalRules[name], name, value, rules);
            }
        }
    }
    return data;
}
/*
const data = {
    id: 1,
    name: 'Lucas Alviene Pereira',
    email: "lucasalp1@hotmail.com"
}

const options: Rules = {
    id: {
        required: true
    },
    email: 'email',
    name: {
        callback: (value) => {
            console.log("name", value)
            //throw new RuleError("Outro Error");
            return true;
        },
        message: "Ocorreu um erro aqui, ta bom"
    }
}
/*
const test = async () => {


    try {

        await ValidData(data, options)
    } catch (e: any) {
        console.log("Error Test", e);
    }
}

test();
*/
export default ValidData;