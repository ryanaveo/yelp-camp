const express = require("express"),
	  Campground = require("../models/campground"),
	  Comment = require("../models/comment"),
      router = express.Router({mergeParams: true}); //mergeParams will merge any req.params passed to the router into the router's req.params


// =============================
// COMMENTS ROUTES
// =============================

// Comments New
router.get("/new", isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})
});

// Comments Create
router.post("/", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err);
				} else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	});
});

// EDIT
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, comment){
		if (err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: comment});
		}
	})
	// res.render("/comments/edit")
});

// UPDATE
router.put("/:comment_id", checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
			if (err) {
				res.redirect("back");
			}
			else {
				res.redirect("/campgrounds/" + req.params.id);
			}
	})
})

// DESTROY
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
})

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkCommentOwnership(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
				if (err) {
					res.redirect("back");
				} else {
					// foundCampground.author.id and req.user._id have different types so it wont work in comparing them
					if(foundComment.author.id.equals(req.user._id)) {
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