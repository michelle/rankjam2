var express = require('express');
var fs = require('fs');
var app =  express.createServer();

var nowjs = require('now');
var everyone = nowjs.initialize(app);

// Initialize main server
app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', function(req, res) {
    res.render('index');
});

app.get('/token/:token', function(req, res){
  console.log('post', req.params);
    if(!users[req.params.token]) {
      users[req.params.token] = {};
    }
  res.send('ok');
});

app.listen(80);

var users = {};

var current = -1;

var contestants = [
  'test1', 'test2', 'test3'
];

everyone.now.vote = function(id, token) {
  if (users[token]) {
    users[token][id] = true;
  }
}

everyone.now.unvote = function(id, token) {
  if (users[token]) {
    delete users[token][id];
  }
}

everyone.now.spit = function(){
  console.log('users', users);
  console.log('contestants', contestants);
  console.log('current', current);
};
nowjs.on('connect', function(){
  
  this.now.change(contestants[current], current);

});
everyone.now.next = function(pass) {
  if (pass == '333') {
    current++;
    if(current == contestants.length) {
      var scores = [];
      for(var token in users) {
        for(var i in users[token]) {
          if(users[token][i] === true) {
            if(scores[i]) {
              scores[i].score += 1;
            } else {
              scores[i] = {title: contestants[i], score: 1};
            }
          }
        }
      }
      everyone.now.finish(scores);
    } else {
      everyone.now.change(contestants[current], current);
    }
  }
}


