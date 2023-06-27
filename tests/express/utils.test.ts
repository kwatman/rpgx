import app from "../../express/app";
import request from "supertest";
import { describe, expect, it } from "@jest/globals";

describe("health", () => {
  it("should return that the server is running", async () => {
    const res = await request(app).get("/health");

    expect(res.text).toEqual("Server is running!");
  });
});
