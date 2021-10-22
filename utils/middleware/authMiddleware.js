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
      redirect: process.env.PATH_URL + "/login",
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
  if (auth.roles[0] !== "user") {
    data = {
      status: false,
      redirect: process.env.PATH_URL + "/login/admin",
    };
    return data;
  }

  data = {
    status: true,
    redirect: process.env.PATH_URL + "/peserta",
  };
  return data;
};
