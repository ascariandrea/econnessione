import { Area } from "@io/http";
import { uuid } from "@utils/uuid";

export const firstArea: Area.Area = {
  id: uuid(),
  label: "First Area",
  body: "",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-351.9827194, 45.5162451],
        [-350.8204059, 44.9384085],
        [-349.7264637, 45.6597865],
        [-350.6836631, 46.0882086],
        [-351.9827194, 45.5162451],
      ],
    ],
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};
