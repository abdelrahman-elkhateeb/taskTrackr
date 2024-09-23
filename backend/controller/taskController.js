export const getTasks = async (req, res) => {
  try {
    const tasks = await tasks.find({});
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createTask = async (req,res)=>{
  const task = req.body;
  if(!)
}