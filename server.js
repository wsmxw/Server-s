const express = require("express");
const app = express();
app.get("/", function(request, response){
    response.send("<h2>Привет, Октагон!</h2>");
});
app.listen(3000);