var express = require("express");
var router = express.Router();
var axios = require("axios");
const config = require("../config/config")["dev"];
const verifyToken = require("../controllers/auth/token");

router.get("/", verifyToken, function (req, res, next) {
  console.log(req);
  const term = req.query.term || "pizza";
  const lat = req.query.lat || "37.786882";
  const long = req.query.long || "-122.399972";
  const aconfig = {
    method: "get",
    url: `https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${lat}&longitude=${long}`,
    headers: {
      "Authorization": config.bear
    }
  };
  axios(aconfig)
    .then(function (response) {
      const data = response.data.businesses.map((biz) => {
        let out = {
          name: biz.name,
          url: biz.image_url,
          rating: biz.rating,
          price: biz.price,
          review_count: biz.review_count
        };
        return out;
      });
      res.send(data);
    })
    .catch(function (err) {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
