const express = require("express");
const app = express();
app.get("/", function(request, response){
    response.send("<h2>Привет, Октагон!</h2>");
});
app.get("/static", function(request, response){
    response.send({ header: "Hello", body: "Octagon NodeJS Test" });
});
app.get("/dynamic", function(request, response) {
    const a = parseInt(request.query.a);
    const b = parseInt(request.query.b);
    const c = parseInt(request.query.c); 
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        response.send({ header: "Error" });
    } else {
        const result = (a * b * c) / 3;
        response.send({ header: "Calculated", body: result.toString() });
    }
});
app.listen(3000);