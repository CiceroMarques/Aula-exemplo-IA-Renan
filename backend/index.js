import app from "./src/app.js";
import config from "./src/config/servidor.js";

app.listen(config.porta, "127.0.0.1", () => {
  console.log(`API disponível em http://127.0.0.1:${config.porta}`);
});
