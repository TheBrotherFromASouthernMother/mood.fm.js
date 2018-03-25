function switchStatement (weatherConditions, response, render) {
  switch(true) {
    case (weatherConditions <= 500):
      console.log(weatherConditions);
      render.view('Rain.html');
      response.end();
    break;
    case (weatherConditions >= 800):
      console.log('this is problem');
      render.view('Snow.html');
      response.end();
    break;
    default:
    render.view('Rain.html');
    response.end();
} //end switch


}

module.exports.switchStatement = switchStatement;
