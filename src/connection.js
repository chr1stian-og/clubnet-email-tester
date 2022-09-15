const express = require("express");
const cors = require("cors");
const app = express();

var verifier = require("email-verify");
var infoCodes = verifier.verifyCodes;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

app.post("/testEmail", (req, res) => {
  var email = req.body || "";
  var emailString = JSON.stringify(email)
    .replace(":", "")
    .replace("{", "")
    .replace("}", "")
    .replace('"', "")
    .replace('"""', "")
    .replace(" ", "");
  console.log("testing ", emailString, "...");
  verifier.verify(emailString, function (err, info) {
    if (err) console.log(err);
    else {
      var result = "";
      if (info.code === infoCodes.finishedVerification) {
        if (info.success) {
          res.json(info.success);
        } else {
          result = "O email é inválido";
        }
      }
      if (info.code === infoCodes.domainNotFound) {
        result = result + " dominio não encontrado";
      }
      if (info.code === infoCodes.invalidEmailStructure) {
        result = result + " invalid email structure";
      }
      if (info.code === infoCodes.noMxRecords) {
        result = result + " não foram encontradas rotas para o dominio";
      }
      if (info.code === infoCodes.SMTPConnectionTimeout) {
        result = result + " smtp connection timeout";
      }
      if (info.code === infoCodes.SMTPConnectionError) {
        result = result + " erro ao conectar com smtp";
      }
      res.json(result);
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listenting on port ${PORT}...`));
