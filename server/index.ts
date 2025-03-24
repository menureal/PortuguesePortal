import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { setupWebSocket } from "./websocket";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    log("[Setup] Starting server initialization...");

    log("[Setup] Registering routes...");
    const server = await registerRoutes(app);
    log("[Setup] Routes registered successfully");

    log("[Setup] Configuring WebSocket...");
    setupWebSocket(server);
    log("[Setup] WebSocket configured");

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`[Error] ${message}`);
      res.status(status).json({ message });
    });

    // Setup Vite or static files
    if (app.get("env") === "development") {
      log("[Setup] Configuring Vite for development...");
      await setupVite(app, server);
      log("[Setup] Vite configured successfully");
    } else {
      log("[Setup] Setting up static file serving...");
      serveStatic(app);
      log("[Setup] Static file serving configured");
    }

    const port = 5000;
    log("[Setup] About to start server on port " + port);

    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log("[Ready] Server is now listening on port " + port);
      log("[Info] You can now view the site at: http://localhost:5000");
    });

  } catch (error) {
    log("[Fatal] Error starting server: " + error);
    process.exit(1);
  }
})();