module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "api.dts.majapahit.id",
      "dts-publikasi-dev.majapahit.id",
      "dts-subvit-dev.s3.ap-southeast-1.amazonaws.com",
      "dts-publikasi-dev.s3.ap-southeast-1.amazonaws.com",
      "dts-partnership-dev.s3.ap-southeast-1.amazonaws.com",
      "dts-sertifikat-dev.s3.ap-southeast-1.amazonaws.com",
    ],
  },
  env: {
    NEXTAUTH_URL: "http://dts-dev.majapahit.id/",

    NEXTAUTH_URL_INTERNAL: "http://localhost:3000/",

    CAPTCHA_SITE_KEY: "6LeUmtIbAAAAAMltXjRDmRqns6MThDowaaYHz3YU",
    CAPTCHA_SECRET_KEY: "6LeUmtIbAAAAAAbA9yada3LOIktctPbfQ86SjhNn",

    // END_POINT_API_PUBLIKASI: "http://dts-publikasi-dev.majapahit.id/",
    END_POINT_API_PUBLIKASI: "http://api-dts-dev.majapahit.id/publikasi/",
    END_POINT_API_IMAGE_PUBLIKASI:
      "http://dts-publikasi-dev.s3.ap-southeast-1.amazonaws.com/",

    //subvit
    END_POINT_API_SUBVIT: "http://dts-subvit-dev.majapahit.id/",
    // END_POINT_API_SUBVIT: "http://api-dts-dev.majapahit.id/subvit/",
    END_POINT_API_IMAGE_SUBVIT:
      "https://dts-subvit-dev.s3.ap-southeast-1.amazonaws.com/",

    // partnership
    TOKEN_PARTNERSHIP_TEMP:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMOWdGbzFOOG1UMWptelg3OWJuRkZFY0IyN2NWMmM3RyIsImlhdCI6MTYzMjk2OTg5OCwiZXhwIjoxNjMzMDU2Mjk4LCJuYmYiOjE2MzI5Njk4OTgsImp0aSI6Ijd5TE5xS0EycTR5NkVTeDQiLCJzdWIiOjksInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7ImlkIjo5LCJuYW1lIjoiUmFobWF0IEhpZGF5YXR1bGxhaCIsImVtYWlsIjoicmFobWF0aGlkYXlhdHVsbGFoOTk2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkX2F0IjoiMjAyMS0wOS0yN1QwNDoyNDo1NC4wMDAwMDBaIiwicmVtZW1iZXJfdG9rZW4iOiI5NTcxNTQiLCJyb2xlcyI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjEtMDktMjdUMDQ6MjQ6MTQuMDAwMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIxLTA5LTI3VDA0OjI0OjU0LjAwMDAwMFoifX0.ng_8s-Dfn571kLSnTCd3Y_yKkCTkBUwSERROPDZIZAo",

    END_POINT_API_PARTNERSHIP: "http://api-dts-dev.majapahit.id/partnership/",
    // END_POINT_API_PARTNERSHIP_MITRA: "http://dts-partnership-dev.majapahit.id/",
    END_POINT_API_PARTNERSHIP_MITRA: "http://dts-partnership-dev.majapahit.id/",

    END_POINT_API_IMAGE_PARTNERSHIP:
      "http://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/",

    // pelatihan
    END_POINT_API_PELATIHAN: "http://api-dts-dev.majapahit.id/pelatihan/",

    //sertifikat
    END_POINT_API_SERTIFIKAT: "http://dts-sertifikat-dev.majapahit.id/",
  },
};
