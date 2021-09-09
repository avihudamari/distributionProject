const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/users');
const distributionRoute = require('./routes/distributions');
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const postsRouter = require("./routes/posts");

dotenv.config();

app.use(express.json());

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
           })   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

 
app.get('/', (req, res) => {
    res.send('server running...')    
})

app.use("/api/users", userRoute);
app.use("/api/distributions", distributionRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/server/posts", postsRouter);

app.listen(8800, () => {
    console.log("Backend server is running!");
});

//module.exports = mongoose;