type StatusCardProps = {
  status: string;
  absolute?: boolean;
};

const StatusCard = ({ status, absolute }: StatusCardProps) => {
  return (
    <span
      className={`text-xs font-bold py-1 px-3 rounded-full ${
        status === "Tradeable"
          ? "bg-blue-500"
          : status === "Refund"
          ? "bg-red-500"
          : "bg-green-500"
      } ${absolute ? "absolute top-4 right-4 " : "relative"}
      text-white z-10`}
    >
      {status}
    </span>
  );
};

export default StatusCard;
