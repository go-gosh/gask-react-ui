import AxiosMockAdapter from "axios-mock-adapter";
import APIUtils from "../common/APIUtils";

export const axiosMock = new AxiosMockAdapter(APIUtils, {
  delayResponse: 50,
});
