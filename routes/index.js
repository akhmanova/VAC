var express = require('express');
var router = express.Router();

const credentials = [
    { name: "Backend Developers", pswd: "943a0_3" },
    { name: "Frontend Developers", pswd: "940H52c88" },
    { name: "QA & automation", pswd: "950TBx62" },
    { name: "UI/UX", pswd: "96q803Pc" }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    console.log(req.body);
    var errDesc = "Неверный пароль";
    for(var i = 0; i < credentials.length; i++) {
        if (req.body.team == credentials[i].name && req.body.password == credentials[i].pswd) {
            errDesc = "Success";
        }
    }
    res.status(200);
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({ "msg" : errDesc }));
});

module.exports = router;
