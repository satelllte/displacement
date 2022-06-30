/**
 * TypeScript v4.7.4 | `Worker` interface source
 * https://github.com/microsoft/TypeScript/blob/v4.7.4/lib/lib.dom.d.ts#L16826-L16839
 */
declare interface IWorker<MessageEventType> extends Worker {
  onmessage: ((this: IWorker<MessageEventType>, ev: MessageEvent<MessageEventType>) => void) | null
  onmessageerror: ((this: IWorker<MessageEventType>, ev: MessageEvent<MessageEventType>) => any) | null
  postMessage(message: MessageEventType, transfer: Transferable[]): void
  postMessage(message: MessageEventType, options?: StructuredSerializeOptions): void
}

/**
 * TypeScript v4.7.4 | `DedicatedWorkerGlobalScope` interface source
 * https://github.com/microsoft/TypeScript/blob/v4.7.4/lib/lib.webworker.d.ts#L1260-L1275
 */
declare interface IDedicatedWorkerGlobalScope<MessageEventType> extends DedicatedWorkerGlobalScope {
  onmessage: ((this: IDedicatedWorkerGlobalScope<MessageEventType>, ev: MessageEvent<MessageEventType>) => any) | null
  onmessageerror: ((this: IDedicatedWorkerGlobalScope<MessageEventType>, ev: MessageEvent<MessageEventType>) => any) | null
  postMessage(message: MessageEventType, transfer: Transferable[]): void
  postMessage(message: MessageEventType, options?: StructuredSerializeOptions): void
}
