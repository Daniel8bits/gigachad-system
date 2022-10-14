type Rule = {
    minLength: number
    maxLength: number
    required: boolean
    regex: RegExp
    callback(value: string, option?: any): boolean
    value: string
}
type RuleGlobal = {
    callback: (value: any, options: any) => boolean
    message: string | ((options: any) => string)
}
type Rules = {
    [key: string]: string | Partial<Rule>
}
const globalRules: Record<string, RuleGlobal> = {
    email: {
        callback: (value) => {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regex.test(value.toLocaleLowerCase());
        },
        message: "O email é invalido"
    },
    required: {
        callback: (value) => {
            console.log(value);
            return value.length !== 0;
        },
        message: "Campo Obrigatório"
    },
    minLength: {
        callback: (value, minLength) => {
            return value.length >= minLength;
        },
        message: (minLength) => "Tamanho Mínimo " + minLength
    },
    maxLength: {
        callback: (value, maxLength) => {
            return value.length <= maxLength;
        },
        message: (maxLength) => "Tamanho Máximo " + maxLength
    },
    regex: {
        callback: (value) => {
            return value.test(value)
        },
        message: ""
    }
}

const ErrorRule = (rule: RuleGlobal, value: string, options?: any) => {
    const message = rule.message;
    if (typeof (message) == "string") return message;
    return { message: message.apply(null, [options]), value, rule, options }
}

const globalRule = (rule: RuleGlobal, name: string, value: string, options: any): boolean => {
    if (rule.callback.apply(null, [value, options])) return true;
    throw ErrorRule(rule, value, options);
    /*if (globalRules[rule]) {
        //@ts-ignore
    }
    return false;*/
}

const ValidData = <T extends Record<string, any>>(data: T, options: Rules): boolean => {
    for (let option in options) {
        const rules = options[option];
        const value = data[option] ?? "";
        if (typeof (rules) == "string") {
            if (globalRule(globalRules[rules], rules, value, {})) continue;
            return false;
        }

        const promises = Object.entries(rules).map(async ([name, rule]) => {
            if (name == "callback" && typeof (rule) == "function") {
                await rule(value);
            } else {
                globalRule(globalRules[name], name, value, rule);
            }
        })
        Promise.all(promises)
    }
    return true;
    /*
    return Object.entries(rules).map<boolean>(([key, rule]) => {
        if (typeof (rule) == "string") return globalRules[key]?.callback(data[rule]) || false;

        let bool = true;
        const value = data[key] ?? "";
        if (rule.callback) bool &&= rule.callback(rule.value);
        if (rule.required) bool &&= value.length !== 0;
        if (rule.minLength) bool &&= value.length >= rule.minLength;
        if (rule.maxLength) bool &&= value.length <= rule.maxLength;
        if (rule.regex) bool &&= rule.regex.test(value);

        console.log(bool, key, rule, value)
        return bool;
    });*/
}

const data = {
    id: 1,
    name: 'Lucas Alviene Pereira',
    email: "lucasalp1@hotmail.com"
}

const options = {
    id: {
        required: true,
        minLength: 10
    },
    email: 'email',
    name: {
    }
}

try {

    console.log(ValidData(data, options))
} catch (e) {
    console.log(e);
}

export default ValidData;