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
  console.log("testing", emailString, "...");
  
  verifier.verify(emailString, function (err, info) {
    if (err) {
      console.log(err);
      res.json(err + " ");
    } else {
      if (info.success) {
        res.json("true");
        console.log("O email é válido");
        console.log(info.code);
      } else {
        var result = "";
        if (info.code === infoCodes.domainNotFound) {
          console.log(info.code);
          result = result + "O domínio não foi encontrado";
        }

        if (info.code === infoCodes.noMxRecords) {
          console.log(info.code);
          result = result + "Não há rotas para o domínio";
        }

        if (info.code === infoCodes.invalidEmailStructure) {
          console.log(info.code);
          result = result + "O email apresenta uma estrutura errada";
        }

        if (info.code === infoCodes.SMTPConnectionTimeout) {
          console.log(info.code);
          result = result + "smtp connection timeout";
        }

        if (info.code === 1) {
          console.log(info.info);
          result = result + "O email é inválido";
        }
        res.json(result);
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listenting on port ${PORT}...`));
