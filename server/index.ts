import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { setupWebSocket } from "./websocket";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic logging middleware
app.use((req, res, next) => {
  log(`${req.method} ${req.path}`);
  next();
});

(async () => {
  try {
    log("[Setup] Starting server initialization...");

    // Register routes first
    log("[Setup] Registering routes...");
    const server = await registerRoutes(app);
    log("[Setup] Routes registered successfully");

    log("[Setup] Configuring WebSocket...");
    setupWebSocket(server);
    log("[Setup] WebSocket configured");


    // Basic error handling
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`[Error] ${message}`);
      res.status(status).json({ message });
    });

    // Simplified static file serving for now
    log("[Setup] Setting up static file serving...");
    serveStatic(app);
    log("[Setup] Static file serving configured");

    const port = 5000;
    log("[Setup] About to start server on port " + port);

    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log("[Ready] Server is now listening on port " + port);
      log("[Info] You can now view the site at: http://localhost:5000");
      log("[Info] Test the API at: http://localhost:5000/api/test");
    });

  } catch (error) {
    log("[Fatal] Error starting server: " + error);
    process.exit(1);
  }
})();