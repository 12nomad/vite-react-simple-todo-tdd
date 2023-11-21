interface ITodoCount {
  borderColor: string;
  dataTestId: string;
  count: number;
  title: string;
}

const TodoCount = ({ borderColor, count, dataTestId, title }: ITodoCount) => {
  return (
    <li>
      <div
        className={`border-2 rounded-full text-lg font-medium h-20 w-20 grid place-items-center ${borderColor}`}
      >
        <span data-testid={dataTestId}>{count}</span>
      </div>
      <h4 className="text-center mt-2 text-lg font-medium">{title}</h4>
    </li>
  );
};

export default TodoCount;
