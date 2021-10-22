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
      "dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com", //sementara
    ],
  },
  env: {
    NEXTAUTH_URL: "http://dts-dev.majapahit.id/",

    CAPTCHA_SITE_KEY: "6LeUmtIbAAAAAMltXjRDmRqns6MThDowaaYHz3YU",
    CAPTCHA_SECRET_KEY: "6LeUmtIbAAAAAAbA9yada3LOIktctPbfQ86SjhNn",

    // END_POINT_API_PUBLIKASI: "http://dts-publikasi-dev.majapahit.id/",
    END_POINT_API_PUBLIKASI: "http://api-dts-dev.majapahit.id/publikasi/",
    END_POINT_API_PUBLIKASI_1:"http://dts-publikasi-dev.majapahit.id/",
    END_POINT_API_IMAGE_PUBLIKASI:
      "https://dts-publikasi-dev.s3.ap-southeast-1.amazonaws.com/",

    //subvit
    END_POINT_API_SUBVIT: "http://dts-subvit-dev.majapahit.id/",
    // END_POINT_API_SUBVIT: "http://api-dts-dev.majapahit.id/subvit/",
    END_POINT_API_IMAGE_SUBVIT:
      "https://dts-subvit-dev.s3.ap-southeast-1.amazonaws.com/",

    // partnership
    END_POINT_API_PARTNERSHIP: "http://api-dts-dev.majapahit.id/partnership/",

    END_POINT_API_PARTNERSHIP_MITRA: "http://dts-partnership-dev.majapahit.id/",

    END_POINT_API_IMAGE_PARTNERSHIP:
      "http://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/",

    // site management
    END_POINT_API_SITE_MANAGEMENT: "http://api-dts-dev.majapahit.id/sso/",
    END_POINT_API_IMAGE_SITE_MANAGEMENT:
      "https://dts-publikasi-dev.s3.ap-southeast-1.amazonaws.com/",

    // pelatihan
    END_POINT_API_PELATIHAN: "http://api-dts-dev.majapahit.id/pelatihan/",

    //sertifikat
    END_POINT_API_SERTIFIKAT: "http://dts-sertifikat-dev.majapahit.id/",
    END_POINT_API_IMAGE_SERTIFIKAT:
      "https://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/",

    // Beasiswa
    END_POINT_API_IMAGE_BEASISWA:
    "https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/"
  },
};
