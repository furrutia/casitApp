import express, { Router } from 'express';

interface Options {
    port: number,
    routes: Router,
    public_path?: string
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.routes = routes;
        this.publicPath = public_path;
    }

    async start() {

        //Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        //Public Folder
        this.app.use(express.static(this.publicPath));

        //Routes
        this.app.use(this.routes);
        
        //Listen
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        })
    }    

}