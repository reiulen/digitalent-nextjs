export const middlewareAuthAdminSession = (session) => {
  let data = {
    status: false,
    redirect: null,
  };

  if (!session) {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/login/admin",
    };
    return data;
  }

  const auth = session.user.user.data.user;
  if (auth.roles[0] === "user") {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/peserta",
    };
    return data;
  }

  if (auth.roles[0] === "mitra") {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/partnership/user/kerjasama",
    };
    return data;
  }

  data = {
    status: true,
    redirect: process.env.PATH_URL + "/dashboard",
  };
  return data;
};

export const middlewareAuthPesertaSession = (session) => {
  let data = {
    status: false,
    redirect: null,
  };

  if (!session) {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/login",
    };
    return data;
  }

  const auth = session.user.user.data.user;
  if (auth.roles[0] === "Super Admin") {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/dashboard",
    };
    return data;
  }

  if (auth.roles[0] === "mitra") {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/partnership/user/kerjasama",
    };
    return data;
  }

  if (
    auth.roles[0] !== "Super Admin" &&
    auth.roles[0] !== "user" &&
    auth.roles[0] !== "mitra"
  ) {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/dashboard",
    };
    return data;
  }

  data = {
    status: true,
    redirect: process.env.PATH_URL + "/peserta",
  };
  return data;
};

export const middlewareAuthMitraSession = (session) => {
  let data = {
    status: false,
    redirect: null,
  };

  if (!session) {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/login/mitra",
    };
    return data;
  }

  const auth = session.user.user.data.user;
  if (auth.roles[0] === "user") {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/peserta",
    };
    return data;
  }

  if (auth.roles[0] === "Super Admin") {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/dashboard",
    };
    return data;
  }

  if (
    auth.roles[0] !== "Super Admin" &&
    auth.roles[0] !== "user" &&
    auth.roles[0] !== "mitra"
  ) {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/dashboard",
    };
    return data;
  }

  data = {
    status: true,
    redirect: process.env.PATH_URL + "/partnership/user/kerjasama",
  };
  return data;
};
