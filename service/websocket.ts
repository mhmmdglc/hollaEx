import crypto from "crypto";

const WS_URL = "wss://api.hollaex.com/stream";

const API_KEY = process.env.NEXT_HOLLAEX_API_KEY || "";
const API_SECRET = process.env.NEXT_HOLLAEX_API_SECRET || "";

class WebSocketService {
  private ws: globalThis.WebSocket | null = null;
  private isPrivate: boolean = false;
  private listeners: ((data: any) => void)[] = [];
  private useAuth: boolean = false;
  private messageQueue: string[] = [];

  constructor(useAuth = false) {
    this.useAuth = useAuth;
  }

  private generateSignature(): { signature: string; expires: string } {
    const expires = Math.floor(Date.now() / 1000) + 60;
    const signaturePayload = `CONNECT/stream${expires}`;
    const signature = crypto.createHmac("sha256", API_SECRET).update(signaturePayload).digest("hex");
    return { signature, expires: expires.toString() };
  }

  connect() {
    if (this.ws) {return;}

    let wsUrl = WS_URL;

    if (this.useAuth && API_KEY && API_SECRET) {
      const { signature, expires } = this.generateSignature();
      wsUrl = `${WS_URL}?api-key=${API_KEY}&api-signature=${signature}&api-expires=${expires}`;
      this.isPrivate = true;
    }

    this.ws = new globalThis.WebSocket(wsUrl);

    this.ws.onopen = () => {
      this.messageQueue.forEach(message => {
        this.ws?.send(message);
      });
      this.messageQueue = [];
      this.ping();
    };

    this.ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      this.listeners.forEach((callback) => callback(parsedData));
    };

    this.ws.onclose = () => {
      this.ws = null;
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  private ping() {
    setInterval(() => {
      if (this.ws) {
        this.ws.send(JSON.stringify({ op: "ping" }));
      }
    }, 30000);
  }

  private sendMessage(message: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  subscribeToTrades(symbol: string, callback: (data: any) => void) {
    if (!this.ws) {this.connect();}
    this.listeners.push(callback);

    const message = JSON.stringify({
      op: "subscribe",
      args: [`trade:${symbol}`],
    });

    this.sendMessage(message);
  }

  subscribeToOrderbook(symbol: string, callback: (data: any) => void) {
    if (!this.ws) {this.connect();}
    this.listeners.push(callback);

    const message = JSON.stringify({
      op: "subscribe",
      args: [`orderbook:${symbol}`],
    });

    this.sendMessage(message);
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

const wsService = new WebSocketService(false); 
export default wsService;