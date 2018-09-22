const mongoose = require("mongoose"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment")

var data = [
	{
		name: "Cloud's Rest",
		image: "https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
		description: "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke. "
	},
	{
		name: "Rocky Hill",
		image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
		description: "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke. "
	},
	{
		name: "Mt Winter",
		image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
		description: "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke. "
	}
]

function seedDB() {
	// remove all campgrounds
	Campground.remove({}, function(err) {
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// 	console.log("removed campgrounds!");

	// 	// add a few campgrounds
	// 	data.forEach(function(seed) {
	// 	Campground.create(seed, function(err, campground) {
	// 		if (err) {
	// 			console.log(err);
	// 		} else {
	// 			console.log("added a campground");
	// 			// create a comment
	// 			Comment.create(
	// 				{
	// 					text: "This place is great",
	// 					author: "Homer"
	// 				}, function(err, comment) {
	// 					if (err) {
	// 						console.log(err);
	// 					}
	// 					else {
	// 						campground.comments.push(comment);
	// 						campground.save();
	// 						console.log("Created new comment");
	// 					}
	// 				})
	// 		}
	// 	})
	// })
	// })
})};
module.exports = seedDB;
