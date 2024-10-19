import TaskCreation from "./TaskCreation";
import Hero from "./Hero";
import TaskCategorization from "./TaskCategorization";
import Features from "./Features";

function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <TaskCreation />
      <TaskCategorization />
      <Features />
    </div>
  );
}

export default Home;
