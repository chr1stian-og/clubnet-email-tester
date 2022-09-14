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
      console.log("Success (T/F): " + info.success);
      console.log("Info: " + info.info);

      //Info object returns a code which representing a state of validation:

      //Connected to SMTP server and finished email verification
      console.log(info.code === infoCodes.finishedVerification);

      //Domain not found
      console.log(info.code === infoCodes.domainNotFound);

      //Email is not valid
      console.log(info.code === infoCodes.invalidEmailStructure);

      //No MX record in domain name
      console.log(info.code === infoCodes.noMxRecords);

      //SMTP connection timeout
      console.log(info.code === infoCodes.SMTPConnectionTimeout);

      //SMTP connection error
      console.log(info.code === infoCodes.SMTPConnectionError);
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listenting on port ${PORT}...`));
