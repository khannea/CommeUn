var express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
var cookies = require("cookie-parser");
const path = require("path");

var withAuth = require("./middleware");

var Topic = require("./models/Topic.js");
var User = require("./models/User.js");
var Post = require("./models/Post.js");
var Like = require("./models/Like.js");
var Dislike = require("./models/Dislike.js");

const app = express();
const router = express.Router();

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/categories");

const connection = mongoose.connection;

const secret = "mysecretsshhh";

connection.once("open", () => {
  console.log("Je suis connecté a mongoose");
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

router.get("/topics", withAuth, (req, res) => {
  Topic.find((err, topics) => {
    if (err) console.log("route('/topics'): 'Erreur de Topic.find'");
    else {
      res.json(topics);
    }
  });
});

router.get("/topics/:id", withAuth, (req, res) => {
  Post.find({ topicId: req.params.id }, (err, posts) => {
    if (err) console.log("route('/topics/:id'): 'Erreur de Topic.find'");
    else {
      res.json(posts);
    }
  });
});

router.get("/post/:id", withAuth, (req, res) => {
  Post.find({ _id: req.params.id }, (err, post) => {
    if (err) console.log("route('/posts/:id'): 'Erreur de Topic.find'");
    else {
      res.json(post);
    }
  });
});

router.post("/editpost", withAuth, (req, res) => {
  let { id, texte } = req.body;
  Post.find({ _id: id }, (err, post) => {
    if (err) console.log("err");
    else {
      post[0].texte = texte;
      post[0].save(function(err) {
        if (err) console.log("error");
        else console.log("success");
      });
    }
  });
  res.sendStatus(200);
});

function convertDate(d) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  // var d = new Date(inputFormat);
  return (
    pad(d.getHours()) +
    "h" +
    pad(d.getMinutes()) +
    "  le " +
    [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/")
  );
}

router.route("/addPost").post((req, res) => {
  let post = new Post(req.body);
  post.user = jwt.decode(req.cookies["token"]).pseudo;
  post.date = convertDate(new Date());
  post
    .save()
    .then(post => {
      res.status(200).json({ gagnant: "Added successfully" });
    })
    .catch(err => {
      res.status(400).send("Failed to create new record");
    });
});

router.post("/dislikepost", withAuth, (req, res) => {
  let { msgId, user } = req.body;

  Dislike.find({ msgId: msgId, user: user }, (err, dislike) => {
    if (err) {
      console.log("err");
    } else {
      if (dislike.length == 0) {
        Like.deleteOne({ msgId: msgId, user: user }, function(err, result) {
          if (err) {
            console.log(err);
          }
          if (result.deletedCount > 0) {
            Post.find({ _id: msgId }, (err, post) => {
              if (err) {
                console.log("Error:" + err);
              } else {
                post[0].likes = post[0].likes - 1;
                post[0].save();
              }
            });
          }
        });
        let new_dislike = new Dislike({ msgId: msgId, user: user });
        new_dislike.save(function(err) {});
        Post.find({ _id: msgId }, (err, post) => {
          if (err) {
            console.log("Error:" + err);
          } else {
            post[0].dislikes = post[0].dislikes + 1;
            post[0].save();
            res.sendStatus(200);
          }
        });
      } else {
        // console.log("Deja disliké");
        res.sendStatus(200);
      }
    }
  });
});

router.post("/likepost", withAuth, (req, res) => {
  let { msgId, user } = req.body;

  Like.find({ msgId: msgId, user: user }, (err, like) => {
    if (err) {
      console.log("err");
    } else {
      if (like.length == 0) {
        Dislike.deleteOne({ msgId: msgId, user: user }, function(err, result) {
          if (err) {
            console.log(err);
          }
          if (result.deletedCount > 0) {
            Post.find({ _id: msgId }, (err, post) => {
              if (err) {
                console.log("Error:" + err);
              } else {
                post[0].dislikes = post[0].dislikes - 1;
                post[0].save();
              }
            });
          }
        });
        let new_like = new Like({ msgId: msgId, user: user });
        new_like.save(function(err) {});
        Post.find({ _id: msgId }, (err, post) => {
          if (err) {
            console.log("Error:" + err);
          } else {
            post[0].likes = post[0].likes + 1;
            post[0].save();
            res.sendStatus(200);
          }
        });
      } else {
        // console.log("Deja liké");
        res.sendStatus(200);
      }
    }
  });
});

router.post("/getlikes", withAuth, (req, res) => {
  let { msgId } = req.body;
  Like.find({ msgId: msgId }, (err, likes) => {
    if (err) console.log("route('/getlikes'): 'Erreur de number likes'");
    else {
      console.log("route('/getlikes'): Success number likes");
      res.json(likes.length);
    }
  });
});

router.get("/deletePost/:id", withAuth, (req, res) => {
  let id = req._parsedOriginalUrl.pathname.split("/")[2];
  console.log(id);
  Post.findOneAndDelete({ _id: id }, req.body, function(err, data) {
    if (!err) {
      console.log("Deleted");
    }
  });
  res.sendStatus(200);
});

router.route("/auth").get((req, res) => {
  User.find((err, users) => {
    if (err) console.log("erreur");
    else {
      res.json(users);
    }
  });
});

router.route("/register").post((req, res) => {
  let { pseudo, password } = req.body;
  const user = new User({ pseudo, password });
  user
    .save()
    .then(user => {
      res.status(200).json({ Register: "Success" });
    })
    .catch(err => {
      res.status(400).send("Failed to create new record");
    });
});

app.post("/authenticate", (req, res) => {
  let { pseudo, password } = req.body;
  User.findOne({ pseudo }, function(err, user) {
    if (err) {
      console.log("route('/authenticate'): User.findOne");
      console.log("route('/authenticate'): Valeur de err");
      console.error(err);
      res.status(500).json({
        error: "route(/authenticate): User.findOne res=500 Internal error "
      });
    } else if (!user) {
      res.status(401).json({
        error:
          "route(/authenticate): User.findOne res=401 Incorrect email or password"
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error:
              "route(/authenticate): user.isCorrectPassword res=500 Internal error please try again"
          });
        } else if (!same) {
          res.status(401).json({
            error:
              "route(/authenticate): user.isCorrectPassword res=401 Incorrect email or password"
          });
        } else {
          // Issue token
          const payload = { pseudo };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h"
          });
          console.log("cookie envoyé");
          res.header("token", token);
          res.header("pseudo", user.pseudo);
          res.header("budget", user.budget);
          res.header("Access-Control-Expose-Headers", "token,pseudo,budget");
          res
            .cookie("token", token, { expire: new Date() + 1800000 })
            .sendStatus(200);
        }
      });
    }
  });
});

router.get("/checkToken", withAuth, function(req, res) {
  // console.log("Je passe dans /checkToken");
  res.sendStatus(200);
});

router.get("/unsetToken", function(req, res) {
  // console.log("Je passe dans /unsetToken ");
  res.clearCookie("token", { path: "/" });
  res.sendStatus(200);
});

app.use("/", router);

app.listen(4000, () => console.log("Serveur Express sur le port 4000"));
