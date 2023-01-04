import React, {useState} from "react";
import {
    Box,
    Button, Card, Checkbox, FormControl,
    FormLabel,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText,
    Paper,
    Stack,
    Switch
} from "@mui/material";
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    More,
    Send as SendIcon
} from "@mui/icons-material";

interface MilestoneCreate {
    title: string;
    isFixed: boolean;
    startedAt: string;
    deadline?: string;
}

interface MilestoneModel {
    id: number;
    title: string;
    isFixed: boolean;
    startedAt: string;
    deadline?: string;
    tags?: string[];
    today: number;
    week: number;
    month: number;
    progress: number;
    point: number;
}

interface MilestoneItemProp {
    data: MilestoneModel
}

function MilestoneItem(props: MilestoneItemProp) {
    const {data} = props;
    const action = data.progress < data.point ?
        <ListItemText>{Math.ceil(data.progress / data.point * 100)}%</ListItemText> :
        <Checkbox checked={!data.isFixed} disableRipple edge={'start'}/>
    return <ListItem disablePadding secondaryAction={<IconButton><More/></IconButton>}>
        <ListItemButton>
            <ListItemIcon>{action}</ListItemIcon>
            {data.title}
        </ListItemButton>
    </ListItem>
}

interface MilestoneItemsProp {

}

function MilestoneItems(props: MilestoneItemsProp) {
    const data: MilestoneModel[] = [...Array(15)].map((_, i) => ({
        id: i + 1,
        title: `test ${i}`,
        isFixed: i % 2 === 0,
        startedAt: new Date().toISOString(),
        deadline: i % 3 === 0 ? new Date().toISOString() : undefined,
        today: i,
        week: i,
        month: i,
        point: i + 40,
        progress: i % 4 === 0 ? i + 30 : i + 40,
    }))
    return <List>
        {data.map(value => <MilestoneItem key={value.id} data={value}/>)}
    </List>
}

interface CreateBarProp {
    onCreate: (create: MilestoneCreate) => void;
}

function CreateBar(props: CreateBarProp) {
    const initValues = {
        deadline: undefined,
        isFixed: false,
        startedAt: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
        title: ""
    };
    const [entity, setEntity] = useState<MilestoneCreate>(initValues)
    const [expand, setExpand] = useState(false)
    const expandForm = <>
        <FormControl>
            <FormLabel>Started at</FormLabel>
            <InputBase fullWidth type={'datetime-local'} value={entity.startedAt}
                       onChange={event => setEntity({...entity, startedAt: event.target.value})}/>
        </FormControl>
        <FormControl>
            <FormLabel>Deadline</FormLabel>
            <InputBase type={'datetime-local'} value={entity.deadline}
                       onChange={event => setEntity({...entity, deadline: event.target.value})}/>
        </FormControl>
        <Box sx={{
            justifyItems: 'space-between'
        }}>
            <FormControl>
                <FormLabel>Fixup</FormLabel>
                <Switch checked={entity.isFixed}
                        onChange={event => setEntity({...entity, isFixed: event.target.checked})}/>
            </FormControl>
            <Button onClick={() => setEntity(initValues)}>Reset</Button>
        </Box>

    </>

    return <Paper>
        {expand ? expandForm : null}
        <Paper
            component={'form'}
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <IconButton onClick={() => setExpand(!expand)}>
                {expand ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </IconButton>
            <InputBase
                placeholder={'Create a new milestone'}
                value={entity.title}
                onChange={event => setEntity({...entity, title: event.target.value})}
                sx={{
                    ml: 1,
                    flex: 1,
                }}/>
            <IconButton color={'primary'} onClick={() => {
                props.onCreate(entity)
                setEntity(initValues)
            }}>
                <SendIcon/>
            </IconButton>
        </Paper>
    </Paper>
}

CreateBar.defaultProps = {
    onCreate: (c: MilestoneCreate) => console.log(c)
}

export function MilestoneList() {
    return <Box sx={{
        maxWidth: 600,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        mx: 1,
        my: 1,
        py: 1,
        px: 1,
    }}>
        <Box sx={{
            overflow: 'auto',
        }}>
            <MilestoneItems/>
        </Box>
        <Box sx={{
            position: 'relative',
            bottom: 0,
            top: "auto",
            mx: 1,
            my: 1,
        }}>
            <CreateBar/>
        </Box>
    </Box>
}