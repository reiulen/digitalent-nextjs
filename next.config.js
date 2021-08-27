module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["api.dts.majapahit.id", "dts-publikasi-dev.majapahit.id", ],
  },
  env: {
    CAPTCHA_SITE_KEY: "6LeUmtIbAAAAAMltXjRDmRqns6MThDowaaYHz3YU",
    CAPTCHA_SECRET_KEY: "6LeUmtIbAAAAAAbA9yada3LOIktctPbfQ86SjhNn",

    // END_POINT_API: 'http://api.dts.majapahit.id:8002/',
    // END_POINT_API_IMAGE: 'http://api.dts.majapahit.id:8002/storage/',
    END_POINT_API_PUBLIKASI: "http://dts-publikasi-dev.majapahit.id/",
    END_POINT_API_IMAGE_PUBLIKASI:
      "http://dts-publikasi-dev.majapahit.id/storage/",

    END_POINT_API_SUBVIT: "http://dts-subvit-dev.majapahit.id/",
    END_POINT_API_IMAGE_SUBVIT: "http://dts-subvit-dev.majapahit.id/storage/",

    // partnership
    END_POINT_API_PARTNERSHIP: "http://dts-partnership-dev.majapahit.id",
    END_POINT_API_IMAGE_PARTNERSHIP:
      "http://dts-partnership-dev.majapahit.id/storage/",
    END_POINT_TOKEN_API:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImlzcyI6InNuSzEyd3hLQ1hRSzRYdHU2azBLV29QaVN6U1hTUmxNIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Im5hbWEgZHV1ZHUiLCJleHAiOjE2MjcxMjk5Mzd9.f8dRFus2HnsJ22_KDnwvlvJ_k3efz_8bdJ2JCbET8uA",
    END_POINT_KEY_AUTH: "12131231231210923123",
  },
};
