import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    try {
      const res = await fetch('server-9hmrn5q8e-devs-projects-2c54a8b7.vercel.app/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
      
      if (!res.ok) {
        throw new Error('Failed to add job');
      }
  
      // Optionally, handle response data or status
      return res.json(); // Example: return JSON response
    } catch (error) {
      console.error('Error adding job:', error);
      throw error; // Propagate the error for further handling
    }
  };
  
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`server-9hmrn5q8e-devs-projects-2c54a8b7.vercel.app/api/jobs/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete job');
      }
      
      // Optionally, handle response data or status
      return res.json(); // Example: return JSON response
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error; // Propagate the error for further handling
    }
  };
  
  const updateJob = async (job) => {
    try {
      const res = await fetch(`server-9hmrn5q8e-devs-projects-2c54a8b7.vercel.app/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
      
      if (!res.ok) {
        throw new Error('Failed to update job');
      }
      
      // Optionally, handle response data or status
      return res.json(); // Example: return JSON response
    } catch (error) {
      console.error('Error updating job:', error);
      throw error; // Propagate the error for further handling
    }
  };
  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
