import CreateTask from "../Components/CreateTask";
import ProgressComponent from "../Components/ProgressComponent";
import Table from "../Components/Table";

const HomePage = () => {
  return (
    <>
     <div>
     <div className="flex justify-between items-end">
     <ProgressComponent />
     <CreateTask/>
     </div>
     <Table />
     </div>
    </>
  );
};

export default HomePage;
