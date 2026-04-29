import ClassCard from "./ClassCard";
const ClassCardContainer = () => {
  const sampleClassesData = [
    {
      id: 1,
      title: "English enhancement Program",
      subject: "English",
      schedule: "Monday & Thursday",
      time: "8:00AM - 9:30AM",
      imageBackground: "/learninghub page assets/world1.png",
    },

    {
      id: 2,
      title: "English enhancement Program",
      subject: "English",
      schedule: "Monday & Thursday",
      time: "8:00AM - 9:30AM",
      imageBackground: "/learninghub page assets/world2.png",
    },

    {
      id: 3,
      title: "English enhancement Program",
      subject: "English",
      schedule: "Monday & Thursday",
      time: "8:00AM - 9:30AM",
      imageBackground: "/learninghub page assets/world7.png",
    },

    {
      id: 4,
      title: "English enhancement Program",
      subject: "English",
      schedule: "Monday & Thursday",
      time: "8:00AM - 9:30AM",
      imageBackground: "/learninghub page assets/world5.png",
    },

    {
      id: 5,
      title: "English enhancement Program",
      subject: "English",
      schedule: "Monday & Thursday",
      time: "8:00AM - 9:30AM",
      imageBackground: "/learninghub page assets/world6.png",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        {sampleClassesData.map((val) => (
          <ClassCard key={val.id} {...val} />
        ))}
      </div>
    </div>
  );
};

export default ClassCardContainer;
