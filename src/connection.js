const express = require("express");
const cors = require("cors");
const app = express();
const truecallerjs = require("truecallerjs");

var verifier = require("email-verify");
var infoCodes = verifier.verifyCodes;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

app.post("/testNumber", (req, res) => {
  var number = req.body || "";
  var numberString = JSON.stringify(number)
    .replace(":", "")
    .replace("{", "")
    .replace("}", "")
    .replace('"', "")
    .replace('"""', "")
    .replace(" ", "");
  console.log("testing", numberString, "...");
  var searchData = {
    number: numberString,
    countryCode: "MZ",
    installationId:
      "a1i01--abM1cUktkZanw_tRjsTsbNWZ3kA1doslvKdjLp1T3huBKsaJnB6VaybEB",
    output: "JSON",
  };
  var sn = truecallerjs.searchNumber(searchData).then((resp) => {
    var jsonResp = JSON.parse(resp);
    var name = jsonResp.data[0].name || null;
    if (name) {
      res.json(name);
      console.log(resp);
    } else {
      res.json("Sem nome");
      console.log(resp);
    }
  });
});

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
      res.json(err + "");
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
        if (info.code === infoCodes.SMTPConnectionTimeout) {
          console.log(info.code);
          result = result + "smtp connection timeout";
        }
        if (info.code === infoCodes.invalidEmailStructure) {
          console.log(info.code);
          result = result + "O email apresenta uma estrutura errada";
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
// const PORT = process.env.PORT || 6969;
app.listen(PORT, () => console.log(`Listenting on port ${PORT}...`));
