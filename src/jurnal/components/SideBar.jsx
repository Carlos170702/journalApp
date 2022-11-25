import { Drawer, Box } from "@mui/material"

export const SideBar = (drawerWidth) => {
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: '0' } }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{ display: { xs: 'block'} }}
            >

            </Drawer>
        </Box>
    )
}
