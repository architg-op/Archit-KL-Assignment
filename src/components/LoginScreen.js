function validateIfsc() {
  console.log("validateIfsc working");
}

export default function LoginScreen() {
  return (
    <div className="LoginBox">
      <form>
        <br />
        <br />
        <label htmlFor="bankAccNo">Bank Account Number</label>
        <input type="textfield" name="bankAccNo" minLength={9} maxLength={18} />
        <br />
        <br />
        <label htmlFor="bankAccNo">IFSC Code</label>
        <input type="textfield" name="ifscCode" minLength={11} maxLength={11} />
        <button onClick={validateIfsc}>Validate IFSC</button>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
