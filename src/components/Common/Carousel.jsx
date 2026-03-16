import "../../styles/carousel.css"
import "../../styles/allignment.css"
import { useEffect, useState } from "react"

const Carousel = () => {
  const slides = [
    { image: '/question.gif', title: 'What is it?', statement: 'Find products at nearby local stores instantly.' },
    { image: '/cursor.gif', title: 'What can be done?', statement: 'Help yourself with what you need.' },
    { image: '/plus.gif', title: 'Can we join?', statement: 'Explore and join the family.' }
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="carousel-row">
      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 70}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="carousel-slide box">
              <div className="small-square box icon-center" style={{ padding: 0, overflow: 'hidden', background: 'black' }}>
                <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>

              <div className="slide-text wid-180 pad-5">
                <div className="slide-title"><strong>{s.title}</strong></div>
                <div className="slide-statement">{s.statement}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel