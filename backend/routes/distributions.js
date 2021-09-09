const Distribution = require("../models/Distribution");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//ADD DISTRIBITIONS
router.post("/addDistributions", async (req, res) => {
    try {
        req.body.map(async distribution =>
            //create new distribution
            {
                const newDistribution = new Distribution({
                    address: distribution.address,
                    phoneNumber: distribution.phoneNumber,
                    food: distribution.food,
                    medicines: distribution.medicines,
                    distributor: distribution.distributor,
                    isDone: false,
                    date: distribution.date,
                    lat: distribution.lat,
                    lng: distribution.lng
                });
                //save distribution 
                await newDistribution.save();
            }
        )
        //respond
        res.status(200).json('החלוקות נשמרו בהצלחה');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET DISTRIBITIONS
router.post("/getDistributions", async (req, res) => {
    try {
        const distributions = await Distribution.find({ distributor: req.body.user.name, date: req.body.date });
        res.status(200).json(distributions);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET ALL DISTRIBITIONS
router.post("/getAllDistributions", async (req, res) => {
    try {
        const distributions = await Distribution.find({ date: req.body.date });
        res.status(200).json(distributions);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//UPDATE DISTRIBITIONS
router.post("/updateDistributions", async (req, res) => {
    try {
        req.body.map(async distribution =>
            {
                await Distribution.updateOne({ _id: distribution._id }, { isDone: distribution.isDone });
            }
        )
        //respond
        res.status(200).json('החלוקות התעדכנו בהצלחה');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//LOGIN
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong email or password");
    
    user.isConnected = true;
    await user.save();

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong email or password");

    //send response
    res.status(200).json({ _id: user._id, email: user.email, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json(err);
  }
});
  
//LOGOUT
// router.post("/logout", async (req, res) => {
//   try {
//     //find user
//     const user = await User.findOne({ isConnected: true });    
//     user.isConnected = false;
//     await user.save();

//     //send response
//     res.status(200).json("success to logout");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//isConnected
// router.post("/isConnected", async (req, res) => {
//   try {
//     //find user
//     const user = await User.findOne({ isConnected: true });
//     if (!user) {
//       res.status(200).json(null);
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//getDistributors
// router.post("/getDistributors", async (req, res) => {
//   try {
//     //find user
//     const distributors = await User.find({ isAdmin: false });
//     res.status(200).json(distributors);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;