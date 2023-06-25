import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM tasks";
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case "POST":
      try {
        const { num1, num2 } = body;

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

        const query = "INSERT INTO test(data) VALUES ($1) RETURNING *";
        const values = [mainFunc(parseInt(num1), parseInt(num2))];
        const response = await conn.query(query, values);

        console.log("%c Line:78 🍇 response.rows[0]", "color:#6ec1c2", response.rows[0]);
        return res.json(response.rows[0].data);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}
