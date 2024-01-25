import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Skeleton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import { useGetTagsQuery } from "../api";
import { Tags as TagType } from "../types";

const TagEditMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
      </Menu>
    </div>
  );
};

const Tags = () => {
  const { data: tags, isLoading } = useGetTagsQuery();

  const rows: TagType[] = tags || [];

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5">Tags</Typography>
          <Typography variant="body1">
            Manage your tags all in one place
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.main,
                }}
              >
                <TableCell>
                  <Typography color="white" variant="h6">
                    Tag Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="white" variant="h6">
                    Description
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="white" variant="h6">
                    Created On
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="white" variant="h6">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? // #region Skeleton
                  Array.from(new Array(3)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                    </TableRow>
                  ))
                : // #endregion
                  rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography>{row.tag_alias}</Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={row.description} placement="top-start">
                          <Typography
                            style={{
                              width: "200px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {row.description}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {row.created_on
                            ? new Date(row.created_on).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })
                            : ""}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <TagEditMenu />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Tags;
