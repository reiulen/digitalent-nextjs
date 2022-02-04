// const ENDPOINT_DEV = "https://api-dts-dev.majapahit.id";
const ENDPOINT_API = "https://api-dts-poc.majapahit.id";
const ENDPOINT_IMAGE = "https://bucket.cloud.lintasarta.co.id:8082";

module.exports = {
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, must-revalidate",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: [
      // "api.dts.majapahit.id",
      // "dts-publikasi-dev.majapahit.id",
      // "dts-subvit-poc.s3.ap-southeast-1.amazonaws.com",
      // "dts-publikasi-poc.s3.ap-southeast-1.amazonaws.com",
      // "dts-partnership-poc.s3.ap-southeast-1.amazonaws.com",
      // "dts-partnership-dev.s3.ap-southeast-1.amazonaws.com",
      // "dts-sertifikat-poc.s3.ap-southeast-1.amazonaws.com",
      // "dts-beasiswa-poc.s3-ap-southeast-1.amazonaws.com",
      // "dts-partnership-poc.s3-ap-southeast-1.amazonaws.com",
      "dts-simonas.s3.ap-southeast-1.amazonaws.com",
      "simonas-dev.majapahit.id",
      "bucket.cloud.lintasarta.co.id",
    ],
  },
  env: {
    // NEXTAUTH_URL: "https://digitalent.kominfo.go.id",
    NEXTAUTH_URL: "http://localhost:3000",
    LOGO_DTS: ENDPOINT_API + "/pelatihan/storage/images/logo-dts.png",

    CAPTCHA_SITE_KEY: "6LeUmtIbAAAAAMltXjRDmRqns6MThDowaaYHz3YU",
    CAPTCHA_SECRET_KEY: "6LeUmtIbAAAAAAbA9yada3LOIktctPbfQ86SjhNn",

    PATH_URL:
      process.env.MODE !== "development"
        ? "https://digitalent.kominfo.go.id"
        : "",
    PATH_SIMONAS: "http://simonas-poc.majapahit.id",
    PATH_BEASISWA: "https://beasiswa-poc.majapahit.id/",

    END_POINT_API_PUBLIKASI: ENDPOINT_API + "/publikasi/",
    END_POINT_API_PUBLIKASI_1: ENDPOINT_API + "/publikasi-view/",
    API_KEY_PUBLIKASI: "I8aylVChtrUB15Sp5v8TsjDOvb8kGcML",

    //subvit
    END_POINT_API_SUBVIT: ENDPOINT_API + "/subvit/",
    //partnership
    END_POINT_API_PARTNERSHIP: ENDPOINT_API + "/partnership/",
    //sitemanagement
    END_POINT_API_SITE_MANAGEMENT: ENDPOINT_API + "/sso/",
    //pelatihan
    END_POINT_API_PELATIHAN: ENDPOINT_API + "/pelatihan/",
    //sertifikat
    END_POINT_API_SERTIFIKAT: ENDPOINT_API + "/sertifikat/",
    //beasiswa
    END_POINT_API_BEASISWA: ENDPOINT_API + "/beasiswa/api/v1/",
    END_POINT_API_BEASISWA_SCHOLARSHIP:
      ENDPOINT_API + "/beasiswa/api/get-scholarship-data",
    //simonas
    END_POINT_API_SIMONAS_JOB: ENDPOINT_API + "/simonas/api/job",
    END_POINT_API_SIMONAS: ENDPOINT_API + "/simonas/api/v1/",
    END_POINT_API_TTEP12: ENDPOINT_API + "/signature/api/",

    VERSION_APP: "2.0.0",

    END_POINT_API_IMAGE_PUBLIKASI: ENDPOINT_IMAGE + "/dts-publikasi/",
    END_POINT_API_IMAGE_PARTNERSHIP: ENDPOINT_IMAGE + "/dts-partnership",
    END_POINT_API_IMAGE_SUBVIT: ENDPOINT_IMAGE + "/dts-subvit/",
    END_POINT_API_IMAGE_SERTIFIKAT: ENDPOINT_IMAGE + "/dts-sertifikat/",
    END_POINT_API_IMAGE_PELATIHAN: ENDPOINT_IMAGE + "/dts-pelatihan",
    END_POINT_API_IMAGE_SITE_MANAGEMENT:
      ENDPOINT_IMAGE + "/dts-sitemanagement/",
    END_POINT_API_IMAGE_LOGO_MITRA: ENDPOINT_IMAGE + "/dts-partnership",

    TOKEN_MAP:
      "pk.eyJ1IjoiZGVuZHlsb3JkcyIsImEiOiJja3U1NHJnYjkxczdyMnZxZ2ptM2hlNXpqIn0.o5v5Ch0AFJIfeZER2vZvwA",

    FB_API_KEY: "AIzaSyCE2YL39cNc47v0eSzmecyaAOhAKYlGjxQ",
    FB_AUTH_DOMAIN: "dts-kominfo.firebaseapp.com",
    FB_PROJECT_ID: "dts-kominfo",
    FB_STORAGE_BUCKET: "dts-kominfo.appspot.com",
    FB_MESSAGING_SENDER_ID: "38242238576",
    FB_APP_ID: "1:38242238576:web:8043a0824ce6e1e42134b5",
    FB_MEASUREMENT_ID: "G-Z43DV3R59G",
    FB_FCM_KEY_PAIR:
      "BAseWMZsJmdofVidmAZEOMnFjB2fZQFDmPtuMVPJEOFP5nLhogqDkMYolmQ-d4HABaS8nOakUaXt70DsrqHWR2Y",
  },
};
