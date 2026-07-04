import './PhoneMockup.css';

export default function PhoneMockup({ screenshot }) {
  return (
    <div className="phone-mockup">
      <div className="phone-frame">
        <div className="phone-screen">
          <img src={screenshot} alt="Mobile preview" />
        </div>
      </div>
    </div>
  );
}
