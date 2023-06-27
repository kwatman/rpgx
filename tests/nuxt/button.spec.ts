import { mount } from "@vue/test-utils";
import button from "../../nuxt/components/button/button.vue";
import { describe, expect, it, test } from "@jest/globals";

test("Testing button vue component", () => {
  const text = "this is a vue test";
  const wrapper = mount(button, {
    props: {
      text: text,
    },
  });

  const buttonComp = wrapper.get('[data-test="button-text"]');

  expect(buttonComp.text()).toBe(text);
  expect(buttonComp.text()).not.toBe("wrong text");
});
