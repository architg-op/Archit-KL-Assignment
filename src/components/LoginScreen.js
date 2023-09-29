import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginScreen() {
  const [accNo, setAccNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [validateIfscEnabled, setValidateIfscEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const validateIfsc = async () => {
    setLoading(true);
    await fetch(`https://ifsc.razorpay.com/${ifscCode}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("IFSC validated successfully", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            theme: "dark",
          });
        } else {
          toast.error(
            "IFSC verification failed, Please enter correct IFSC Code",
            {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              theme: "dark",
            }
          );
        }
      })
      .catch((err) => toast(err));
    setLoading(false);
  };

  const updateAccNo = (val) => {
    setAccNo(val?.currentTarget?.value);
    val?.currentTarget?.value?.length >= 11 &&
    val?.currentTarget?.value?.length <= 16 &&
    ifscCode?.length === 11
      ? setSubmitEnabled(true)
      : setSubmitEnabled(false);
  };

  const updateIfscCode = (val) => {
    setIfscCode(val?.currentTarget?.value);
    val?.currentTarget?.value?.length === 11
      ? setValidateIfscEnabled(true)
      : setValidateIfscEnabled(false);
    accNo?.length >= 11 &&
    accNo?.length <= 16 &&
    val?.currentTarget?.value?.length === 11
      ? setSubmitEnabled(true)
      : setSubmitEnabled(false);
  };

  const submitForm = () => {};

  const resetForm = () => {
    setAccNo(null);
    setIfscCode(null);
  };

  return (
    <div className="LoginBox">
      <form>
        <br />
        <br />
        <label htmlFor="bankAccNo">Bank Account Number</label>
        <input
          type="textfield"
          name="bankAccNo"
          minLength={11}
          maxLength={16}
          onChange={updateAccNo}
          value={accNo}
        />
        <br />
        <br />
        <label htmlFor="bankAccNo">IFSC Code</label>
        <input
          type="textfield"
          name="ifscCode"
          minLength={11}
          maxLength={11}
          onChange={updateIfscCode}
          value={ifscCode}
        />
        <button
          type="button"
          disabled={!validateIfscEnabled}
          onClick={validateIfsc}
        >
          Validate IFSC
        </button>
        <br />
        <br />
        <ToastContainer />
        <button
          type="submit"
          disabled={loading || !submitEnabled}
          onClick={submitForm}
        >
          {" "}
          Submit{" "}
        </button>
        <button type="reset" onClick={resetForm}>
          Reset
        </button>
      </form>
    </div>
  );
}

export default LoginScreen;
