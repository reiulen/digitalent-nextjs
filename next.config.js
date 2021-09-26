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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMOWdGbzFOOG1UMWptelg3OWJuRkZFY0IyN2NWMmM3RyIsImlhdCI6MTYzMjU1NzYyMCwiZXhwIjoxMDI3MjQ3MTIyMCwibmJmIjoxNjMyNTU3NjIwLCJqdGkiOiJnQlI2eURjUzc4UkZtbGFjIiwic3ViIjoxOSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsInVzZXIiOnsiaWQiOjE5LCJuYW1lIjoiUmFobWF0IEhpZGF5YXR1bGxhaCIsImVtYWlsIjoicmFobWF0aGlkYXlhdHVsbGFoOTk2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkX2F0IjoiMjAyMS0wOS0yM1QwNToyNDoxOS4wMDAwMDBaIiwicmVtZW1iZXJfdG9rZW4iOiIzMTE5ODAiLCJyb2xlcyI6Im1pdHJhIiwiY3JlYXRlZF9hdCI6IjIwMjEtMDktMjNUMDU6MTg6MDEuMDAwMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIxLTA5LTIzVDA1OjI0OjE5LjAwMDAwMFoifX0.TtiThk3CmElKMs7SD7vgJ2tt7zYJXjpRY7DRWML4Pa8",
    END_POINT_API_PARTNERSHIP: "http://dts-partnership-dev.majapahit.id",
    // END_POINT_API_PARTNERSHIP: "http://api-dts-dev.majapahit.id/partnership/",
    END_POINT_API_IMAGE_PARTNERSHIP:
      "http://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/",

    NEXTAUTH_URL: "http://dts-dev.majapahit.id/",

    // pelatihan
    END_POINT_API_PELATIHAN: "http://api-dts-dev.majapahit.id/pelatihan/",
  },
};
