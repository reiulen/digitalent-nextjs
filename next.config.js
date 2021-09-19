module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "api.dts.majapahit.id",
      "dts-publikasi-dev.majapahit.id",
      "dts-subvit-dev.s3.ap-southeast-1.amazonaws.com",
      "dts-publikasi-dev.s3.ap-southeast-1.amazonaws.com",
      "dts-partnership-dev.s3.ap-southeast-1.amazonaws.com",
    ],
  },
  env: {
    CAPTCHA_SITE_KEY: "6LeUmtIbAAAAAMltXjRDmRqns6MThDowaaYHz3YU",
    CAPTCHA_SECRET_KEY: "6LeUmtIbAAAAAAbA9yada3LOIktctPbfQ86SjhNn",

    END_POINT_API_PUBLIKASI: "http://dts-publikasi-dev.majapahit.id/",
    // END_POINT_API_PUBLIKASI: "http://api-dts-dev.majapahit.id/publikasi/",
    END_POINT_API_IMAGE_PUBLIKASI:
      "http://dts-publikasi-dev.s3.ap-southeast-1.amazonaws.com/",

    END_POINT_API_SUBVIT: "http://dts-subvit-dev.majapahit.id/",
    // END_POINT_API_SUBVIT: "http://api-dts-dev.majapahit.id/subvit/",
    END_POINT_API_IMAGE_SUBVIT:
      "https://dts-subvit-dev.s3.ap-southeast-1.amazonaws.com/",

    // partnership
    TOKEN_PARTNERSHIP_TEMP:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMOWdGbzFOOG1UMWptelg3OWJuRkZFY0IyN2NWMmM3RyIsImlhdCI6MTYzMjAzOTk3OSwiZXhwIjoxNjMyMTI2Mzc5LCJuYmYiOjE2MzIwMzk5NzksImp0aSI6InVlMzlycVA5V1BWcVhORXIiLCJzdWIiOjEzLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MTMsIm5hbWUiOiJSYWhtYXQgSGlkYXlhdHVsbGFoIiwiZW1haWwiOiJyYWhtYXRoaWRheWF0dWxsYWg5OTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWRfYXQiOiIyMDIxLTA5LTE1VDA3OjQzOjEyLjAwMDAwMFoiLCJyZW1lbWJlcl90b2tlbiI6IjIxNTkxMCIsInJvbGVzIjoiW21pdHJhXSIsImNyZWF0ZWRfYXQiOiIyMDIxLTA5LTE1VDA3OjM3OjQyLjAwMDAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyMS0wOS0xNVQwNzo0MzoxMi4wMDAwMDBaIn19.QVpuyfmv1TpPKbIAtXPTp6_00447WElfs8b6ad-59jc",
    END_POINT_API_PARTNERSHIP: "http://dts-partnership-dev.majapahit.id",
    // END_POINT_API_PARTNERSHIP: "http://api-dts-dev.majapahit.id/partnership/",
    END_POINT_API_IMAGE_PARTNERSHIP:
      "http://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/",

  },
};
