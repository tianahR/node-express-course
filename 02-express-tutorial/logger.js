
const logger = (req, res, next) => {
      const method = req.method;
      const url = req.url;
      const today = new Date();
      const date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
    
      console.log(method, url, dateTime);
      next();
    };

  module.exports = logger;