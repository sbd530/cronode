export type PayloadFormat = 'json' | 'xml' | 'text' | 'binary' | 'argument'

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