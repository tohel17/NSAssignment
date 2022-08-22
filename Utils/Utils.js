import axios from 'axios';
import {config} from './../Environment';

export const ValidateEmail = Email => {
  return Email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
    ? true
    : false;
};

export const calculate = async (num1, num2, opertaion) => {
  try {
    var data = JSON.stringify({
      firstNum: num1,
      secondNum: num2,
      operation: opertaion,
    });
    var configApi = {
      method: 'post',
      url: `${config.calculatorApi}calculate`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const res = await axios(configApi);
    let result = JSON.stringify(res.data);
    return result;
  } catch (err) {
    return {
      result: false,
      value: 'Something went wrong',
    };
  }
};
