import React, { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormValues, Props } from "./types";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useAddPathMutation } from "../../../../features/pathSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectPathInfo } from "../../../../features/addPathSlice";
import { metersToKilometers } from "../../../../utils/metersToKilometers";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationSchema";
import { useSnackbar } from "../../../../components/Snackbar/useSnackbar";
import { selectedPathInfo } from "../../../../features/pathInfoSlice";

const AddPathForm: FC<Props> = ({ close }) => {
  const { showSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      fullDescription: "",
      origin: {} as google.maps.LatLngLiteral,
      destination: {} as google.maps.LatLngLiteral,
    },
    resolver: yupResolver(validationSchema),
  });

  const pathInfo = useAppSelector(selectPathInfo);

  const [addPath, result] = useAddPathMutation();

  const onSubmit = (values: FormValues) => {
    addPath({ ...values, ...pathInfo });
  };

  useEffect(() => {
    if (result.status === "fulfilled") {
      showSnackbar("Path has been successfully created");
      reset();
      close();
      dispatch(selectedPathInfo({ ...result.originalArgs, id: result.data }));
    }
  }, [result.status, close, reset, showSnackbar, dispatch, result]);

  useEffect(() => {
    const { origin, destination } = pathInfo;
    if (Object.values(origin).length || Object.values(destination).length) {
      setValue("origin", origin);
      setValue("destination", destination);
    } else {
      setValue("origin", {} as google.maps.LatLngLiteral);
      setValue("destination", {} as google.maps.LatLngLiteral);
    }
  }, [pathInfo, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <FormControl error={!!errors.title} fullWidth>
            <FormLabel sx={{ marginBottom: 1 }}>Title</FormLabel>
            <TextField
              placeholder="Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register("title")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={12}>
          <FormControl error={!!errors.description} fullWidth>
            <FormLabel sx={{ marginBottom: 1 }}>Short description</FormLabel>
            <TextField
              placeholder="Description"
              multiline
              fullWidth
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register("description")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={12}>
          <FormControl error={!!errors.fullDescription} fullWidth>
            <FormLabel sx={{ marginBottom: 1 }}>Full description</FormLabel>
            <TextField
              placeholder="Full description"
              multiline
              fullWidth
              rows={8}
              error={!!errors.fullDescription}
              helperText={errors.fullDescription?.message}
              {...register("fullDescription")}
            />
          </FormControl>
          {!!errors.origin?.lat && (
            <FormHelperText error={true}>
              Origin is required! Please select on the map.
            </FormHelperText>
          )}
          {!!errors.destination?.lat && (
            <FormHelperText error={true}>
              Destination is required! Please select on the map.
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} lg={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <MapOutlinedIcon fontSize="large" color="action" />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Length {metersToKilometers(pathInfo.pathLength)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Grid container justifyContent="center">
          <Grid item>
            <Button
              type="submit"
              variant="outlined"
              color="success"
              size="large"
              startIcon={<CheckIcon />}
            >
              Add path
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Controller control={control} name="origin" render={() => <></>} />
      <Controller control={control} name="destination" render={() => <></>} />
    </form>
  );
};

export default AddPathForm;
