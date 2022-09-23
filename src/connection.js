const express = require("express");
const cors = require("cors");
const app = express();
const truecallerjs = require("truecallerjs");

var verifier = require("email-verify");
const { json } = require("express");
var infoCodes = verifier.verifyCodes;

var Imap = require("imap"),
  inspect = require("util").inspect;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

app.post("/testMultiple", async (req, res) => {
  console.log(req.body);
  res.json(req.body.data);
});

app.get("/getEmails", (req, res) => {
  var imap = new Imap({
    user: "christian.macarthur@clubnet.mz",
    password: "111abcABC#",
    host: "mail.clubnet.mz",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  });

  imap.connect();

  function openInbox(cb) {
    try {
      imap.openBox("Inbox", false, cb);
    } catch (err) {
      console.log("Erro chamando a funcão openBox()");
    }
  }

  imap.once("ready", function () {
    openInbox(function (err, box) {
      if (err) throw err;
      imap.search(
        [["HEADER", "SUBJECT", "Some Subject"]],
        function (err, results) {
          if (err) throw err;
          try {
            // var f = imap.fetch(results, { bodies: "TEXT" });
            var f = imap.seq.fetch(box.messages.total + ":*", {
              bodies: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
              struct: true,
            });
            // var f = imap.seq.fetch(box.messages.total + ":*", {
            //   bodies: ["HEADER.FIELDS (FROM)", "TEXT"],
            // });

            f.on("message", function (msg, seqno) {
              msg.on("body", function (stream, info) {
                var buffer = "";
                stream.on("data", function (chunk) {
                  buffer += chunk.toString("utf8");
                  res.json(buffer);
                });
                stream.once("end", function () {
                  msg.once("attributes", function (attrs) {
                    let uid = attrs.uid;
                    imap.addFlags(uid, ["\\Seen"], function (err) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("Marked as read!`");
                      }
                    });
                  });
                });
              });
            });
            f.once("end", function () {
              imap.end();
            });
          } catch (errorWhileFetching) {
            res.json(errorWhileFetching.message);
            console.lo(errorWhileFetching.message);
            imap.end();
          }
        }
      );
    });
  });
});

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
      "a1i0A--akQhWeFW-bB_TDmoup_DXVAc-ILCPVmgkPBBW0MfLgud9nCYHZ6WAGHnq",
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
      res.json("O dominio não foi encontrado (" + err + ")");
    } else {
      if (info.success) {
        res.json("O email é válido");
        console.log("O email é válido");
        console.log(info.code);
      } else {
        req.setTimeout(5000);
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
