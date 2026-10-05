export default function SectionHeading({ title, children }) {
  return (
    <div className="section-heading">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
