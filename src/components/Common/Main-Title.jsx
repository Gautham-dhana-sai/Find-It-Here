import "../../styles/boxes.css"

const MainTitle = () => {
    return (
        <>
          <div className="sticky-header">
            <section className="hero box">
              <div className="avatar box">
                <i className="fab fa-grav icon-3xl icon-std"></i>
              </div>
              <div className="hero-main">
                <div className="title-font font-italic m-bot-ne5">Whatever you need!</div>
                <h2 className="title-font">Find It Here</h2>
              </div>
            </section>
          </div>
        </>
    )
}

export default MainTitle