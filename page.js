function switchStatement (weatherConditions, response, render) {
  switch(true) {
    case (weatherConditions <= 500):
    console.log(weatherConditions);
    render.view('Rain');
    response.end();
    break;
    case (weatherConditions >= 800):
    render.view('Snow');
    response.end();
    break;
    default:
    render.view('Rain');
    response.end();
} //end switch


}

module.exports.switchStatement = switchStatement;
