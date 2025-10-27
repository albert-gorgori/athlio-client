export const locales = ["en", "es"] as const;
export const config = {
  appName: "Atlhio",
  appDescription:
    "Atlhio is a platform for triathletes.",
  domainName:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : ""
};