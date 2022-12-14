import {createHashRouter, Navigate, RouterProvider} from "react-router-dom";
import Milestone from "./page/Milestone";
import MilestoneDetail from "./page/MilestoneDetail";
import ErrorPage404 from "./page/ErrorPage404";

const router = createHashRouter([
    {path: '/', element: <Navigate to={'/milestone'}/>},
    {path: 'milestone', element: <Milestone/>},
    {path: 'milestone/:id', element: <MilestoneDetail/>},
    // error page of 404
    {path: '*', element: <ErrorPage404/>},
])

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
