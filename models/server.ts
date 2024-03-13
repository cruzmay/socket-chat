
import express, { Express } from "express";
import cors from "cors";
import socketServer from "http"
import { Server as SocketServer } from "socket.io"
import { PathsInterface } from "../interfaces/pathsInterfaces";
import { authRouter } from "../Routes/auth";
import { socketController } from "../sockets/socketController";
import { dbConnection } from "../database/dbconnection";
import { userRouter } from "../Routes/users";



export class Server {
  private app: Express;
  private port: string | undefined;
  public server: socketServer.Server<typeof socketServer.IncomingMessage, typeof socketServer.ServerResponse>;
  public io;
  public paths: PathsInterface;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      user: "/api/users", 
    };
    this.connectDatabase()
    this.server = socketServer.createServer(this.app)
    this.io = new SocketServer(this.server)
    this.middlewares();
    this.routes();
    this.socket()
  }
  private async connectDatabase() {
    await dbConnection();
  }
  private middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
  }
  public routes() {
    this.app.use(this.paths.user, userRouter);
    this.app.use(this.paths.auth, authRouter);
  }
  public socket(){
    this.io.on("connection", (socket) => socketController(socket, this.io))
  }
  public listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}
