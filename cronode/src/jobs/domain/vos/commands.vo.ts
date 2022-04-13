import { Payload } from './payload.vo'

export type CommandType = 'http' | 'shell'

export class Command {
    constructor(
        private readonly commandType: CommandType,
        private readonly payload?: Payload | null | undefined
    ) {
        if (payload && payload instanceof Payload)
            this.payload = payload
    }
}