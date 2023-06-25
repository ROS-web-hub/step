import { Container } from "semantic-ui-react";
import React, { useState } from 'react';
import { Navbar } from "./Navbar";
import Swal from 'sweetalert2'


export const Layout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {

  const [formData, setFormData] = useState({
    num1: 0,
    num2: 0,
  });

  const [jsn, setJsn] = useState('');

  const { num1, num2 } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });




  const generate = async (num1: number, num2: number) => {
    const result = await fetch("http://localhost:3000/api/test/", {
      method: "POST",
      body: JSON.stringify({ num1, num2 }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      Swal.fire({
        icon: 'success',
        title: 'success',
        text: 'The operation successed!',
      })
    }
  }


  const mainFunc = (value: number, value2: number) => {
    let flag = 0;
    let result = '';
    const max = parseInt(String(value)) > parseInt(String(value2)) ? parseInt(String(value)) : parseInt(String(value2));
    const min = parseInt(String(value)) < parseInt(String(value2)) ? parseInt(String(value)) : parseInt(String(value2));
    const minLen = String(min).length;
    const maxLen = String(max).length;

    let sumString = '', carryString = '';

    for (var i = 0; i < minLen; i++) {
      if (String(min).length == i) {
        break;
      }

      let sum = parseInt(String(value)[String(value).length - i - 1]) + parseInt(String(value2)[String(value2).length - i - 1]) + flag;

      if ((maxLen == minLen) && (i == (minLen - 1))) {
        sumString = sum + sumString;
      } else if (sum >= 10 && i == 0) {
        carryString = "1_";
        sumString = sum % 10 + sumString;
        flag = 1;
      } else if (sum >= 10) {
        carryString = "1" + carryString;
        sumString = sum % 10 + sumString;
        flag = 1;
      } else {
        carryString = "0" + carryString;
        sumString = sum % 10 + sumString;
        flag = 0;
      }

      result += `"step${i + 1}": { "carryString": "${carryString}", "sumString": "${sumString}" },`;

    }

    let pre = maxLen == minLen ? '0' : String(max).substring(0, Math.abs(maxLen - minLen));
    if (pre != '0') {
      sumString = parseInt(pre) + flag + sumString;
      result += `"step${i + 1}": { "carryString": "${carryString}", "sumString": "${sumString}" } } \r\n`;
    }

    result = "{" + result;

    console.log("%c Line:70 🍆 result", "color:#2eafb0", result);
    return result;
  }


  const clickHandler = () => {
    if (parseInt(String(num1)) + parseInt(String(num2)) < 0) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'The input values are invalid!',
      });
      return;
    }

    setJsn(mainFunc(num1, num2));
  };

  const saveHandler = () => {
    if (parseInt(String(num1)) + parseInt(String(num2)) < 0) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'The input values are invalid!',
      });
      return;
    }

    generate(num1, num2);
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 row">
            <div className="col-4 text-center align-self-end label">First Number:</div>
            <div className="col-8">
              <div className="form-group">
                <label htmlFor=""></label>
                <input type="text"
                  className="form-control custom-grey" name="num1" id="" aria-describedby="helpId" placeholder="" onChange={onChange} />
              </div>
            </div>

          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 row">
            <div className="col-4 text-center align-self-end label">Second Number:</div>
            <div className="col-8">
              <div className="form-group">
                <label htmlFor=""></label>
                <input type="text"
                  onChange={onChange}
                  className="form-control custom-grey" name="num2" id="" aria-describedby="helpId" placeholder="" />
              </div>
            </div>
          </div>
        </div>
        <div className="justify-content-center row p-3">
          <div className="col-10 col-sm-8 d-flex justify-content-lg-end">
            <button type="button" className="btn btn-outline-dark" onClick={clickHandler}>Generate Steps</button>
          </div>
        </div>
        <div className="col-10 col-sm-8 p-3 custom-grey m-auto mid-box text-white">
          {jsn}
        </div>
        <div className="justify-content-center row p-3">
          <div className="col-10 col-sm-8 d-flex justify-content-lg-end">
            <button type="button" className="btn px-3 mt-5 save" onClick={saveHandler}>Save results to DB</button>
          </div>
        </div>
      </div>
    </>
  );
};
