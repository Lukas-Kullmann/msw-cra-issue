import { rest } from "msw";
import { setupServer } from "msw/node";

it("should work", async () => {
  const server = setupServer(
    rest.get("https://examle.com/fails", (request, response) => {
      return response.networkError("oh no!");
    })
  );

  server.listen();

  const result = fetch("https://examle.com/fails");

  // msw 1.0.1
  // await expect(result).rejects.toThrow(RangeError);
  // msw 1.1.0
  await expect(result).rejects.toThrow(Error);
  await expect(result).rejects.toEqual(
    expect.objectContaining({ name: "NetworkError", message: "oh no!" })
  );
});
