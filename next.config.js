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
    END_POINT_API_PARTNERSHIP: "http://dts-partnership-dev.majapahit.id",
    // END_POINT_API_PARTNERSHIP: "http://api-dts-dev.majapahit.id/partnership/",
    END_POINT_API_IMAGE_PARTNERSHIP:
      "http://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/",

  },
};
