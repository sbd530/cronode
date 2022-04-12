export type CommandType = typeof Http | 'shell'

export const Http = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
} as const

export type PayloadFormat = 'json' | 'xml' | 'text' | 'binary' | 'argument'

export class Command {

    commandStrategy: CommandStrategy

    payload?: Payload

    constructor(commandStrategy: CommandStrategy) {
        this.commandStrategy = commandStrategy
    }

    async init(): Promise<VoidFunction> {

        return new Promise((resolve, reject) => {
            try {
                this.commandStrategy.init()
            } catch (e) {
                reject(e)
            }

        })
    }
}

export interface CommandStrategy {
    type: CommandType
    payload?: Payload

    init(): Promise<Object>
}



export class Payload {
    format: PayloadFormat
    data: string
    encode?: string
    static builer() {
        return new PayloadBuilder()
    }
}

export class PayloadBuilder {

    private payload: Payload
    constructor() {
        this.payload = new Payload()
    }
    format(format: PayloadFormat) {
        this.payload.format = format
        return this
    }
    data(data: string) {
        this.payload.data = data
        return this
    }
    encode(encode: string) {
        this.payload.encode = encode
        return this
    }
    build() {
        return this.payload
    }
}