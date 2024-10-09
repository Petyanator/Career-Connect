import "./DevelopersSection.css";

function DevelopersSection() {
  const developers = [
    {
      name: "Abraham",
      role: "Frontend Developer",
      image: "../src/components/pictures/placeholder.jpeg",
    },
    {
      name: "Barra",
      role: "Fullstack Developer",
      image: "../src/components/pictures/placeholder.jpeg",
    },
    {
      name: "Dan",
      role: "Fullstack Developer",
      image: "../src/components/pictures/placeholder.jpeg",
    },
    {
      name: "Jerry",
      role: "Fullstack Developer",
      image: "../src/components/pictures/placeholder.jpeg",
    },
    {
      name: "Sam",
      role: "Fullstack Developer",
      image: "../src/components/pictures/placeholder.jpeg",
    },
    {
      name: "Vlad",
      role: "Fullstack Developer",
      image: "../src/components/pictures/placeholder.jpeg",
    },
    // Add more developers as needed
  ];

  return (
    <div className="developers-section">
      {developers.map((developer, index) => (
        <div key={index} className="developer-card">
          <img src={developer.image} alt={`${developer.name} photo`} />
          <div className="developer-name">{developer.name}</div>
          <div className="developer-role">{developer.role}</div>
        </div>
      ))}
    </div>
  );
}

export default DevelopersSection;
