import { Task } from "./Model";
import {
  Box,
  ButtonBase,
  Checkbox,
  createTheme,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  ThemeProvider,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { DateFormat } from "../common/DateUtils";
import dayjs from "dayjs";
import { MouseEventHandler } from "react";

type TaskListItemProps = {
  value: Task;
  onChange?: (newValue: Task) => void;
  onClick?: MouseEventHandler | undefined;
};

function TaskListItem(props: TaskListItemProps) {
  const { value, onChange, onClick } = props;
  return (
    <Box component={Paper}>
      <ListItem>
        <ButtonBase onClick={onClick} sx={{ width: 1 }}>
          <Checkbox
            checked={!!value.checkedAt}
            onClick={(event) => event.stopPropagation()}
            onChange={(event, checked) => {
              event.stopPropagation();
              onChange?.({
                ...value,
                checkedAt: checked ? new Date() : undefined,
              });
            }}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
          />
          <ListItemText
            sx={{ mx: 2 }}
            primary={value.content}
            primaryTypographyProps={{
              sx: {
                textDecorationLine: value.checkedAt && "line-through",
                flexGrow: 1,
                textAlign: "start",
              },
            }}
            secondary={value.deadline && DateFormat(value.deadline)}
            secondaryTypographyProps={{
              textAlign: "start",
              fontSize: "smaller",
              color: () => {
                if (!value.deadline) {
                  return "";
                }
                if (value.checkedAt) {
                  return "gray";
                }
                if (dayjs().isAfter(dayjs(value.deadline), "day"))
                  return "error.main";
                return "primary.main";
              },
            }}
          />
          <Checkbox
            color="warning"
            checked={!!value.staredAt}
            onClick={(event) => event.stopPropagation()}
            onChange={(event, checked) => {
              event.stopPropagation();
              onChange?.({
                ...value,
                staredAt: checked ? new Date() : undefined,
              });
            }}
            icon={<StarBorderIcon />}
            checkedIcon={<StarIcon />}
          />
        </ButtonBase>
      </ListItem>
    </Box>
  );
}

function TaskList(props: {
  data: Task[];
  onChange?: (newValue: Task) => void;
  onClick?: MouseEventHandler | undefined;
}) {
  const { data, onChange, onClick } = props;
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiListItem: {
            defaultProps: { dense: true },
          },
          MuiPaper: {
            defaultProps: {
              sx: {
                borderRadius: 2,
                "&:hover": { backgroundColor: "grey.100" },
              },
              elevation: 5,
            },
          },
        },
      })}
    >
      <Stack component={List} spacing={1.5}>
        {data.map((value, index) => (
          <TaskListItem
            key={index}
            value={value}
            onChange={onChange}
            onClick={onClick}
          />
        ))}
      </Stack>
    </ThemeProvider>
  );
}

export default TaskList;
