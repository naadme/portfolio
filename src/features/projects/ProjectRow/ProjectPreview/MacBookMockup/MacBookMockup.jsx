import './MacBookMockup.css';

export default function MacBookMockup({ screenshot }) {
  return (
    <div className="macbook-mockup">
      <div className="macbook-frame">
        <div className="macbook-screen">
          <img src={screenshot} alt="Desktop preview" />
        </div>
        <div className="macbook-base" />
      </div>
    </div>
  );
}
