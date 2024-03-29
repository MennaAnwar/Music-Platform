import Hero from "../Hero/Hero";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../../Context";
import Loader from "../Loader/Loader";

export default function GenresPage() {
  const [genre, setGenre] = useState([]);
  const { isLoading, setIsLoading, userData } = useContext(Context);
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://localhost:8000/api/genre`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then(function (res) {
        setGenre(res.data.data);
      })
      .catch(function (error) {
        console.error("Failed to fetch genre data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Hero />
      <div className="under-hero container">
        <div className="section">
          <div className="section__head">
            <h3 className="mb-0">
              Music <span className="text-primary">Genres</span>
            </h3>
          </div>
          <div className="d-flex flex-wrap justify-content-center cover row g-4">
            {genre.map((item, index) => (
              <div className="col-xl-3 col-sm-6" key={index}>
                <div className="cover cover--round">
                  <a href="genre-details.html" className="cover__image">
                    <img src={item.picture_medium} alt={item.name} />
                    <div className="cover__image__content">
                      <span className="cover__title mb-1 fs-6 text-truncate">
                        {item.name}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
