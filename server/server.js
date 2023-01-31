const mongoose = require("mongoose");
const dotenv=require("dotenv")
const path = require("path");

dotenv.config();
const app = require("./app");


mongoose
  .connect(process.env.DATABASE_LOCAL, {
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false
  })
  .then(() => console.log(`Connection sucessfully`));

  
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});