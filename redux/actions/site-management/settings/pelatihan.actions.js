import {GET_DATA_PROMPT, PUT_DATA_PROMPT} from '../../../types/site-management/settings/pelatihan.type'

import axios from "axios";

const drawDataPrompt = data => ({
    type: GET_DATA_PROMPT,
    notification: data.notification.status,
    email: data.email.status
})

// export const loadDataPrompt = (token) => {
//     return (dispatch) => {
//       return axios
//         .get(`${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/list-propt`,{
//             headers: {
//                 authorization: `Bearer ${token}`,
//               },
//         }
//         )
//         .then((data) => {
//             dispatch(drawDataPrompt(data.data.data.training_rules))
//         });
//     };
//   };

export const loadDataPrompt = (token) => {
  return async (dispatch) => {
    try {
      let {data} = await axios
              .get(`${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/list-propt`,{
                  headers: {
                      authorization: `Bearer ${token}`,
                    },
              }
              )

              dispatch({
                type:GET_DATA_PROMPT,
                payload:data
              })

    } catch (error) {
      console.log(error)
    }

  }
}

export const putDataPrompt = (token, notification, email) => {
  return async (dispatch) => {
    try {
      await axios
              .post(`${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/update-propt`,{
                "notification": [
                    {
                        "status": notification
                    }
                ],
                "email" : [
                    {
                        "status": email
                    }
                ]
            },{
                  headers: {
                      authorization: `Bearer ${token}`,
                    },
              }
              )

              // dispatch({
              //   type:GET_DATA_PROMPT,
              //   payload:data
              // })
    } catch (error) {
      console.log(error)
    }
  }
}