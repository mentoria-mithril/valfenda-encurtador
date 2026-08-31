import { ambiente } from "./ambiente.js";
import { app } from "./app.js";

app.listen(ambiente.porta, () => {
  console.log(`API no ar em ${ambiente.urlBase}`);
});
