import Emitter from 'component-emitter';
import { SocketClientMock } from './socket-client';
/**
 * Mocked Socket.IO server.
 */
export declare class SocketServerMock extends Emitter {
    /**
     * Mocked Socket.IO client.
     */
    clientMock: SocketClientMock;
    /**
     * List of rooms.
     */
    rooms: string[];
    _emitFn: (event: string, ...args: any[]) => Emitter;
    generalCallbacks: {
        [key: string]: Function;
    };
    /**
     * Broadcast to a room.
     *
     * @return {Function} Broadcast options.
     */
    broadcast: {
        /**
         * Broadcast to a room.
         *
         * @param {string} room The room to broadcast to.
         * @return {Function} Functions to perform on the room.
         **/
        to: (room: string) => {
            /**
             * Emit to the room.
             *
             * @param {string} event
             * @param {any[]} args
             **/
            emit: (event: string, ...args: any[]) => void;
        };
    };
    /**
     * Creates a new SocketMock instance.
     **/
    constructor();
    /**
     * Emit an event to the server (used by client).
     *
     * @param {string} event - The event.
     * @param {any[]} args - Additional args.
     * @param {Emitter} ack - The ack argument is optional. When the server calls it, args reply will be delivered to client
     **/
    emitEvent: (event: string, args: any[], ack?: Function | undefined) => Emitter;
    /**
     * Register on every event that the server sends.
     * @param {string} event
     * @param {Function} callback
     **/
    onEmit: (event: string, callback: Function) => void;
    /**
     * Emit an event to the client.
     *
     * @param {string} event - The event.
     * @param {any[]} args - Additional args.
     **/
    emit: (event: string, ...args: any[]) => Emitter<string>;
    /**
     * Join a room.
     *
     * @param {string} room The room we want to join.
     **/
    join: (room: string) => void;
    /**
     * Leave a room.
     *
     * @param {string} room The room you want to leave.
     **/
    leave: (room: string) => void;
    /**
     * Monitor logging feature.
     *
     * @param {string} value The value you want to monitor.
     **/
    monitor: (value: string) => string;
    /**
     * Close the socket server.
     *
     * @returns {SocketServerMock} The mocked Socket.IO server.
     */
    disconnect: () => SocketServerMock;
    /**
     * Broadcast to a room.
     *
     * @param {string} room The room to broadcast to.
     * @return {Record<string, Function>} Functions to perform on the room.
     **/
    to: (room: string) => Record<string, Function>;
}
export default SocketServerMock;
