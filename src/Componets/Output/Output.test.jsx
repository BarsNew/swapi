import { render, screen } from "@testing-library/react";
import Output from "./Output";
import Context from "../Context/Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const fakeFunction = jest.fn();
const dataSW = [
  { name: "testName", url: "test/test/test-human-url" },
  { name: "testName2", url: "test/test/test-human-url2" },
  { name: "testName3", url: "test/test/test-human-url3" },
  { name: "testName4", url: "test/test/test-human-url4" },
  { name: "testName5", url: "test/test/test-human-url5" },
  { name: "testName6", url: "test/test/test-human-url6" },
  { name: "testName7", url: "test/test/test-human-url7" },
  { name: "testName8", url: "test/test/test-human-url8" },
  { name: "testName9", url: "test/test/test-human-url9" },
  { name: "testName10", url: "test/test/test-human-ur10" },
];

describe("Output", () => {
  it("show data", () => {
    render(
      <Context.Provider value={11}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Output
                  data={dataSW}
                  counterPlus={fakeFunction}
                  counterMinus={fakeFunction}
                  numberPagination={1}
                  openBlockPagination={true}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </Context.Provider>,
    );
    expect(screen.getByTestId("main-block")).toBeInTheDocument();
    expect(screen.getByText("testName")).toBeInTheDocument();
    expect(
      screen.getByTestId("main-block").querySelectorAll("a").length,
    ).toBeGreaterThanOrEqual(10);
  });

  it("show withous data", () => {
    render(
      <Context.Provider value={11}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Output
                  data={[]}
                  counterPlus={fakeFunction}
                  counterMinus={fakeFunction}
                  numberPagination={1}
                  openBlockPagination={true}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </Context.Provider>,
    );
    expect(screen.queryByText("testName")).toBeNull();
    expect(screen.getByText(/No data/i)).toBeInTheDocument();
  });
});
