type IEmptyCardProps = {
  description: string;
  title: string;
};

function EmptyCard({ description, title }: IEmptyCardProps) {
  return (
    <section>
      <h3>{title}</h3>
      <p>{description}</p>
    </section>
  );
}

export default EmptyCard;
