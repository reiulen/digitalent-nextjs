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
      "dts-partnership-dev.s3-ap-southeast-1.amazonaws.com",
      "simonas-dev.majapahit.id",
      "dts-simonas.s3.ap-southeast-1.amazonaws.com",
    ],
  },
  env: {
    NEXTAUTH_URL: "http://dts-dev.majapahit.id",
    LOGO_DTS:
      "http://api-dts-dev.majapahit.id/pelatihan/storage/images/logo-dts.png",
    // PATH_URL: "http://dts-dev.majapahit.id",

    CAPTCHA_SITE_KEY: "6LeUmtIbAAAAAMltXjRDmRqns6MThDowaaYHz3YU",
    CAPTCHA_SECRET_KEY: "6LeUmtIbAAAAAAbA9yada3LOIktctPbfQ86SjhNn",

    // END_POINT_API_PUBLIKASI: "http://dts-publikasi-dev.majapahit.id/",
    END_POINT_API_PUBLIKASI: "http://api-dts-dev.majapahit.id/publikasi/",
    END_POINT_API_PUBLIKASI_1: "http://dts-publikasi-dev.majapahit.id/",
    END_POINT_API_IMAGE_PUBLIKASI:
      "https://dts-publikasi-dev.s3.ap-southeast-1.amazonaws.com/",

    //subvit
    // END_POINT_API_SUBVIT: "http://dts-subvit-dev.majapahit.id/",
    END_POINT_API_SUBVIT: "http://api-dts-dev.majapahit.id/subvit/",
    END_POINT_API_IMAGE_SUBVIT:
      "https://dts-subvit-dev.s3.ap-southeast-1.amazonaws.com/",

    // partnership
    END_POINT_API_PARTNERSHIP: "http://api-dts-dev.majapahit.id/partnership/",

    END_POINT_API_PARTNERSHIP_MITRA: "http://dts-partnership-dev.majapahit.id/",

    END_POINT_API_IMAGE_PARTNERSHIP:
      "https://dts-partnership-dev.s3-ap-southeast-1.amazonaws.com",
    // END_POINT_API_IMAGE_PARTNERSHIP:
    //   "http://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com",

    // site management
    END_POINT_API_SITE_MANAGEMENT: "http://api-dts-dev.majapahit.id/sso/",
    END_POINT_API_IMAGE_SITE_MANAGEMENT:
      "https://dts-publikasi-dev.s3.ap-southeast-1.amazonaws.com/",

    // pelatihan
    // END_POINT_API_PELATIHAN: "http://192.168.11.44:83/",
    END_POINT_API_PELATIHAN: "http://api-dts-dev.majapahit.id/pelatihan/",

    //sertifikat
    END_POINT_API_SERTIFIKAT: "http://api-dts-dev.majapahit.id/sertifikat/",
    // END_POINT_API_SERTIFIKAT: "http://dts-sertifikat-dev.majapahit.id/",
    // END_POINT_API_SERTIFIKAT: "http://http://192.168.11.96:8000/",

    END_POINT_API_IMAGE_SERTIFIKAT:
      "https://dts-sertifikat-dev.s3.ap-southeast-1.amazonaws.com/",

    // Beasiswa
    END_POINT_API_BEASISWA: "http://api-dts-dev.majapahit.id/beasiswa/api/v1/",
    END_POINT_API_IMAGE_BEASISWA:
      "https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com",

    END_POINT_API_SIMONAS: "http://api-dts-dev.majapahit.id/simonas/api/v1/",

    END_POINT_API_IMAGE_LOGO_MITRA:
      "https://dts-partnership-dev.s3-ap-southeast-1.amazonaws.com",

    TOKEN_MAP:
      "pk.eyJ1IjoiZGVuZHlsb3JkcyIsImEiOiJja3U1NHJnYjkxczdyMnZxZ2ptM2hlNXpqIn0.o5v5Ch0AFJIfeZER2vZvwA",

    VERSION_APP: "2.0.0",

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
