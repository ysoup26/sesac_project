const compression = require('compression');
const cors = require('cors');
const {indexRouter} =require("./src/router/indexRouter");

const express = require('express');
const app = express()
const port = 3000

//cors 설정
app.use(cors());

//body json
app.use(express.json());

//HTTP 요청
app.use(compression());

indexRouter(app);

app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`)
})