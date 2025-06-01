type IErrorCardProps = {
  errorMessage: string;
};

function ErrorCard({ errorMessage }: IErrorCardProps) {
  return (
    <section>
      <p>{errorMessage}</p>
    </section>
  );
}

export default ErrorCard;
