const request = require('request');

const weather = async (_, res) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = year + month + day;
  let hour = date.getHours();
  hour = hour >= 10 ? hour : '0' + hour;
  const time = hour + '00';
  let highTemperature = '';
  let lowTemperature = '';
  let skyData = '';

  try {
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    let queryParams = '?' + encodeURIComponent('serviceKey') + `=${process.env.WEATHER_SERVICEKEY}`;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('310'); /* */
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(today); /* */
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent("0500"); /* */
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('37'); /* */
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('126'); /* */
    request({
      url: url + queryParams,
      method: 'GET'
    }, function (error, response, body) {
      //console.log('Headers', JSON.stringify(response.headers));
      // console.log('Reponse received', weather.response.body.items.item);
      let weather = JSON.parse(body);
      const weatherData = weather.response.body.items.item;
      try {
        for (let i = 0; i < weatherData.length; i++) {
          if (weatherData[i].category === "TMX") {
            highTemperature = weatherData[i].fcstValue;
          } else if (weatherData[i].category === "TMN") {
            lowTemperature = weatherData[i].fcstValue;
          } else if (weatherData[i].baseDate === today && weatherData[i].category === "SKY" && weatherData[i].fcstTime === time) {
            skyData = weatherData[i].fcstValue;
          }
        }
      } catch (error) {
        console.log(error);
      }
      return res.json({ high: highTemperature, low: lowTemperature, sky: skyData, message: "날씨 조회 성공!" });
    });
  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "날씨 조회 실패!" });
  }


};

module.exports = { weather };