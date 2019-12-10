import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../util/tests";
import PCHome from "./PCHome";
import MobileHome from "./MobileHome";

const setupPC = (props = {}) => {
  const component = shallow(<PCHome {...props} />);
  return component;
};

const setupMobile = (props = {}) => {
  const component = shallow(<MobileHome {...props} />);
  return component;
};

describe("Home dashboard", () => {
  let componentPC;
  let componentMobile;

  beforeEach(() => {
    const props = {
      dashboardData: {
        gwxUsersCount: 2,
        adminCount: 2,
        telegramUsersCount: 2,
        pendingCount: 2
      }
    };

    componentPC = setupPC(props);
    componentMobile = setupMobile(props);
  });

  describe("For PC", () => {
    it("Should contain 3 boxes (PC)", () => {
      const boxes = findByTestAttr(componentPC, "pcStatisticCard");
      expect(boxes.length).toBe(3);
    });
  });

  describe("For Mobile", () => {
    it("Should contain 3 boxes (Mobile)", () => {
      const boxes = findByTestAttr(componentMobile, "mobileStatisticCard");
      expect(boxes.length).toBe(3);
    });
  });
});
