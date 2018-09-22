const express = require("express"),
      Campground = require("../models/campground"),
	  Comment = require("../models/comment"),
      router = express.Router();

// INDEX
router.get("/", function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

// POST
router.post("/", isLoggedIn, function(req, res) {
	// get data from form and add to campgrounds array
	// redirect back to campgrounds page
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: desc, author:author};
	Campground.create(
		newCampground, 
		function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			console.log(campground);
			res.redirect("/campgrounds");
		}
	});
});

// SHOW FORM
router.get("/new", isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});


// EDIT
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE
router.put("/:id", checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedCampground) {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}

	});
});

// DESTROY
router.delete("/:id", checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
	// is user logged in?
	// if not, redirect,; if user is logged in, does user own campground? 
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
				if (err) {
					res.redirect("back");
				} else {
					// foundCampground.author.id and req.user._id have different types so it wont work in comparing them
					if(foundCampground.author.id.equals(req.user._id)) {
							next();
					} else {
						res.redirect("back");
					}
				}
		});
	} else {
		res.redirect("back");
	}
}


module.exports = router;