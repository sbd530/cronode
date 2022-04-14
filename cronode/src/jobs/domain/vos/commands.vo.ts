import { Payload } from './payload.vo'

export type CommandType = 'http' | 'shell'

export abstract class Command {
    payload?: Payload | null | undefined
}

export class HttpCommand extends Command {

}

export class ShellCommand extends Command {

}