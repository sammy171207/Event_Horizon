import Event from '../models/Event.js';

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      basePrice,
      dynamicPrice,
      totalSeats,
      availableSeats,
      image
    } = req.body;

    const userId = req.user._id;

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      basePrice,
      dynamicPrice,
      totalSeats,
      availableSeats,
      image,
      user: userId
    });

    return res.status(201).json({
      message: "Event created successfully",
      event
    });
  } catch (error) {
    console.error("Create Event Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    console.error("Get All Events Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getEventById=async(req,res)=>{
  try {
    const eventId=req.params.id;
    const event=await Event.findById(eventId);
    console.log('Fetch Event Detail Successfully',event)
    return res.status(200).json(event);
  } catch (error) {
    console.error("Get Event By Id Error:", error.message);
    res.status(500).json({ message: error.message });
  }
}

const getEventByUserId=async(req,res)=>{
  try {
    const user=req.user._id;
    const events=await Event.find({user});
    console.log('Fetch Event Detail Successfully by user',events)
    return res.status(200).json(events);
  } catch (error) {
    res.json({message:"Something went wrong"});
  }
}

export { createEvent ,getAllEvents,getEventById,getEventByUserId};
