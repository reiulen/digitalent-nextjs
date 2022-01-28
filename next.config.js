// const ENDPOINT_DEV = "https://api-dts-dev.majapahit.id";
const ENDPOINT_PROD = "https://api-dts-poc.majapahit.id";

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "api.dts.majapahit.id",
      "dts-publikasi-dev.majapahit.id",
      "dts-subvit-poc.s3.ap-southeast-1.amazonaws.com",
      "dts-publikasi-poc.s3.ap-southeast-1.amazonaws.com",
      "dts-partnership-poc.s3.ap-southeast-1.amazonaws.com",
      "dts-sertifikat-poc.s3.ap-southeast-1.amazonaws.com",
      "dts-beasiswa-poc.s3-ap-southeast-1.amazonaws.com",
      "dts-partnership-poc.s3-ap-southeast-1.amazonaws.com",
      "simonas-dev.majapahit.id",
      "dts-simonas.s3.ap-southeast-1.amazonaws.com",
      "bucket.cloud.lintasarta.co.id",
    ],
  },
  env: {
    NEXTAUTH_URL: "https://dts-poc.majapahit.id",
    LOGO_DTS: ENDPOINT_PROD + "/pelatihan/storage/images/logo-dts.png",

    CAPTCHA_SITE_KEY: "6LeUmtIbAAAAAMltXjRDmRqns6MThDowaaYHz3YU",
    CAPTCHA_SECRET_KEY: "6LeUmtIbAAAAAAbA9yada3LOIktctPbfQ86SjhNn",

    PATH_URL:
      process.env.MODE !== "development" ? "https://dts-poc.majapahit.id" : "",
    PATH_SIMONAS: "http://simonas-dev.majapahit.id",
    PATH_BEASISWA: "https://beasiswa-poc.majapahit.id/",

    // END_POINT_API_PUBLIKASI: "http://dts-publikasi-dev.majapahit.id/",
    END_POINT_API_PUBLIKASI: ENDPOINT_PROD + "/publikasi/",
    END_POINT_API_PUBLIKASI_1: ENDPOINT_PROD + "/publikasi-view/",
    API_KEY_PUBLIKASI: "I8aylVChtrUB15Sp5v8TsjDOvb8kGcML",

    //subvit
    // END_POINT_API_SUBVIT: "http://dts-subvit-dev.majapahit.id/",
    END_POINT_API_SUBVIT: ENDPOINT_PROD + "/subvit/",

    // partnership
    END_POINT_API_PARTNERSHIP: ENDPOINT_PROD + "/partnership/",

    END_POINT_API_PARTNERSHIP_MITRA: ENDPOINT_PROD + "/partnership/",

    // END_POINT_API_IMAGE_PARTNERSHIP:
    //   "http://dts-partnership-poc.s3.ap-southeast-1.amazonaws.com",

    // site management
    END_POINT_API_SITE_MANAGEMENT: ENDPOINT_PROD + "/sso/",

    // pelatihan
    // END_POINT_API_PELATIHAN: "http://192.168.11.44:83/",
    END_POINT_API_PELATIHAN: ENDPOINT_PROD + "/pelatihan/",

    //sertifikat
    END_POINT_API_SERTIFIKAT: ENDPOINT_PROD + "/sertifikat/",
    // END_POINT_API_SERTIFIKAT: "http://dts-sertifikat-dev.majapahit.id/",
    // END_POINT_API_SERTIFIKAT: "http://http://192.168.11.96:8000/",

    // Beasiswa
    END_POINT_API_BEASISWA: ENDPOINT_PROD + "/beasiswa/api/v1/",

    END_POINT_API_BEASISWA_SCHOLARSHIP:
      ENDPOINT_PROD + "/beasiswa/api/get-scholarship-data",

    END_POINT_API_SIMONAS_JOB: ENDPOINT_PROD + "/simonas/api/job",

    END_POINT_API_SIMONAS: ENDPOINT_PROD + "/simonas/api/v1/",

    TOKEN_MAP:
      "pk.eyJ1IjoiZGVuZHlsb3JkcyIsImEiOiJja3U1NHJnYjkxczdyMnZxZ2ptM2hlNXpqIn0.o5v5Ch0AFJIfeZER2vZvwA",

    // END_POINT_API_TTEP12: "https://dts-signature-dev.majapahit.id/api/",
    END_POINT_API_TTEP12: ENDPOINT_PROD + "/signature/api/",

    ROOT_URL: "https://dts-dev.majapahit.id/",

    VERSION_APP: "2.0.0",

    END_POINT_API_IMAGE_PUBLIKASI:
      "https://bucket.cloud.lintasarta.co.id:8082/dts-publikasi/",
    END_POINT_API_IMAGE_PARTNERSHIP:
      "https://bucket.cloud.lintasarta.co.id:8082/dts-partnership",
    END_POINT_API_IMAGE_SUBVIT:
      "https://bucket.cloud.lintasarta.co.id:8082/dts-subvit/",
    END_POINT_API_IMAGE_SERTIFIKAT:
      "https://bucket.cloud.lintasarta.co.id:8082/dts-sertifikat/",
    END_POINT_API_IMAGE_BEASISWA:
      "https://bucket.cloud.lintasarta.co.id:8082/dts-beasiswa",
    END_POINT_API_IMAGE_SITE_MANAGEMENT:
      "https://bucket.cloud.lintasarta.co.id:8082/dts-sitemanagement/",
    END_POINT_API_IMAGE_LOGO_MITRA:
      "https://bucket.cloud.lintasarta.co.id:8082/dts-partnership",

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
