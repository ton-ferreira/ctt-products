import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import "./LoadingCard.style.scss";

function LoadingCard() {
  const { loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    console.log("o", loading);
  }, [loading]);

  return (
    <>
      {loading && (
        <div className="fade-in loading-card-container">
          <span className="loading-card">load in progress...</span>
        </div>
      )}
    </>
  );
}

export default LoadingCard;
