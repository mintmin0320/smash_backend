const request = require('request');

const weather = async (req, res) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = year + month + day;
  const hour = date.getHours() + "00"
  console.log(today);
  console.log(today);

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
      console.log('Status', response.statusCode);
      //console.log('Headers', JSON.stringify(response.headers));
      const weather = JSON.parse(body);
      console.log('Reponse received', weather.response.body.items.item);
      return res.json({ result: weather.response.body.items.item, message: "날씨 조회 성공!" });
    });
  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "날씨 조회 실패!" });
  }


};

module.exports = { weather };