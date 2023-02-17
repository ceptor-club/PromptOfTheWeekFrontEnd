import axios from "axios";

export default function handler(req, res) {
  console.log("req", req.body.data); //this is your pdf to get sent
  const { data } = req.body;

  const obj = {
    prompt: data,
    seed: -1,
    batch_size: 2,
    n_iter: 1,
    steps: 150,
    cfg_scale: 8,
    width: 512,
    height: 512,
    sampler_index: "Euler a",
  };

  const stringData = JSON.stringify(obj);
  console.log("data being sent", stringData);

  let config = {
    method: "post",
    url: process.env.SD_API_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
    },
    data: stringData,
  };

  axios(config)
    .then(function (response) {
      //format images with 'data:image/png;base64,' at the front
      response.data.images.forEach((image, i) => {
        response.data.images[i] = "data:image/png;base64," + image;
      });
      console.log("RESPONSE DATA", response.data);

      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({
        error: "Error generating image, try again or something, sheesh.",
      });
    });

  // res.status(200).json({
  //   imageUrl: "data:image/png;base64," + "test",
  // });
}

export const config = {
  api: {
    bodyParser: true,
  },
};
