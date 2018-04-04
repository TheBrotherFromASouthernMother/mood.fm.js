function switchStatement (weatherConditions, response, render) {
  switch(true) {
    case (weatherConditions <= 300 && weatherConditions < 600):
      console.log('Rain');
      render.view('./views/Rain.html');
      response.end();
      break;
    case (weatherConditions >= 600 && weatherConditions < 700):
      console.log('Snow');
      render.view('./views/Snow.html');
      response.end();
      break;
    case (weatherConditions >= 600 && weatherConditions < 700):
        console.log('Snow');
        render.view('./views/Snow.html');
        response.end();
        break;
    default:
    render.view('Rain.html');
    response.end();
} //end switch


}

module.exports.switchStatement = switchStatement;
