import emptyState from "../../assets/empty-state.svg";
import "./EmptyCard.style.scss";

type IEmptyCardProps = {
  description: string;
  title: string;
};

function EmptyCard({ description, title }: IEmptyCardProps) {
  return (
    <section className="empty-card-container">
      <img src={emptyState} className="empty-card-illustration" />
      <h2 className="empty-card-title">{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export default EmptyCard;
