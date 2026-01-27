import "../../styles/components/3-hover-tabs.css";
import "../../styles/allignment.css";

const ThreeHoverTabs = () => {
  return (
    <>
      <div className="center-box m-top-15">
        <div className="hover-cards">
          <div className="hover-card blue">
            <p className="tip m-2">FEEDBACK</p>
            <p className="second-text">
              We value your feedback a lot, please provide your feedback at
              <br></br>
              <strong>findithere.help@gmail.com</strong>
            </p>
          </div>
          <div className="hover-card green">
            <p className="tip m-2">SUPPORT</p>
            <p className="second-text">
              Please take a minute and support us by suggesting something for being more user friendly at
              <br></br>
              <strong>findithere.help@gmail.com</strong>
            </p>
          </div>
          <div className="hover-card red">
            <p className="tip m-2">REPORT</p>
            <p className="second-text">
              Sorry for the trouble you have gone through if any, please feel free to drop a complaint at
              <br></br>
              <strong>findithere.help@gmail.com</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreeHoverTabs;
