const { TestWatcher } = require("jest");
const axios = require("axios");

let skip = 20,
  limit = 10;

test("this should return first 10 documents with status code 200 and flight numbers 1 to 10", async () => {
  const response = await axios.get("http://localhost:3001/getRocketDetails");
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(10);

  for (var i in response.data) {
    expect(Number(response.data[i].flight_number)).toBe(Number(i) + 1);
  }
});

test(`this should skip ${skip} docs and return ${limit} docs with flight_number ${
  skip + 1
} to ${skip + limit + 1}`, async () => {
  const response = await axios.get(
    `http://localhost:3001/getRocketDetails?skip=${skip}&limit=${limit}`
  );
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(limit);

  for (var i in response.data) {
    expect(+response.data[i].flight_number).toBe(skip + Number(i) + 1);
  }
});
