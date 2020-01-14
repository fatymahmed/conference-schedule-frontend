const changeDateFormat = (Time) => {
  const temp = [];
  temp.push(Number(Time.slice(0, 4)));
  temp.push(Number(Time.slice(5, 7)));
  temp.push(Number(Time.slice(8, 10)));
  temp.push(Number(Time.slice(11, 13)));
  temp.push(Number(Time.slice(14, 16)));
  const date = [];
  const time = [];
  date.push(temp[0]);
  date.push(temp[1]);
  date.push(temp[2]);
  time.push(temp[3]);
  time.push(temp[4]);
  return ({
    date: date.join('/'),
    time: time.join(':'),
  });
};

const apiURL = 'http://localhost:3001/';
// const apiURL = 'https://events-scheduler-api.herokuapp.com/';

export
{
  changeDateFormat,
  apiURL,
};
