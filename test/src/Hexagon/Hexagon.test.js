import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Layout from "../../../src/Layout";
import Hexagon from "../../../src/Hexagon/Hexagon";

test("Hexagon should render correctly with default props", () => {
  const tree = renderer
    .create(
      <Layout
        className={"test1"}
        size={{ x: 6, y: 6 }}
        flat={false}
        spacing={1.1}
        origin={{ x: 0, y: 0 }}
      >
        <Hexagon q={0} r={0} s={0}>
          <div>child</div>
        </Hexagon>
      </Layout>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Hexagon should work", () => {
  let playDoh;
  const wrapper = mount(
    <Layout
      className={"layout"}
      size={{ x: 6, y: 6 }}
      flat={false}
      spacing={1.1}
      origin={{ x: 0, y: 0 }}
    >
      <Hexagon
        q={0}
        r={0}
        s={0}
        fill={"#333"}
        className={"test1"}
        data={{ a: "b" }}
        onMouseEnter={() => {
          playDoh = "mouseEnter";
        }}
        onMouseOver={() => {
          playDoh = "mouseOver";
        }}
        onMouseLeave={() => {
          playDoh = "mouseLeave";
        }}
        onClick={() => {
          playDoh = "click";
        }}
        onDragStart={() => {
          playDoh = "dragStart";
        }}
        onDragEnd={() => {
          playDoh = "dragEnd";
        }}
        onDragOver={() => {
          playDoh = "dragOver";
        }}
        onDrop={() => {
          playDoh = "drop";
        }}
      >
        <div>child</div>
      </Hexagon>
    </Layout>
  );

  const selector1 = "g.hexagon-group.test1";
  expect(wrapper.find(selector1).length).toBe(1);

  wrapper.find(selector1).simulate("mouseEnter");
  expect(playDoh).toBe("mouseEnter");

  wrapper.find(selector1).simulate("mouseOver");
  expect(playDoh).toBe("mouseOver");

  wrapper.find(selector1).simulate("mouseLeave");
  expect(playDoh).toBe("mouseLeave");

  wrapper.find(selector1).simulate("click");
  expect(playDoh).toBe("click");

  wrapper
    .find(selector1)
    .simulate("dragStart", { dataTransfer: { setData: () => {} } });
  expect(playDoh).toBe("dragStart");

  wrapper
    .find(selector1)
    .simulate("dragEnd", { dataTransfer: { setData: () => {} } });
  expect(playDoh).toBe("dragEnd");

  wrapper.find(selector1).simulate("dragOver");
  expect(playDoh).toBe("dragOver");

  wrapper.find(selector1).simulate("drop", {
    dataTransfer: { getData: (data) => JSON.stringify({ data }) },
  });
  expect(playDoh).toBe("drop");
});

test("Hexagon should work", () => {
  let playDoh;
  const wrapper2 = mount(
    <Layout
      className={"layout"}
      size={{ x: 6, y: 6 }}
      flat={false}
      spacing={1.1}
      origin={{ x: 0, y: 0 }}
    >
      <Hexagon q={0} r={0} s={0} className={"test2"}>
        <div>child</div>
      </Hexagon>
    </Layout>
  );

  const selector2 = "g.hexagon-group.test2";
  expect(wrapper2.find(selector2).length).toBe(1);

  wrapper2.find(selector2).simulate("mouseEnter");
  expect(playDoh).toBe(undefined);

  wrapper2.find(selector2).simulate("mouseOver");
  expect(playDoh).toBe(undefined);

  wrapper2.find(selector2).simulate("mouseLeave");
  expect(playDoh).toBe(undefined);

  wrapper2.find(selector2).simulate("click");
  expect(playDoh).toBe(undefined);

  wrapper2.find(selector2).simulate("dragStart");
  expect(playDoh).toBe(undefined);

  wrapper2.find(selector2).simulate("dragEnd");
  expect(playDoh).toBe(undefined);

  wrapper2.find(selector2).simulate("dragOver");
  expect(playDoh).toBe(undefined);

  wrapper2.find(selector2).simulate("drop");
  expect(playDoh).toBe(undefined);
});
