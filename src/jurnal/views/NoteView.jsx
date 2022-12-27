import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import { ImageGallery } from "../components/ImageGallery";

export const NoteView = () => {
  const FileInputRef = useRef();
  const dispatch = useDispatch();
  const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal);
  const { body, tittle, date, formState, onInputChange } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const saveNote = () => {
    dispatch(startSaveNote());
  };

  useEffect(() => {
    messageSaved.length > 0 &&
      Swal.fire("Nota actualizada", messageSaved, "success");
  }, [messageSaved]);

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles( target.files ));
  };

const onDelete = () => {
  dispatch( startDeletingNote() );
}

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          style={{ display: "none" }}
          type="file"
          multiple
          onChange={onFileInputChange}
          ref={FileInputRef}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => FileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button onClick={saveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese titulo"
          label="Titulo"
          sx={{ border: "none", mb: 1 }}
          value={tittle}
          name="tittle"
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿ Que sucedió el dia de hoy ?"
          minRows={5}
          value={body}
          name="body"
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='end'>
      <Button
        onClick={ onDelete }
        sx={{ mt: 2 }}
        color="error"
      >
        <DeleteOutline/>
        Borrar
      </Button>
      </Grid>

      <ImageGallery />
    </Grid>
  );
};
