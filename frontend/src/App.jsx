import { useEffect, useState } from 'react';
import './App.css';

const slides = [
  {
    image: '/Screenshot 2026-04-29 103108.png',
    title: 'Good Afternoon',
    subtitle: 'Spaces and Cybers.',
  },
  {
    image: '/Screenshot 2026-09-22 223701.png',
    title: 'Welcome to My App',
    subtitle: 'Learn and Explore.',
  },
  {
    image: '/Screenshot 2026-09-22 223950.png',
    title: 'Hello Everyone',
    subtitle: 'Have a Nice Day.',
  },
];

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function getUsers() {
      try {
        const response = await fetch('/api/users', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('API Error');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Không thể tải dữ liệu');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getUsers();

    return () => controller.abort();
  }, []);

  return (
    <div className="app-container">

      {/* HEADER */}
      <header>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand fs-4" href="#home">
              MY APP
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menu"
              aria-controls="menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="menu">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#content">
                    Content
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* BANNER */}
      <section id="home">
        <div
          id="myCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {slides.map((slide, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : undefined}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

<div className="carousel-inner">
  {slides.map((slide, index) => (
    <div
      key={index}
      className={`carousel-item ${index === 0 ? 'active' : ''}`}
      data-bs-interval="3000"
    >
      <div className="image-banner">

        <img
          src={slide.image}
          className="d-block w-100 carousel-photo"
          alt={slide.title}
        />

        <div className="banner-text">
          <h2>{slide.title}</h2>
          <p>{slide.subtitle}</p>
        </div>

      </div>
    </div>
  ))}
</div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            />
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* CONTENT */}
      <main id="content">
        <div className="table-responsive">
          <table className="table table-bordered table-striped mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="3" className="text-danger">
                    {error}
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="3">No users found</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.id}</td>
                    <td>{user.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-4">
        <p className="mb-0">♧ Hanoi, August 2026</p>
      </footer>

    </div>
  );
}

export default App;