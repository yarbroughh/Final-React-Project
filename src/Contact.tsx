import { useState } from 'react';
import Layout from './Layout';

function Contact() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false); //"selected" for the state dropdown doesn't work with JSX, so use useState
    const [selectedState, setSelectedState] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    try {
        const response = await fetch('https://681e7312c1c291fa66341abc.mockapi.io/API/Nature/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, address, city, state: selectedState, zip, email, phone, message }),
        });
        
        if (response.ok) {
            setSubmitted(true);
            setFirstName('');
            setLastName('');
            setAddress('');
            setCity('');
            setSelectedState('');
            setZip('');
            setEmail('');
            setPhone('');
            setMessage('');
        } else {
            console.error('Error Submitting Form');
        }
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

return (
  <Layout
    heroTitle="Contact"
    heroImage="/images/hero-contact.jpg"
  >
    <main className="section-background">
      <section className="text-center p-5">
        <h2>Need Information? Want to Help?</h2>
        <p>Please submit the form below and we'll respond as soon as possible.</p>
      </section>
      <form onSubmit={handleSubmit} className="container pb-5">
      {/*from bootstrap, edited the fields to include*/}
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="inputFirstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="inputFirstName" value={firstName}
          onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputLastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="inputLastName" value={lastName}
          onChange={(e) => setLastName(e.target.value)}/>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={address}
          onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity" value={city}
          onChange={(e) => setCity(e.target.value)}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">State</label>
            <select id="inputState" className="form-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}>
              <option value="">Select a State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip" value={zip}
          onChange={(e) => setZip(e.target.value)} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="inputEmail" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="inputEmail" placeholder="Email Address" value={email}
          onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="col-6">
            <label htmlFor="inputPhone" className="form-label">Phone</label>
            <input type="text" className="form-control" id="inputPhone" placeholder="Phone Number" value={phone}
          onChange={(e) => setPhone(e.target.value)}/>
          </div>
          <div className="col-12">
            <label htmlFor="inputMessage" className="form-label">Message</label>
            <textarea className="form-control" id="inputMessage" placeholder="Message" value={message}
          onChange={(e) => setMessage(e.target.value)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-check pt-5">
              <input className="form-check-input" type="checkbox" id="gridCheck" />
              <label className="form-check-label" htmlFor="gridCheck">
                I agree to be added to your mailing list
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button type="submit" className="btn mt-5">Submit</button>
          </div>
         </div>
      </form>
      <div className="row">
        <div className="col-12 pb-5 text-center">
          {submitted && <p className="text-success">Thank you! We'll be in touch.</p>}
        </div>
      </div>
  </main>
</Layout>
  );
}

export default Contact;