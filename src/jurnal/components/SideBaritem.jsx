import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBaritem = ({ id, body, tittle = '', date, imageUrls = [] }) => {
    const dispatch = useDispatch();

    const newTittle = useMemo(() => {
        return tittle.length > 17
            ? tittle.substring(0, 17) + '...'
            : tittle
    }, [tittle])

    const onClickNote = () => {
        dispatch(setActiveNote({
            id,
            body,
            tittle,
            date,
            imageUrls
        }
        ));
    }

    return (
        <ListItem key={id} disablePadding onClick={() => onClickNote()}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid>
                    <ListItemText primary={newTittle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
