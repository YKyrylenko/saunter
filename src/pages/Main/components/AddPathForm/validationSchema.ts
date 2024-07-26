import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().max(160, "Max 160 chars").required("Required"),
  fullDescription: Yup.string().required("Required"),
  origin: Yup.object()
    .shape({
      lat: Yup.number().required("Origin is required"),
      lng: Yup.number().required("Origin is required"),
    })
    .required(),
  destination: Yup.object()
    .shape({
      lat: Yup.number().required("Destination is required"),
      lng: Yup.number().required("Destination is required"),
    })
    .required(""),
});
