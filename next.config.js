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
    CAPTCHA_SITE_KEY: "6LeUmtIbAAAAAMltXjRDmRqns6MThDowaaYHz3YU",
    CAPTCHA_SECRET_KEY: "6LeUmtIbAAAAAAbA9yada3LOIktctPbfQ86SjhNn",

    END_POINT_API_PUBLIKASI: "http://dts-publikasi-dev.majapahit.id/",
    // END_POINT_API_PUBLIKASI: "http://api-dts-dev.majapahit.id/publikasi/",
    END_POINT_API_IMAGE_PUBLIKASI:
      "http://dts-publikasi-dev.s3.ap-southeast-1.amazonaws.com/",

    //subvit
    // END_POINT_API_SUBVIT: "http://dts-subvit-dev.majapahit.id/",
    END_POINT_API_SUBVIT: "http://api-dts-dev.majapahit.id/subvit/",
    END_POINT_API_IMAGE_SUBVIT:
      "https://dts-subvit-dev.s3.ap-southeast-1.amazonaws.com/",

    // partnership
    TOKEN_PARTNERSHIP_TEMP:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMOWdGbzFOOG1UMWptelg3OWJuRkZFY0IyN2NWMmM3RyIsImlhdCI6MTYzMjcwNjM3MSwiZXhwIjoxMDI3MjYxOTk3MSwibmJmIjoxNjMyNzA2MzcxLCJqdGkiOiJ5U2dFSDdjRE9ybTQ3SXJEIiwic3ViIjo2LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6NiwibmFtZSI6IlJhaG1hdCBIaWRheWF0dWxsYWgiLCJlbWFpbCI6InJhaG1hdGhpZGF5YXR1bGxhaDk5NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZF9hdCI6IjIwMjEtMDktMjZUMTQ6MzU6MjYuMDAwMDAwWiIsInJlbWVtYmVyX3Rva2VuIjoiODI1MjU4Iiwicm9sZXMiOiJbbWl0cmFdIiwiY3JlYXRlZF9hdCI6IjIwMjEtMDktMjZUMTQ6MTc6MTIuMDAwMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIxLTA5LTI2VDE0OjM1OjI2LjAwMDAwMFoifX0.hgUflpBq6iKIHfKmzlr7Hykb1s2I-6yrfBirB1xzv3E",
    END_POINT_API_PARTNERSHIP: "http://dts-partnership-dev.majapahit.id",
    // END_POINT_API_PARTNERSHIP: "http://api-dts-dev.majapahit.id/partnership/",
    END_POINT_API_IMAGE_PARTNERSHIP:
      "http://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/",

    NEXTAUTH_URL: "http://dts-dev.majapahit.id/",

    // pelatihan
    END_POINT_API_PELATIHAN: "http://api-dts-dev.majapahit.id/pelatihan/",
  },
};
