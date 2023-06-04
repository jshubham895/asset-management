const Chip = ({ tags }) => {
  return (
    <div style={{ marginTop: 10 }}>
      Tags &nbsp;
      {tags.map((tag, index) => (
        <div key={`tag-${index}`} className="chip">
          <span className="chip-text">{tag}</span>
        </div>
      ))}
    </div>
  );
};

export default Chip;
