import { io, Socket } from 'socket.io-client';

export type TelemetryState = {
  deviceId: string;
  temperature: number;
  humidity: number;
  relay: boolean;
  button: boolean;
  timestamp: number;
  lastSeen: number;
};

export type CommandPayload = { deviceId: string; command: unknown };

// Singleton Socket.IO client to share connection across the app.
class TelemetrySocket {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return this.socket;

    const url = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000';
    this.socket = io(url, {
      transports: ['websocket'],
      autoConnect: true,
    });
    return this.socket;
  }

  onLatest(handler: (data: TelemetryState[]) => void) {
    this.connect().on('telemetry:latest', handler);
  }

  onUpdate(handler: (data: TelemetryState) => void) {
    this.connect().on('telemetry:update', handler);
  }

  off(event: string, handler: (...args: any[]) => void) {
    this.socket?.off(event, handler);
  }

  sendRelay(body: CommandPayload) {
    this.connect().emit('command:relay', body);
  }

  sendFan(body: CommandPayload) {
    this.connect().emit('command:fan', body);
  }

  sendLight(body: CommandPayload) {
    this.connect().emit('command:light', body);
  }
}

export const telemetrySocket = new TelemetrySocket();
