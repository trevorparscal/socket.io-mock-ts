import Emitter from 'component-emitter';
import type { SocketServerMock } from '.';
/**
 * Mocked Socket.IO client.
 */
export declare class SocketClientMock extends Emitter {
    /**
     * Are we currently connected?
     * @default false
     */
    connected: boolean;
    /**
     * Are we currently disconnected?
     * @default true
     */
    disconnected: boolean;
    /**
     * Mocked Socket.IO server.
     */
    serverMock: SocketServerMock;
    _emitFn: (event: string, ...args: any[]) => Emitter;
    /**
     * Mocked Socket.IO client.
     *
     * @param {SocketServerMock} serverMock
     */
    constructor(serverMock: SocketServerMock);
    /**
     * Emit an event to the server.
     *
     * If the last argument is a function, then it will be called
     * as an 'ack' when the response is received. The parameter(s) of the
     * ack will be whatever data is returned from the event
     *
     * @param {string}   event - The event that we're emitting
     * @param {any[]}   args  - Optional arguments to send with the event
     * @returns {Emitter<string>}
     */
    emit: (event: string, ...args: any[]) => Emitter<string>;
    /**
     * Fire an event to the server.
     *
     * If the last argument is a function, then it will be called
     * as an 'ack' when the response is received. The parameter(s) of the
     * ack will be whatever data is returned from the event
     *
     * @param {string} event - The event that we're emitting
     * @param {any[]} args - Optional arguments to send with the event
     */
    fireEvent: (event: string, ...args: any[]) => Emitter<string>;
    /**
     * Close the socket.
     */
    close: () => this;
    /**
     * Disconnect the socket manually.
     */
    disconnect: () => this;
}
export default SocketClientMock;
