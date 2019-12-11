import React from "react";
import { shallow } from "enzyme";
import AirdropAllModal from "./index";
import { findByTestAttr } from "../../../util/tests";

const setup = (props = {}) => {
  const component = shallow(<AirdropAllModal {...props} />);
  return component;
};

describe("Airdrop Modal", () => {
  let component;

  describe("Loading", () => {
    beforeEach(() => {
      const props = {
        props: { title: "Airdrop All Users" },
        visible: true,
        airdropAll: () => console.log("boo"),
        cancel: () => console.log("boo"),
        loading: true
      };
      component = setup(props);
    });

    it("Should show skeletons when loading, nothing else", () => {
      const skeleton = findByTestAttr(component, "skeletonLoading");
      const withAirdropLabel = findByTestAttr(component, "withAirdropData");
      const noAirdropLabel = findByTestAttr(component, "noAirdropData");
      const withFailedUsers = findByTestAttr(component, "withFailedUsers");

      expect(skeleton.length).toBe(4);
      expect(withAirdropLabel.length).toBe(0);
      expect(withFailedUsers.length).toBe(0);
      expect(noAirdropLabel.length).toBe(0);
    });
  });

  describe("No previous ledger", () => {
    beforeEach(() => {
      const props = {
        props: { title: "Airdrop All Users" },
        visible: true,
        airdropAll: () => console.log("boo"),
        users: 5,
        cancel: () => console.log("boo"),
        loading: false
      };
      component = setup(props);
    });

    it("Should not show ledger data if ledger data is not present", () => {
      const skeleton = findByTestAttr(component, "skeletonLoading");
      const withAirdropLabel = findByTestAttr(component, "withAirdropData");
      const noAirdropLabel = findByTestAttr(component, "noAirdropData");
      const withFailedUsers = findByTestAttr(component, "withFailedUsers");

      expect(skeleton.length).toBe(0);
      expect(withAirdropLabel.length).toBe(0);
      expect(withFailedUsers.length).toBe(0);
      expect(noAirdropLabel.length).toBe(1);
    });
  });

  describe("With ledger data", () => {
    beforeEach(() => {
      const props = {
        props: { title: "Airdrop All Users" },
        visible: true,
        airdropAll: () => console.log("boo"),
        users: 5,
        cancel: () => console.log("boo"),
        loading: false,
        ledger: {
          date: 1576048820,
          tokensDisbursed: 500,
          successUsers: 50
        }
      };
      component = setup(props);
    });

    it("Should show ledger data if it's present, without failed users", () => {
      const skeleton = findByTestAttr(component, "skeletonLoading");
      const withAirdropLabel = findByTestAttr(component, "withAirdropData");
      const noAirdropLabel = findByTestAttr(component, "noAirdropData");
      const withFailedUsers = findByTestAttr(component, "failedUser");

      expect(skeleton.length).toBe(0);
      expect(withAirdropLabel.length).toBe(1);
      expect(withFailedUsers.length).toBe(0);
      expect(noAirdropLabel.length).toBe(0);
    });
  });

  describe("With ledger data and failed users", () => {
    beforeEach(() => {
      const props = {
        props: { title: "Airdrop All Users" },
        visible: true,
        airdropAll: () => console.log("boo"),
        users: [
          {
            email: "boo@gmail.com",
            walletAddress: "1234"
          }
        ],
        cancel: () => console.log("boo"),
        loading: false,
        ledger: {
          date: 1576048820,
          tokensDisbursed: 500,
          successUsers: 50,
          failedUsers: [{ email: "boo@gmail.com", walletAddress: "1234" }]
        }
      };
      component = setup(props);
    });

    it("Should show ledger data if it's present, and failed users", () => {
      const skeleton = findByTestAttr(component, "skeletonLoading");
      const withAirdropLabel = findByTestAttr(component, "withAirdropData");
      const noAirdropLabel = findByTestAttr(component, "noAirdropData");
      const withFailedUsers = findByTestAttr(component, "withFailedUsers");

      expect(skeleton.length).toBe(0);
      expect(withAirdropLabel.length).toBe(1);
      expect(withFailedUsers.length).toBe(1);
      expect(noAirdropLabel.length).toBe(0);
    });
  });
});
