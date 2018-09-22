const express = require("express"),
	  Campground = require("../models/campground"),
	  User = require("../models/user"),
	  Comment = require("../models/comment"),
	  passport = require("passport"),
      router = express.Router();


router.get("/", function(req, res) {
	res.render("landing");
});

// =============================
// AUTH ROUTES
// =============================

// show register form
router.get("/register", function(req, res){
	res.render("register");
});

// sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

// show login form
router.get("/login", function(req, res){
	res.render("login");
});

// middleware
router.post("/login", passport.authenticate("local", {
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res) {
	}
);

// logout
router.get("/logout", function(req,res){
	req.logout();
	res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;