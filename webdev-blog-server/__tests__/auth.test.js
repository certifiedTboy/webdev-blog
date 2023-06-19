const request = require("supertest");
// import app from "../"
import app from "../src/app";

describe("Test GET /api/v1/blog", () => {
  test("It should respond with 200", async () => {
    const response = await request(app).get("/api/v1/blog").expect(200);
  });
});
