// export const apiBaseUrl = "/api";
export const apiBaseUrl =
  window.location.hostname === "localhost" ? "" : "/api";

export const apiEndpoints = {
  getPdf: "/worcareGetPDF",
};
