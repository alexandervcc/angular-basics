import { ReversePipe } from "./reverse.pipe";

describe("Pipe Tests", () => {
  it("should reverse", () => {
    let pipe = new ReversePipe();
    expect(pipe.transform("XD")).toEqual("DX");
  });
});
