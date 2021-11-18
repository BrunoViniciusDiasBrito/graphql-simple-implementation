const App = require("./config/config");

const PORT = 5000;

App.listen(PORT, () => {
  console.log("Logado em " + PORT);
});
